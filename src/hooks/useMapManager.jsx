import { useState, useRef, useCallback, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const useMapManager = () => {
  const [placedElements, setPlacedElements] = useState([]);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const updateTimeoutRef = useRef(null);
  const imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  // Create custom icon function - memoized for better performance
  const createCustomIcon = useCallback((elementData) => {
    const iconHtml = `
      <img 
        src="${elementData.url}"
        alt="${elementData.name}"
        style="
        object-fit: cover; 
        pointer-events: none;
        background-color:${elementData.bgColor};
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        border: 2px solid white !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        cursor: move !important;
        will-change: transform !important;
        backface-visibility: hidden !important;"
      />
    `;
    
    return L.divIcon({
      html: iconHtml,
      className: 'custom-div-icon circular-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  }, []);

  // Optimized drag end handler with debouncing
  const handleMarkerDragEnd = useCallback((e) => {
    const position = e.target.getLatLng();
    const markerId = e.target._leaflet_id;
    
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

  // Optimized drag handler for smoother movement
  const handleMarkerDrag = useCallback((e) => {
    // Optional: Add visual feedback during drag without updating state
    // This runs on every drag event but doesn't trigger React re-renders
  }, []);

  // Helper function to create markers with optimized event handlers
  const createOptimizedMarker = useCallback((position, data) => {
    if (!mapInstanceRef.current) return null;

    const marker = L.marker(position, { 
      icon: createCustomIcon(data),
      draggable: true,
      autoPan: false,
      keyboard: false,
      riseOnHover: false,
      riseOffset: 0
    }).addTo(mapInstanceRef.current)
      .bindPopup(data.name);

    // Add optimized event listeners
    marker.on('drag', handleMarkerDrag);
    marker.on('dragend', handleMarkerDragEnd);
    
    return marker;
  }, [createCustomIcon, handleMarkerDrag, handleMarkerDragEnd]);

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
      zoomControl: true,
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

    // Background layer
    const backgroundImageUrl = '/images/background.png';
    const backgroundBounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];
    L.imageOverlay(backgroundImageUrl, backgroundBounds, { opacity: 0.8 }).addTo(map);

    // Foreground layer (top)
    L.imageOverlay(imageUrl, bounds, { opacity: 0.9 }).addTo(map);

    // Fit the map to the image bounds
    map.fitBounds(bounds);

    // Store map instance
    mapInstanceRef.current = map;

    return map;
  }, [imageUrl]);

  // Handle element drop on map
  const handleElementDrop = useCallback((elementData, latLng) => {
    if (!mapInstanceRef.current) return;

    try {
      // Create a new marker at the drop location with optimized settings
      const newMarker = createOptimizedMarker([latLng.lat, latLng.lng], elementData);
      if (!newMarker) return;

      newMarker.bindPopup(`${elementData.name}<br>Type: ${elementData.type}`).openPopup();
      
      // Add to our tracking arrays
      markersRef.current.push(newMarker);
      const newPlacedElement = {
        ...elementData,
        position: [latLng.lat, latLng.lng],
        markerId: newMarker._leaflet_id
      };
      setPlacedElements(prev => {
	      const qq = [...prev, newPlacedElement];
	      console.info(qq);
	      return qq;
	    });
      
      console.log('Element placed:', newPlacedElement);
      
    } catch (error) {
      console.error('Error handling element drop:', error);
    }
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

  return {
    placedElements,
    setPlacedElements,
    mapInstanceRef,
    initializeMap,
    handleElementDrop,
    addMarkerStyles,
    cleanup,
    imageUrl
  };
};