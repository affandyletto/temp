import React, { useRef, useEffect, useCallback } from 'react';
import { useMap } from '@/context/MapContext';


export const LeafletMap = ({ onElementDragStart }) => {
  const mapRef = useRef(null);
  const {
    placedElements,
    mapInstanceRef,
    initializeMap,
    handleElementDrop,
    addMarkerStyles,
    cleanup, 
    imageUrl
  } = useMap();

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
    if (!mapRef.current) return;

    const map = initializeMap(mapRef.current);
    if (!map) return;

    // Add custom styles
    addMarkerStyles();

    // Setup drop zone
    const cleanupDropZone = setupDropZone(mapRef.current, map);

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
        background: '#f0f0f0',
        position: 'relative',
        zIndex: 1
      }}
    />
  );
};