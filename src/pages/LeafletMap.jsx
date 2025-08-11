import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useMap } from '@/context/MapContext';
import { useProject } from '@/context/ProjectContext';



export const LeafletMap = ({ onElementDragStart }) => {
  const mapRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false)
  const {
    placedElements,
    mapInstanceRef,
    initializeMap,
    handleElementDrop,
    addMarkerStyles,
    cleanup, 
    imageUrl
  } = useMap();

  const {
    selectedSurvey
  } = useProject()

  // Setup drop zone functionality
  const setupDropZone = useCallback((mapContainer, map) => {
    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      mapContainer.style.cursor = 'copy';
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      mapContainer.style.cursor = 'default';
    };

    const handleDrop = (e) => {
      e.preventDefault();
      mapContainer.style.cursor = 'default';
        const elementData = JSON.parse(e.dataTransfer.getData('application/json'));
        
        // Get the mouse position relative to the map container
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert pixel coordinates to map coordinates
        const latLng = map.containerPointToLatLng([x, y]);
        console.info(latLng)
        // Handle the element drop using the hook
        handleElementDrop(elementData, latLng);
        
    };

    // Add event listeners for drag and drop
    mapContainer.addEventListener('dragover', handleDragOver);
    mapContainer.addEventListener('dragleave', handleDragLeave);
    mapContainer.addEventListener('drop', handleDrop);

    // Return cleanup function
    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('dragover', handleDragOver);
        mapContainer.removeEventListener('dragleave', handleDragLeave);
        mapContainer.removeEventListener('drop', handleDrop);
      }
    };
  }, [handleElementDrop]);

  // Initialize map and setup event listeners
  useEffect(() => {
    if (!mapRef.current || !selectedSurvey?.picture || isInitialized) return;

    const map = initializeMap(mapRef.current);
    if (!map) return;
    // Add custom styles
    addMarkerStyles();
    console.info("INITIALIZING")
    // Setup drop zone
    const cleanupDropZone = setupDropZone(mapRef.current, map);
    setIsInitialized(true)
    // Cleanup function
    return () => {
      cleanupDropZone();
      cleanup();
    };
  }, [imageUrl, initializeMap, addMarkerStyles, setupDropZone, cleanup]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ 
        backgroundImage: `url('/images/background.png')`,
	    backgroundSize: 'cover', // or 'contain' depending on desired effect
	    backgroundPosition: 'center',
	    backgroundRepeat: 'no-repeat',
	    position: 'relative',
	    zIndex: 1,
      }}
    />
  );
};