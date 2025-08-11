import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { v4 as uuidv4 } from "uuid";
import { useProject } from '@/context/ProjectContext';
import { addIconPicture, updateIconApi } from "@/api/Survey"

// Create the context
const MapContext = createContext();

// Custom hook to use the map context
export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

// Map Provider component
export const MapProvider = ({ children }) => {
  const {versionMode, setVersionMode,selectedSurvey, setSelectedSurvey, setSurveys, surveys, surveyRef, updateSurvey} = useProject()
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const placedElementsRef = useRef([]);
  const [placedElements, setPlacedElements] = useState([]);
  const [filteredElements, setFilteredElements] = useState([]);
  const [selectedID, setSelectedID]=useState(null)
  const [selectedElement, setSelectedElement] = useState(null)
  const [isInitialDrown, setIsInitialDrown] = useState(false)
  const [isInitialDrop, setIsInitialDrop] =useState(false)
  const [triggerElementClick, setTriggerElementClick] = useState(false)
  const [swapElement, setSwapElement] = useState(null)
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const updateTimeoutRef = useRef(null);  
  const fovLayersRef = useRef([]); // Store FOV visualization layers
  const imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";


  useEffect(() => {
	  placedElementsRef.current = placedElements;
	  if(selectedID){
		  const selectedEl = placedElements.find(x => x.id === selectedID);
		  setSelectedElement(selectedEl);
	  	}
	}, [placedElements, selectedID]);

 const createCustomIcon = useCallback((elementData, isSelected = false) => {

 const borderColor = isSelected ? 'green' : elementData.color;
 const iconHtml = `
   <img 
     src="${elementData.thumbnail}"
     alt="${elementData.name}"
     style="
     object-fit: cover; 
     pointer-events: none;
     background-color:${elementData.color};
     width: ${surveyRef.current?.iconSize||'40'}px !important;
     height: ${surveyRef.current?.iconSize||'40'}px !important;
     border-radius: 50% !important;
     overflow: hidden !important;
     border: 2px solid ${borderColor} !important;
     box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
     cursor: move !important;
     will-change: transform !important;
     backface-visibility: hidden !important;"
   />
 `;
 
 return L.divIcon({
     html: iconHtml,
     className: 'custom-static-icon',
     iconSize: [surveyRef.current?.iconSize || 40, surveyRef.current?.iconSize || 40],
     iconAnchor: [(surveyRef.current?.iconSize || 40)/2, (surveyRef.current?.iconSize || 40)/2],
     popupAnchor: [0, -(surveyRef.current?.iconSize || 40)/2]
   });
}, []);
 
const createFieldOfView = useCallback((elementData) => {
    if (!mapInstanceRef.current) return null;
    const { rotate = 75, depth = 100, angle = 0, bgColor = '#3F444D', opacity } = elementData;
    
    // Convert angle from degrees to radians
    const angleRad = (rotate * Math.PI) / 180;
    const rotateRad = (angle * Math.PI) / 180;
    
    // Calculate the field of view cone points
    const centerLat = elementData.position[0];
    const centerLng = elementData.position[1];
    
    // Create an array of points for the FOV polygon
    const points = [];
    
    // Start with the center point (element position)
    points.push([centerLat, centerLng]);
    
    // Calculate the arc points for the field of view
    const numPoints = 30; // Number of points to create smooth arc
    const startAngle = rotateRad - angleRad / 2;
    const endAngle = rotateRad + angleRad / 2;
    
    for (let i = 0; i <= numPoints; i++) {
      const currentAngle = startAngle + (endAngle - startAngle) * (i / numPoints);
      
      // Calculate point at the edge of the field of view
      const pointLat = centerLat + (depth * Math.cos(currentAngle));
      const pointLng = centerLng + (depth * Math.sin(currentAngle));
      
      points.push([pointLat, pointLng]);
    }
    
    // Close the polygon by returning to center
    points.push([centerLat, centerLng]);
    
    // Create the polygon with styling
    const fovPolygon = L.polygon(points, {
      color: elementData.bgColor || '#3F444D',
      fillColor: elementData.bgColor || '#3F444D',
      fillOpacity: opacity/100,
      weight: 1,
      opacity: 1,
      className: 'field-of-view-polygon'
    });
    fovPolygon.addTo(mapInstanceRef.current);
    fovLayersRef.current.push(fovPolygon);
    return { polygon: fovPolygon };
  }, []);

const redrawFOV = useCallback((markerId, data) => {
	  // Early returns for validation
	  const marker = markersRef.current.find(m => m._leaflet_id === markerId);
	  if (!marker || !mapInstanceRef.current) {
	    console.warn('Marker or map not found');
	    return;
	  }

	  const currentPosition = marker.getLatLng();
	  const element = placedElementsRef.current.find(el => el.markerId === markerId);
	  if (!element) {
	    console.warn(`Element with markerId ${markerId} not found`);
	    return;
	  }

	  // Remove existing FOV layer
	  const existingLayerIndex = fovLayersRef.current.findIndex(
	    layerGroup => layerGroup.elementId === element.id
	  );
	  
	  if (existingLayerIndex !== -1) {
	    const existingLayer = fovLayersRef.current[existingLayerIndex];
	    if (mapInstanceRef.current.hasLayer(existingLayer.polygon)) {
	      mapInstanceRef.current.removeLayer(existingLayer.polygon);
	    }
	    fovLayersRef.current.splice(existingLayerIndex, 1);
	  }

	  // Create updated element data (for FOV visualization only)
	  const updatedElement = {
	    ...element,
	    ...data,
	    position: [currentPosition.lat, currentPosition.lng]
	  };

	  // Create and add new FOV visualization
	  const newFOV = createFieldOfView(updatedElement);
	  if (newFOV) {
	    fovLayersRef.current.push({
	      ...newFOV,
	      elementId: element.id
	    });
	  }

}, [createFieldOfView]);

const redrawAllElements = useCallback(() => {
  if (!mapInstanceRef.current) return;
  
  // Update all marker icons with current survey iconSize
  markersRef.current.forEach(marker => {
    const markerId = marker._leaflet_id;
    const elementData = placedElements.find(el => el.markerId === markerId);
    if (elementData) {
      const isVisible = filteredElements.some(el => el.id === elementData.id);
      
      if (isVisible) {
        // Show marker
        if (!mapInstanceRef.current.hasLayer(marker)) {
          marker.addTo(mapInstanceRef.current);
        }
        
        // Create new icon with survey iconSize
        const elementWithSurveySize = {
          ...elementData,
          iconSize: surveyRef.current?.iconSize
        };
        const isSelected = selectedElement && selectedElement.markerId === markerId;
        const newIcon = createCustomIcon(elementWithSurveySize, isSelected);
        marker.setIcon(newIcon);
      } else {
        // Hide marker
        if (mapInstanceRef.current.hasLayer(marker)) {
          mapInstanceRef.current.removeLayer(marker);
        }
      }
    }
  });
  // Redraw FOV layers for visible elements only
  fovLayersRef.current.forEach(fovLayer => {
    const elementData = placedElements.find(el => el.id === fovLayer.elementId);
    if (elementData) {
      const isVisible = filteredElements.some(el => el.id === elementData.id);
      
      if (isVisible) {
        // Show FOV
        if (!mapInstanceRef.current.hasLayer(fovLayer.polygon)) {
          fovLayer.polygon.addTo(mapInstanceRef.current);
        }
      } else {
        // Hide FOV
        if (mapInstanceRef.current.hasLayer(fovLayer.polygon)) {
          mapInstanceRef.current.removeLayer(fovLayer.polygon);
        }
      }
    }
  });
}, [placedElements, filteredElements, selectedElement, selectedSurvey?.iconSize, createCustomIcon]);

useEffect(() => {
  redrawAllElements();
}, [filteredElements, redrawAllElements]);


useEffect(() => {
  if (selectedSurvey?.iconSize) {
    redrawAllElements();
  }
}, [selectedSurvey?.iconSize, redrawAllElements]);

  useEffect(()=>{
    if(selectedSurvey?.id&&!isInitialDrop){
      selectedSurvey?.icon?.forEach(x=>{
        handleElementDrop(x, x.position)
      })
      setIsInitialDrop(true)
    }
  },[selectedSurvey?.id])

  // Optimized drag end handler with debouncing
  const handleMarkerDragEnd = useCallback((e) => {
    const position = e.target.getLatLng();
    const markerId = e.target._leaflet_id;
    const selEl = placedElementsRef.current.find(x => x.markerId === markerId);

    updateIconApi(selEl?.id, {
      xposition:position.lat,
      yposition:position.lng
    })

  	selectingElement(markerId)
      requestAnimationFrame(() => {
        setPlacedElements(prev => 
          prev.map(el => 
            el.markerId === markerId 
              ? { ...el, position: [position.lat, position.lng] }
              : el
          )
        );
      });
    }, []);


  const initialDrawingFields = useCallback(() => {
    if (!mapInstanceRef.current||isInitialDrown) return;

    // Clear existing FOV layers
    fovLayersRef.current.forEach(layerGroup => {
      if (mapInstanceRef.current.hasLayer(layerGroup.polygon)) {
        mapInstanceRef.current.removeLayer(layerGroup.polygon);
      }
    });
    fovLayersRef.current = [];
    
    // Create new FOV layers for all elements
    placedElements.forEach(element => {
      if (element.position) {
        createFieldOfView(element);
      }
    });

    setIsInitialDrown(true)
  }, [isInitialDrown]);

  const updateElementInState = useCallback((id, data) => {
	  setPlacedElements(prev => 
	    prev.map(el => 
	      el.id === id 
	        ? { ...el, ...data }
	        : el
	    )
	  );
	}, []);

  const selectingElement=(markerId)=>{
  	// Use the ref to get current state
	  const currentElements = placedElementsRef.current;
	  const selectedEl = currentElements.find(x => x.markerId === markerId);
	  setSelectedID(selectedEl.id);
  }

  // Optimized drag handler for smoother movement
  	const handleMarkerDrag = useCallback((e) => {
	  const position = e.target.getLatLng();
	  const markerId = e.target._leaflet_id;
	  redrawFOV(markerId)
	}, []);

  const handleClick = useCallback((e) => {
	  const markerId = e.target._leaflet_id;
	  selectingElement(markerId)
	}, []); // No dependencies needed since we use ref

	const updateMarkerIcons = useCallback(() => {
	  markersRef.current.forEach(marker => {
	    const markerId = marker._leaflet_id;
	    const elementData = placedElements.find(el => el.markerId === markerId);
	    if (elementData) {
	      const isSelected = selectedElement && selectedElement.markerId === markerId;
	      const newIcon = createCustomIcon(elementData, isSelected);
	      marker.setIcon(newIcon);
	    }
	  });
	}, [placedElements, selectedElement, createCustomIcon]);

  	useEffect(()=>{
  		if(selectedElement?.id){
  			updateMarkerIcons()
  		}
  	},[selectedElement])

useEffect(()=>{
  if(selectedSurvey){
    clearAndRecreateMapElements(selectedSurvey.icon)
  }  
},[versionMode])

  // Helper function to create markers with optimized event handlers
  const createOptimizedMarker = useCallback((position, data) => {
    if (!mapInstanceRef.current) return null;
    const marker = L.marker(position, { 
      icon: createCustomIcon(data),
      draggable: !versionMode,
      autoPan: false,
      keyboard: false,
      riseOnHover: false,
      riseOffset: 0
    }).addTo(mapInstanceRef.current)

    // Add optimized event listeners
    marker.on('drag', handleMarkerDrag);
    marker.on('dragend', handleMarkerDragEnd);
    marker.on('click', handleClick);
    
    return marker;
  }, [createCustomIcon, handleMarkerDrag, handleMarkerDragEnd, versionMode]);

  // Initialize map
  const initializeMap = useCallback((mapElement) => {
    if (!mapElement || mapInstanceRef.current) return;

    // Create the map with optimized settings
    const map = L.map(mapElement, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 4,
      center: [0, 0],
      zoom: 0,
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true,
      // Performance optimizations
      preferCanvas: false,
      renderer: L.svg({ padding: 0.5 }),
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true
    });

    // Calculate image bounds
    const imageWidth = 2070;
    const imageHeight = 1380;
    const bounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];
    console.info()
    // Background layer
    const backgroundImageUrl = selectedSurvey?.picture;
    const backgroundBounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];
    L.imageOverlay(backgroundImageUrl, backgroundBounds, { opacity: 0.8 }).addTo(map);

    // Foreground layer (top)
    L.imageOverlay(backgroundImageUrl, bounds, { opacity: 0.9 }).addTo(map);

    // Fit the map to the image bounds
    map.fitBounds(bounds);

    // Store map instance
    mapInstanceRef.current = map;

    return map;
  }, [imageUrl, selectedSurvey?.picture]);

  // Handle element drop on map
  const handleElementDrop = useCallback((elementData, latLng) => {
    if (!mapInstanceRef.current) return;
    // Create a new marker at the drop location with optimized settings
    const newMarker = createOptimizedMarker(latLng, elementData);
    if (!newMarker) return;
    
    // Add to our tracking arrays
    markersRef.current.push(newMarker);
    const existingWithSameName = placedElementsRef.current.filter(el => el.name === elementData.name);
    const order = existingWithSameName.length > 0 ? existingWithSameName.length + 1 : 1;

    const newPlacedElement = {
      ...elementData,
      position: [latLng.lat, latLng.lng],
      markerId: newMarker._leaflet_id,
      order: order
    };
    setSelectedID(newPlacedElement.id)
    setPlacedElements(prev => [...prev, newPlacedElement]);
  }, [createOptimizedMarker]);

  // Add custom styles for markers
  const addMarkerStyles = useCallback(() => {
    const existingStyle = document.getElementById('leaflet-custom-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'leaflet-custom-styles';
    style.textContent = `
      .custom-div-icon:hover {
        transform: scale(1.1);
        transition: transform 0.15s ease-out;
      }
      .custom-div-icon.leaflet-drag-target {
        transition: none !important;
        will-change: transform;
      }
      /* Optimize leaflet dragging */
      .leaflet-marker-draggable {
        will-change: transform;
      }
      .leaflet-zoom-anim .leaflet-zoom-animated {
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const clearAndRecreateMapElements = useCallback((newPlacedElements = []) => {
  if (!mapInstanceRef.current) {
    console.warn('Map instance not available');
    return;
  }

  try {
    // Step 1: Clear all existing markers
    markersRef.current.forEach(marker => {
      // Remove event listeners to prevent memory leaks
      marker.off('drag', handleMarkerDrag);
      marker.off('dragend', handleMarkerDragEnd);
      marker.off('click', handleClick);
      
      // Remove marker from map if it exists
      if (mapInstanceRef.current.hasLayer(marker)) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });
    
    // Clear markers array
    markersRef.current = [];

    // Step 2: Clear all existing FOV layers
    fovLayersRef.current.forEach(layerGroup => {
      if (layerGroup.polygon && mapInstanceRef.current.hasLayer(layerGroup.polygon)) {
        mapInstanceRef.current.removeLayer(layerGroup.polygon);
      }
    });
    
    // Clear FOV layers array
    fovLayersRef.current = [];

    // Step 3: Recreate markers and FOV from newPlacedElements
    newPlacedElements.forEach(elementData => {
      if (!elementData.position || !Array.isArray(elementData.position) || elementData.position.length < 2) {
        console.warn('Invalid position data for element:', elementData.name);
        return;
      }

      // Create new marker (but don't add to map yet - visibility will be handled by redrawAllElements)
      const newMarker = L.marker(elementData.position, { 
        icon: createCustomIcon(elementData),
        draggable: !versionMode,
        autoPan: false,
        keyboard: false,
        riseOnHover: false,
        riseOffset: 0
      });

      // Add optimized event listeners
      newMarker.on('drag', handleMarkerDrag);
      newMarker.on('dragend', handleMarkerDragEnd);
      newMarker.on('click', handleClick);
      
      // Add to markers tracking array
      markersRef.current.push(newMarker);
      
      // Update the element's markerId to match the new marker
      elementData.markerId = newMarker._leaflet_id;
      
      // Create FOV for this element if it has FOV properties (but don't add to map yet)
      if (elementData.rotate !== undefined || elementData.depth !== undefined || elementData.angle !== undefined) {
        const { rotate = 75, depth = 100, angle = 0, bgColor = '#3F444D', opacity } = elementData;
        
        // Convert angle from degrees to radians
        const angleRad = (rotate * Math.PI) / 180;
        const rotateRad = (angle * Math.PI) / 180;
        
        // Calculate the field of view cone points
        const centerLat = elementData.position[0];
        const centerLng = elementData.position[1];
        
        // Create an array of points for the FOV polygon
        const points = [];
        
        // Start with the center point (element position)
        points.push([centerLat, centerLng]);
        
        // Calculate the arc points for the field of view
        const numPoints = 30; // Number of points to create smooth arc
        const startAngle = rotateRad - angleRad / 2;
        const endAngle = rotateRad + angleRad / 2;
        
        for (let i = 0; i <= numPoints; i++) {
          const currentAngle = startAngle + (endAngle - startAngle) * (i / numPoints);
          
          // Calculate point at the edge of the field of view
          const pointLat = centerLat + (depth * Math.cos(currentAngle));
          const pointLng = centerLng + (depth * Math.sin(currentAngle));
          
          points.push([pointLat, pointLng]);
        }
        
        // Close the polygon by returning to center
        points.push([centerLat, centerLng]);
        
        // Create the polygon with styling (but don't add to map yet)
        const fovPolygon = L.polygon(points, {
          color: elementData.bgColor || '#3F444D',
          fillColor: elementData.bgColor || '#3F444D',
          fillOpacity: opacity/100,
          weight: 1,
          opacity: 1,
          className: 'field-of-view-polygon'
        });
        
        fovLayersRef.current.push({
          polygon: fovPolygon,
          elementId: elementData.id
        });
      }
    });

    // Step 4: Update the placed elements state
    setPlacedElements(newPlacedElements);
    
    // Step 5: Clear selection if the selected element no longer exists
    if (selectedElement) {
      const stillExists = newPlacedElements.find(el => el.id === selectedElement.id);
      if (!stillExists) {
        setSelectedElement(null);
        setSelectedID(null);
      }
    }

    console.log(`Successfully recreated ${newPlacedElements.length} elements on map`);
    
  } catch (error) {
    console.error('Error in clearAndRecreateMapElements:', error);
  }
}, [
  createOptimizedMarker, 
  createFieldOfView, 
  handleMarkerDrag, 
  handleMarkerDragEnd, 
  handleClick,
  selectedElement,
  setPlacedElements,
  setSelectedElement,
  setSelectedID,
  versionMode,
  createCustomIcon
]);

  // Remove element by ID
  // Fixed deleteElement function
	const deleteElement = useCallback(() => {
	  if (!selectedElement) return;

	  const elementToRemove = placedElements.find(el => el.id === selectedElement?.id);
	  if (!elementToRemove) return;

	  // Remove marker from map
	  const markerIndex = markersRef.current.findIndex(marker => 
	    marker._leaflet_id === elementToRemove.markerId
	  );
	  
	  if (markerIndex !== -1) {
	    const marker = markersRef.current[markerIndex];
	    marker.off('drag', handleMarkerDrag);
	    marker.off('dragend', handleMarkerDragEnd);
	    marker.off('click', handleClick); // Also remove click handler
	    if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(marker)) {
	      mapInstanceRef.current.removeLayer(marker);
	    }
	    markersRef.current.splice(markerIndex, 1);
	  }

	  // MISSING: Remove FOV layer associated with this element
	  const fovLayerIndex = fovLayersRef.current.findIndex(layerGroup => 
	    layerGroup.elementId === elementToRemove.id
	  );
	  
	  if (fovLayerIndex !== -1) {
	    const fovLayer = fovLayersRef.current[fovLayerIndex];
	    if (mapInstanceRef.current && mapInstanceRef.current.hasLayer(fovLayer.polygon)) {
	      mapInstanceRef.current.removeLayer(fovLayer.polygon);
	    }
	    fovLayersRef.current.splice(fovLayerIndex, 1);
	  }

	  // Remove from state
	  setPlacedElements(prev => prev.filter(el => el.id !== selectedElement?.id));
	  setSelectedElement(null);
	  setSelectedID(null)

    setPlacedElements(prev => {
      const filtered = prev.filter(el => el.id !== selectedElement?.id);
      
      // Reorder elements with same name as deleted element
      const deletedElementName = selectedElement?.name;
      if (deletedElementName) {
        return filtered.map(el => {
          if (el.name === deletedElementName) {
            const sameNameElements = filtered
              .filter(item => item.name === deletedElementName)
              .sort((a, b) => (a.order || 1) - (b.order || 1));
            const newOrder = sameNameElements.findIndex(item => item.id === el.id) + 1;
            return { ...el, order: newOrder };
          }
          return el;
        });
      }
      
      return filtered;
    });
	}, [selectedElement, handleMarkerDrag, handleMarkerDragEnd, handleClick]);

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear any pending timeouts
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    if (mapInstanceRef.current) {
      // Clean up markers
      markersRef.current.forEach(marker => {
        if (mapInstanceRef.current.hasLayer(marker)) {
          marker.off('drag', handleMarkerDrag);
          marker.off('dragend', handleMarkerDragEnd);
          mapInstanceRef.current.removeLayer(marker);
        }
      });
      
      // Remove custom style
      const style = document.getElementById('leaflet-custom-styles');
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
      
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    
    markersRef.current = [];
  }, [handleMarkerDrag, handleMarkerDragEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const duplicateElement = useCallback(() => {
	 if (!selectedElement) return;
	 const currentElements = placedElementsRef.current;
	 const selectedEl = currentElements.find(x => x.markerId === selectedElement.markerId);

	 const existingWithSameName = currentElements.filter(el => el.name === selectedEl.name);
    const order = existingWithSameName.length + 1;

    const duplicatedElement = {
      ...selectedEl,
      id: uuidv4(),
      position: [selectedEl.position[0], selectedEl.position[1] + 40],
      order: order,
      comments:[],
      photos:[],
    };

	 const newMarker = createOptimizedMarker(duplicatedElement.position, duplicatedElement);
	 if (!newMarker) return;
	 
	 markersRef.current.push(newMarker);
	 duplicatedElement.markerId = newMarker._leaflet_id;
	 
	 // Create FOV for duplicated element
	 const newFOV = createFieldOfView(duplicatedElement);
	 if (newFOV) {
	   fovLayersRef.current.push({
	     ...newFOV,
	     elementId: duplicatedElement.id
	   });
	 }
	 
	 setPlacedElements(prev => [...prev, duplicatedElement]);
	 setSelectedID(duplicatedElement.id);
	}, [selectedElement, createOptimizedMarker, createFieldOfView]);

  const uploadPhoto = (id, photo) => {
    var newPhoto=new File([photo], photo.name+".jpeg", {type: photo.type, lastModified: photo.lastModified}) 
	  var newPic = {
	    title: selectedElement?.name,
	    elementId: selectedElement?.id,
	    elementName: selectedElement?.name,
	    picture: URL.createObjectURL(newPhoto),
      stage:selectedSurvey?.stage||"design"
	  }
    console.info(photo)
    var picToSend={
      ...newPic,
      picture: newPhoto
    }

    addIconPicture(selectedElement?.id, picToSend)
	  setPlacedElements(prev => 
	    prev.map(el => 
	      el.id === id 
	        ? { ...el, photos: [...(el.photos || []), newPic] }
	        : el
	    )
	  );
	}

  useEffect(()=>{
    updateSurvey(
      {
        placedElements:placedElements
      }
    )
  },[placedElements])

  useEffect(() => {
    const filtered = placedElements.filter(element => !hiddenElements.has(element.name));
    setFilteredElements(filtered);
  }, [placedElements, hiddenElements]);

  const updateHiddenElements = useCallback((hiddenSet) => {
    setHiddenElements(hiddenSet);
  }, []);

  const restoreVersion = (name, version) => {
    // Generate unique versionName
    let uniqueVersionName = name;
    let counter = 1;
    
    while (surveys.some(s => s.versionName === uniqueVersionName)) {
      uniqueVersionName = `${name} (${counter})`;
      counter++;
    }
    
    var newsurv = { 
      ...version, 
      versionName: uniqueVersionName, 
      id: uuidv4(), 
      mainVersion: true 
    }
    
    setSurveys([
      newsurv,
      ...surveys.map(s => 
        s.name === version.name 
          ? { ...s, mainVersion: false }
          : s
      )
    ])
    
    setSelectedSurvey(newsurv)
    return newsurv
  }

  const addVersion = (name) => {
    // Generate unique versionName
    let uniqueVersionName = name;
    let counter = 1;
    
    while (surveys.some(s => s.versionName === uniqueVersionName)) {
      uniqueVersionName = `${name} (${counter})`;
      counter++;
    }
    
    var newsurv = { 
      ...selectedSurvey, 
      versionName: uniqueVersionName, 
      id: uuidv4(), 
      mainVersion: true 
    }
    
    setSurveys([
      newsurv,
      ...surveys.map(s => 
        s.name === selectedSurvey.name 
          ? { ...s, mainVersion: false }
          : s
      )
    ])
    
    setSelectedSurvey(newsurv)
    return newsurv
  }

  const loadSurvey=()=>{

  }

  // Context value
  const contextValue = {
    // State
    placedElements,
    setPlacedElements,
    selectedElement,
    setSelectedElement,
    swapElement,
    setSwapElement,
    duplicateElement,
    uploadPhoto,
    updateElementInState,
    // Map instance
    mapInstanceRef,
    setSelectedID,
    // Core functions
    initializeMap,
    handleElementDrop,
    addMarkerStyles,
    cleanup,
    redrawFOV,
    selectedSurvey,
	  updateSurvey,
    restoreVersion,
	  redrawAllElements,
    deleteElement,    
    addVersion,
    imageUrl,
    hiddenElements,
  setHiddenElements,
  updateHiddenElements,
  filteredElements
  };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};