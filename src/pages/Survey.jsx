import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import {Topnav} from "@/apps/Survey/Topnav";
import {LibrarySidebar} from "@/apps/Survey/Sidebar/LibrarySidebar";
import {HistorySidebar} from "@/apps/Survey/Sidebar/HistorySidebar";
import {ElementListSidebar} from "@/apps/Survey/Sidebar/ElementListSidebar";
import {ElementDetailSidebar} from "@/apps/Survey/Sidebar/ElementDetailSidebar";
import { ElementHistoryDetail } from "@/apps/Survey/Elements/ElementHistoryDetail"
import { useNavigate } from "react-router-dom";
import { Design } from "@/apps/Survey/Elements/MiniPopup/Design"
import { InstallationAccess } from "@/apps/Survey/Elements/MiniPopup/InstallationAccess"
import { ElementInformation } from "@/apps/Survey/Elements/MiniPopup/ElementInformation"

import "@/apps/Survey/survey.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Survey = () => {
  const [isCollapsedRight, setIsCollapsedRight] = useState(false);
  const [isCollapsedLeft, setIsCollapsedLeft] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionParam, setVersionParam] = useState(null);
  const [moreParam, setMoreParam] = useState(null);
  const [placedElements, setPlacedElements] = useState([]); // Track placed elements
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]); // Track markers for cleanup
  const updateTimeoutRef = useRef(null); // For debouncing updates
  
  // Sample image URL - replace with your actual image
  const imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  
  // Create custom icon function - memoized for better performance
  const createCustomIcon = useCallback((elementData) => {
    const iconHtml = `
      <img 
        src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=40&h=40&fit=crop&crop=center"
        alt="${elementData.name}"
        style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"
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

  // Check URL parameters on component mount and when URL changes
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const versionValue = urlParams.get('version');
      const moreValue = urlParams.get('more');
      
      setVersionParam(versionValue);
      setMoreParam(moreValue);
      
      // Show version history only if 'version' parameter is present
      setShowVersionHistory(versionValue !== null);
    };
    
    // Check on initial load
    checkUrlParams();
    
    // Listen for URL changes (from the Topnav toggle)
    const handleUrlChange = () => {
      setTimeout(() => {
        checkUrlParams();
      }, 0);
    };
    
    window.addEventListener('urlchange', handleUrlChange);
    
    return () => {
      window.removeEventListener('urlchange', handleUrlChange);
    };
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create the map with optimized settings
    const map = L.map(mapRef.current, {
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
      preferCanvas: false, // Keep as SVG for better quality, but test with true if needed
      renderer: L.svg({ padding: 0.5 }), // Optimize rendering
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true
    });

    // Calculate image bounds
    const imageWidth = 2070;
    const imageHeight = 1380;
    const bounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];


    const backgroundImageUrl = '/images/background.png';
    const backgroundBounds = [[-imageHeight/2, -imageWidth/2], [imageHeight/2, imageWidth/2]];
    L.imageOverlay(backgroundImageUrl, backgroundBounds, { opacity: 0.8 }).addTo(map);

    // Foreground layer (top)
    const foregroundImageUrl = imageUrl
    L.imageOverlay(foregroundImageUrl, bounds, { opacity: 0.9 }).addTo(map);

    // Fit the map to the image bounds
    map.fitBounds(bounds);

    // Helper function to create markers with optimized event handlers
    const createOptimizedMarker = (position, data) => {
      const marker = L.marker(position, { 
        icon: createCustomIcon(data),
        draggable: true,
        autoPan: false,
        keyboard: false,
        riseOnHover: false,
        riseOffset: 0
      }).addTo(map)
        .bindPopup(data.name);

      // Add optimized event listeners
      marker.on('drag', handleMarkerDrag);
      marker.on('dragend', handleMarkerDragEnd);
      
      return marker;
    };

    // Add some sample markers with optimized settings
    const centerMarker = createOptimizedMarker([0, 0], { name: 'Center Point' });
    centerMarker.openPopup();
    
    const sampleMarker1 = createOptimizedMarker([200, 300], { name: 'Sample Location 1' });
    const sampleMarker2 = createOptimizedMarker([-200, -300], { name: 'Sample Location 2' });

    // Store initial markers
    markersRef.current = [centerMarker, sampleMarker1, sampleMarker2];

    // Store map instance
    mapInstanceRef.current = map;

    // Setup drop zone functionality
    const mapContainer = mapRef.current;
    
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
      
      try {
        const elementData = JSON.parse(e.dataTransfer.getData('application/json'));
        
        // Get the mouse position relative to the map container
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert pixel coordinates to map coordinates
        const latLng = map.containerPointToLatLng([x, y]);
        
        // Create a new marker at the drop location with optimized settings
        const newMarker = createOptimizedMarker([latLng.lat, latLng.lng], elementData);
        newMarker.bindPopup(`${elementData.name}<br>Type: ${elementData.type}`).openPopup();
        
        // Add to our tracking arrays
        markersRef.current.push(newMarker);
        const newPlacedElement = {
          ...elementData,
          position: [latLng.lat, latLng.lng],
          markerId: newMarker._leaflet_id
        };
        
        setPlacedElements(prev => [...prev, newPlacedElement]);
        
        console.log('Element placed:', newPlacedElement);
        
      } catch (error) {
        console.error('Error handling drop:', error);
      }
    };

    // Add event listeners for drag and drop
    mapContainer.addEventListener('dragover', handleDragOver);
    mapContainer.addEventListener('dragleave', handleDragLeave);
    mapContainer.addEventListener('drop', handleDrop);

    // Add optimized CSS for the markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-div-icon {
        background: transparent !important;
        border: none !important;
      }
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
      .custom-div-icon.circular-icon {
        background: transparent !important;
        border: none !important;
        width: 30px !important;
        height: 30px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        border: 2px solid white !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        cursor: move !important;
        will-change: transform !important;
        backface-visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      // Clear any pending timeouts
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      if (mapInstanceRef.current) {
        // Remove event listeners
        if (mapContainer) {
          mapContainer.removeEventListener('dragover', handleDragOver);
          mapContainer.removeEventListener('dragleave', handleDragLeave);
          mapContainer.removeEventListener('drop', handleDrop);
        }
        
        // Clean up markers
        markersRef.current.forEach(marker => {
          if (mapInstanceRef.current.hasLayer(marker)) {
            marker.off('drag', handleMarkerDrag);
            marker.off('dragend', handleMarkerDragEnd);
            mapInstanceRef.current.removeLayer(marker);
          }
        });
        
        // Remove custom style
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
        
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [imageUrl, createCustomIcon, handleMarkerDrag, handleMarkerDragEnd]);

  // Handle drag start from sidebar
  const handleElementDragStart = useCallback((element) => {
    console.log('Drag started for element:', element);
  }, []);
  
  const toggleCollapsedLeft = useCallback(() => {
    setIsCollapsedLeft(prev => !prev);
  }, []);
  
  const toggleCollapsedRight = useCallback(() => {
    setIsCollapsedRight(prev => !prev);
  }, []);
  
  const onBack = useCallback(() => {
    console.log("Navigating back to projects");
  }, []);

  return (
    <div className="survey-container h-screen flex flex-col">
      {/* Topnav with higher z-index and proper positioning */}
      <div className="relative z-[100] bg-white shadow-sm">
        <Topnav onBack={onBack}/>
      </div>
      
      {/* Main content area that takes remaining height */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Left Sidebar */}
        <div className={`${isCollapsedRight ? 'w-0' : 'w-72'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
          {showVersionHistory ? (
            <HistorySidebar isCollapsed={isCollapsedRight}/>
          ) : (
            <LibrarySidebar onDragStart={handleElementDragStart} />
          )}
          
          {/* Left sidebar toggle button */}
          <div className={`absolute ${isCollapsedRight ? 'left-0' : 'left-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-[60]`}>
            <button 
              onClick={toggleCollapsedRight}
              className="w-6 h-24 bg-white rounded-r-3xl border-r border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedRight ? 'rotate-0' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* Main Content Area - Leaflet Map */}
        <div className="flex-1 relative z-10">
          <div 
            ref={mapRef} 
            className="w-full h-full"
            style={{ 
              background: '#f0f0f0',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>
        
        <div className={`absolute ${isCollapsedLeft ? 'right-0' : 'right-72'} top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out z-[60]`}
          style={{ top: 'calc(50vh - 54.5px)' }}
        >
          <button 
            onClick={toggleCollapsedLeft}
            className="w-6 h-24 bg-white rounded-l-3xl border-l border-t border-b border-slate-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isCollapsedLeft ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
        
        {/* Right Sidebar */}
        <div className={`${isCollapsedLeft ? 'w-0' : 'w-72'} bg-white border-l border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden relative z-50`}>
          {selectedElement && !showVersionHistory ? (
            <ElementDetailSidebar selectedElement={selectedElement} setSelectedElement={setSelectedElement} isCollapsed={isCollapsedLeft}/>
          ) : showVersionHistory ? (
            <ElementHistoryDetail/>  
          ) : (
            <ElementListSidebar 
              setSelectedElement={setSelectedElement} 
              isCollapsed={isCollapsedLeft}
              onDragStart={handleElementDragStart}
            />
          )}    
          
          {selectedElement && (
            <>
              {moreParam === "design" ? (
                <div className="absolute top-5 right-full mr-3 z-[100]">
                  <Design/>
                </div>
              ) : moreParam === "installationAccess" ? (
                <div className="absolute top-5 right-full mr-3 z-[100]">
                  <InstallationAccess/>
                </div>
              ) : moreParam === "elementInformation" ? (
                <div className="absolute top-5 right-full mr-3 z-[100]">
                  <ElementInformation/>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};