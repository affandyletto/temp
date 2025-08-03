import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import L from 'leaflet';
import { v4 as uuidv4 } from "uuid";
import { useMap } from '@/context/MapContext';

const LineContext = createContext();

export const useLine = () => {
  const context = useContext(LineContext);
  if (!context) {
    throw new Error('useLine must be used within a LineProvider');
  }
  return context;
};

export const LineProvider = ({ children }) => {
  const { mapInstanceRef, selectedElement, placedElements, setSelectedID } = useMap();
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const linePolylinesRef = useRef([]);
  const lineMarkersRef = useRef([]);
  const isDraggingRef = useRef(false);
  const isElementSwitchFromLineRef = useRef(false);

  // Get lines for the currently selected element
  const elementLines = lines.filter(line => line.elementId === selectedElement?.id);
  
  // Update selectedLine when selectedElement changes
  useEffect(() => {
    if (selectedElement) {
      setSelectedLine(null);
      
    }
  }, [selectedElement?.id]);

  // Clear selectedID when a line is selected
  // useEffect(() => {
  //   if (selectedLine) {
  //     setSelectedID(null);
  //   }
  // }, [selectedLine, setSelectedID]);

  // UTILITY FUNCTIONS
  const calculateDistance = (pos1, pos2) => {
    const dx = pos2[0] - pos1[0];
    const dy = pos2[1] - pos1[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateTotalLength = (sections) => {
    return sections.reduce((total, section) => total + (section.length || 0), 0);
  };

  const calculateLineWidth = () => {
    if (!mapInstanceRef.current) return 0.5;
    const zoom = mapInstanceRef.current.getZoom();
    const baseWidth = 2;
    const zoomFactor = Math.pow(2, -zoom);
    return Math.max(0.2, baseWidth * zoomFactor);
  };

  const createPolygonFromPoints = (startPos, endPos, color) => {
    const lineWidth = calculateLineWidth();
    const dx = endPos[0] - startPos[0];
    const dy = endPos[1] - startPos[1];
    const angle = Math.atan2(dy, dx);
    
    const perpX = (-Math.sin(angle) * lineWidth) / 2;
    const perpY = (Math.cos(angle) * lineWidth) / 2;
    
    const points = [
      [startPos[0] + perpX, startPos[1] + perpY],
      [startPos[0] - perpX, startPos[1] - perpY],
      [endPos[0] - perpX, endPos[1] - perpY],
      [endPos[0] + perpX, endPos[1] + perpY],
      [startPos[0] + perpX, startPos[1] + perpY]
    ];
    
    return L.polygon(points, {
      color: color,
      fillColor: color,
      fillOpacity: 1,
      weight: 1,
      opacity: 1
    });
  };

  const createLineEndpointIcon = (isStart = true) => {
    const iconHtml = `
      <div style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${isStart ? '#ef4444' : '#22c55e'};
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: move;
      "></div>
    `;
    
    return L.divIcon({
      html: iconHtml,
      className: 'line-endpoint-icon',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  const createSectionEndpointIcon = () => {
    const iconHtml = `
      <div style="
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #3b82f6;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: move;
      "></div>
    `;
    
    return L.divIcon({
      html: iconHtml,
      className: 'section-endpoint-icon',
      iconSize: [8, 8],
      iconAnchor: [4, 4]
    });
  };

  const updateAllLineColors = (selectedLineId) => {
    if (!mapInstanceRef.current || lines.length === 0) {
      return;
    }
    
    lines.forEach(line => {
      const isSelected = line.id === selectedLineId;
      const color = isSelected ? '#22c55e' : (line.color || '#22c55e');
      
      line.sections?.forEach(section => {
        const sectionPolyline = linePolylinesRef.current.find(p => p.sectionId === section.id);
        if (sectionPolyline && sectionPolyline.polyline && mapInstanceRef.current.hasLayer(sectionPolyline.polyline)) {
          try {
            sectionPolyline.polyline.setStyle({
              color: color,
              fillColor: color
            });
          } catch (error) {
            // Silent error handling
          }
        }
      });
    });
  };

  // REFRESH LINE DATA FROM CURRENT MARKER POSITIONS
  const refreshLineDataFromMarkers = (line) => {
    const updatedSections = line.sections.map(section => {
      const startMarker = lineMarkersRef.current.find(m => 
        m.lineId === line.id && m.sectionId === section.id && m.isStart
      );
      const endMarker = lineMarkersRef.current.find(m => 
        m.lineId === line.id && m.sectionId === section.id && !m.isStart
      );
      
      if (startMarker && endMarker) {
        const startPos = startMarker.marker.getLatLng();
        const endPos = endMarker.marker.getLatLng();
        const currentStartPos = [startPos.lat, startPos.lng];
        const currentEndPos = [endPos.lat, endPos.lng];
        
        return {
          ...section,
          startPosition: currentStartPos,
          endPosition: currentEndPos,
          length: calculateDistance(currentStartPos, currentEndPos)
        };
      }
      return section;
    });
    
    return {
      ...line,
      sections: updatedSections,
      totalLength: calculateTotalLength(updatedSections)
    };
  };

  // SIMPLE LINE SELECTION - ALWAYS GETS COMPLETE LINE
  const selectLine = (lineId) => {
    const completeLineToSelect = lines.find(l => l.id === lineId);
    if (!completeLineToSelect) {
      return;
    }

    // Refresh line data with current marker positions
    const refreshedLine = refreshLineDataFromMarkers(completeLineToSelect);
    
    if (completeLineToSelect.elementId !== selectedElement?.id) {
      const targetElement = placedElements.find(el => el.id === completeLineToSelect.elementId);
      
      if (targetElement) {
        isElementSwitchFromLineRef.current = true;        
        setTimeout(() => {
          setSelectedLine(refreshedLine);
          updateAllLineColors(lineId);
          isElementSwitchFromLineRef.current = false;
        }, 100);
      }
    } else {
      setSelectedLine(refreshedLine);
      updateAllLineColors(lineId);
    }
  };

  // REDRAW SECTION (for drag updates)
  const redrawLineSection = (lineId, sectionId) => {
    if (!mapInstanceRef.current) return;

    const sectionPolyline = linePolylinesRef.current.find(p => p.sectionId === sectionId);
    if (!sectionPolyline) return;

    const startMarker = lineMarkersRef.current.find(m => 
      m.lineId === lineId && m.sectionId === sectionId && m.isStart
    );
    const endMarker = lineMarkersRef.current.find(m => 
      m.lineId === lineId && m.sectionId === sectionId && !m.isStart
    );

    if (startMarker && endMarker) {
      const startPos = startMarker.marker.getLatLng();
      const endPos = endMarker.marker.getLatLng();
      
      const currentLine = lines.find(l => l.id === lineId);
      const isSelected = selectedLine?.id === lineId;
      const color = isSelected ? '#22c55e' : (currentLine?.color || '#22c55e');
      
      // Remove old polygon
      if (mapInstanceRef.current.hasLayer(sectionPolyline.polyline)) {
        mapInstanceRef.current.removeLayer(sectionPolyline.polyline);
      }
      
      // Create new polygon
      const newPolygon = createPolygonFromPoints([startPos.lat, startPos.lng], [endPos.lat, endPos.lng], color);
      
      // Add click handler
      newPolygon.on('click', () => {
        selectLine(lineId);
      });
      
      newPolygon.addTo(mapInstanceRef.current);
      sectionPolyline.polyline = newPolygon;
    }
  };

  // UPDATE STATE AFTER DRAG
  const updateLineState = () => {
    setLines(prev => prev.map(line => {
      const updatedSections = line.sections.map(section => {
        const startMarker = lineMarkersRef.current.find(m => 
          m.lineId === line.id && m.sectionId === section.id && m.isStart
        );
        const endMarker = lineMarkersRef.current.find(m => 
          m.lineId === line.id && m.sectionId === section.id && !m.isStart
        );
        
        if (startMarker && endMarker) {
          const startPos = startMarker.marker.getLatLng();
          const endPos = endMarker.marker.getLatLng();
          return {
            ...section,
            startPosition: [startPos.lat, startPos.lng],
            endPosition: [endPos.lat, endPos.lng],
            length: calculateDistance([startPos.lat, startPos.lng], [endPos.lat, endPos.lng])
          };
        }
        return section;
      });
      
      return {
        ...line,
        sections: updatedSections,
        totalLength: calculateTotalLength(updatedSections)
      };
    }));
  };

  // EVENT HANDLERS
  const handleMarkerDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleMarkerDrag = (e) => {
    const draggedMarkerId = e.target._leaflet_id;
    const affectedSections = lineMarkersRef.current.filter(m => m.marker._leaflet_id === draggedMarkerId);
    
    affectedSections.forEach(({ lineId, sectionId }) => {
      redrawLineSection(lineId, sectionId);
    });
  };

  const handleMarkerDragEnd = (e) => {
    const draggedMarkerId = e.target._leaflet_id;
    const markerData = lineMarkersRef.current.find(m => m.marker._leaflet_id === draggedMarkerId);
    
    if (markerData) {
      // Get the current line from the existing state
      const currentLine = lines.find(l => l.id === markerData.lineId);
      
      if (currentLine) {
        // Create the updated line data immediately using current marker positions
        const refreshedLine = refreshLineDataFromMarkers(currentLine);
        
        // Update the selected line immediately with fresh data
        setSelectedLine(refreshedLine);
        updateAllLineColors(markerData.lineId);
      }
      
      // Update the lines state (this will happen asynchronously)
      updateLineState();
    }
    
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  const handleMarkerClick = (e, lineId) => {
    if (e.originalEvent) {
      e.originalEvent.stopPropagation();
    }
    
    if (!isDraggingRef.current) {
      selectLine(lineId);
    }
  };

  // UPDATE COLORS WHEN SELECTION CHANGES
  React.useEffect(() => {
    if (selectedLine?.id && lines.length > 0) {
      const timeoutId = requestAnimationFrame(() => {
        updateAllLineColors(selectedLine.id);
      });
      
      return () => cancelAnimationFrame(timeoutId);
    }
  }, [selectedLine?.id, lines.length]);

  const updateAllLinesWidth = useCallback(() => {
    lines.forEach(line => {
      line.sections.forEach(section => {
        redrawLineSection(line.id, section.id);
      });
    });
  }, [lines, selectedLine]);

  React.useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.on('zoomend', updateAllLinesWidth);
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.off('zoomend', updateAllLinesWidth);
        }
      };
    }
  }, [updateAllLinesWidth]);

  // CREATE A NEW LINE WITH FIRST SECTION
  const createLine = useCallback((color = '#22c55e') => {
    if (!mapInstanceRef.current || !selectedElement) return;

    const startPos = selectedElement.position;
    const endPos = [startPos[0] + 50, startPos[1] + 50];
    const lineId = uuidv4();
    const sectionId = uuidv4();

    // Create line data FIRST
    const newLine = {
      id: lineId,
      elementId: selectedElement.id,
      sections: [{
        id: sectionId,
        startPosition: startPos,
        endPosition: endPos,
        length: calculateDistance(startPos, endPos)
      }],
      color: color,
      totalLength: calculateDistance(startPos, endPos)
    };

    // Update state IMMEDIATELY
    setLines(prev => {
      const updated = [...prev, newLine];
      return updated;
    });
    
    // Set selection IMMEDIATELY
    setSelectedLine(newLine);

    // Create polygon for first section (#22c55e since it will be selected)
    const polygon = createPolygonFromPoints(startPos, endPos, '#22c55e');
    polygon.addTo(mapInstanceRef.current);

    // Add click handler
    polygon.on('click', (e) => {
      e.originalEvent?.stopPropagation();
      
      if (!isDraggingRef.current) {
        selectLine(lineId);
      }
    });

    // Store polyline reference
    linePolylinesRef.current.push({
      lineId: lineId,
      sectionId: sectionId,
      polyline: polygon
    });

    // Create markers
    const startMarker = L.marker(startPos, {
      icon: createLineEndpointIcon(true),
      draggable: true,
      zIndexOffset: 2000
    }).addTo(mapInstanceRef.current);

    const endMarker = L.marker(endPos, {
      icon: createLineEndpointIcon(false),
      draggable: true,
      zIndexOffset: 2000
    }).addTo(mapInstanceRef.current);

    // Add event handlers
    [startMarker, endMarker].forEach((marker, index) => {
      marker.on('dragstart', handleMarkerDragStart);
      marker.on('drag', handleMarkerDrag);
      marker.on('dragend', handleMarkerDragEnd);
      marker.on('click', (e) => {
        handleMarkerClick(e, lineId);
      });
    });

    // Store markers
    lineMarkersRef.current.push(
      { marker: startMarker, lineId, sectionId, isStart: true },
      { marker: endMarker, lineId, sectionId, isStart: false }
    );
    
    return newLine;
  }, [mapInstanceRef, selectedElement]);

  // ADD SECTION TO SELECTED LINE - ALWAYS FROM LAST SECTION!
  const addSection = useCallback(() => {
    if (!selectedLine || !mapInstanceRef.current) {
      return;
    }

    // Get the CURRENT line data from the lines array (most up-to-date)
    const currentLineInState = lines.find(l => l.id === selectedLine.id);
    if (!currentLineInState) {
      return;
    }

    // Get ALL markers for this line
    const allMarkersForLine = lineMarkersRef.current.filter(m => m.lineId === selectedLine.id);

    // Find the absolute last section from the ordered sections array
    const orderedSections = currentLineInState.sections;
    const absoluteLastSection = orderedSections[orderedSections.length - 1];

    // Find the END marker of the absolute last section
    const absoluteLastSectionEndMarker = allMarkersForLine.find(m => 
      m.sectionId === absoluteLastSection.id && 
      !m.isStart // This is the END marker
    );
    
    if (!absoluteLastSectionEndMarker) {
      return;
    }

    // Get the CURRENT LIVE position from the marker
    const currentEndMarkerPosition = absoluteLastSectionEndMarker.marker.getLatLng();
    const startPos = [currentEndMarkerPosition.lat, currentEndMarkerPosition.lng];
    
    // Create end position for new section
    const endPos = [startPos[0] + 50, startPos[1] + 50];
    const sectionId = uuidv4();

    // Create polygon for new section
    const polygon = createPolygonFromPoints(startPos, endPos, '#22c55e');
    polygon.addTo(mapInstanceRef.current);

    // Add click handler
    polygon.on('click', (e) => {
      e.originalEvent?.stopPropagation();
      if (!isDraggingRef.current) {
        selectLine(selectedLine.id);
      }
    });

    // Store polyline reference
    linePolylinesRef.current.push({
      lineId: selectedLine.id,
      sectionId: sectionId,
      polyline: polygon
    });

    // Create NEW END marker for the new section
    const newEndMarker = L.marker(endPos, {
      icon: createLineEndpointIcon(false),
      draggable: true,
      zIndexOffset: 2000
    }).addTo(mapInstanceRef.current);

    // Add event handlers to new end marker
    newEndMarker.on('dragstart', handleMarkerDragStart);
    newEndMarker.on('drag', handleMarkerDrag);
    newEndMarker.on('dragend', handleMarkerDragEnd);
    newEndMarker.on('click', (e) => {
      if (!isDraggingRef.current) {
        handleMarkerClick(e, selectedLine.id);
      }
    });

    // Update the last section's end marker to be a connection point
    absoluteLastSectionEndMarker.marker.setIcon(createSectionEndpointIcon());

    // Also update its click handler
    absoluteLastSectionEndMarker.marker.off('click');
    absoluteLastSectionEndMarker.marker.on('click', (e) => {
      if (!isDraggingRef.current) {
        handleMarkerClick(e, selectedLine.id);
      }
    });

    // Store markers for the new section
    lineMarkersRef.current.push(
      { marker: absoluteLastSectionEndMarker.marker, lineId: selectedLine.id, sectionId, isStart: true },
      { marker: newEndMarker, lineId: selectedLine.id, sectionId, isStart: false }
    );

    // Create new section data using CURRENT positions
    const newSection = {
      id: sectionId,
      startPosition: startPos,
      endPosition: endPos,
      length: calculateDistance(startPos, endPos)
    };

    // Update lines state - APPEND to the end of sections array
    setLines(prev => prev.map(line => 
      line.id === selectedLine.id 
        ? { 
            ...line, 
            sections: [...line.sections, newSection],
            totalLength: calculateTotalLength([...line.sections, newSection])
          }
        : line
    ));

    // Update selected line state
    const updatedSections = [...selectedLine.sections, newSection];
    const updatedLine = {
      ...selectedLine,
      sections: updatedSections,
      totalLength: calculateTotalLength(updatedSections)
    };
    setSelectedLine(updatedLine);
    
    return newSection;
  }, [selectedLine, mapInstanceRef, lines]);

  const deleteLine = useCallback((lineId) => {
    const line = lines.find(l => l.id === lineId);
    if (!line || !mapInstanceRef.current) return;

    // Remove polygons
    const polylineData = linePolylinesRef.current.filter(p => p.lineId === lineId);
    polylineData.forEach(({ polyline }) => {
      if (mapInstanceRef.current.hasLayer(polyline)) {
        mapInstanceRef.current.removeLayer(polyline);
      }
    });

    // Remove markers
    const markersToRemove = lineMarkersRef.current.filter(m => m.lineId === lineId);
    markersToRemove.forEach(({ marker }) => {
      marker.off();
      if (mapInstanceRef.current.hasLayer(marker)) {
        mapInstanceRef.current.removeLayer(marker);
      }
    });

    // Update refs
    linePolylinesRef.current = linePolylinesRef.current.filter(p => p.lineId !== lineId);
    lineMarkersRef.current = lineMarkersRef.current.filter(m => m.lineId !== lineId);
    
    // Update state
    setLines(prev => prev.filter(l => l.id !== lineId));
    
    if (selectedLine?.id === lineId) {
      setSelectedLine(null);
    }
  }, [lines, selectedLine, mapInstanceRef]);

  const clearAllLines = useCallback(() => {
    lines.forEach(line => deleteLine(line.id));
  }, [lines, deleteLine]);

  const deselectLine = useCallback(() => {
    setSelectedLine(null);
    // Update all lines to their default colors
    if (lines.length > 0) {
      requestAnimationFrame(() => {
        updateAllLineColors(null);
      });
    }
  }, [lines]);

  const updateLineColor = useCallback((lineId, newColor) => {
    if (!mapInstanceRef.current) return;

    // Update the line in state
    setLines(prev => prev.map(line => 
      line.id === lineId 
        ? { ...line, color: newColor }
        : line
    ));

    // Update selectedLine if it's the one being changed
    if (selectedLine && selectedLine.id === lineId) {
      setSelectedLine(prev => ({ ...prev, color: newColor }));
    }

    // Update visual appearance immediately
    const line = lines.find(l => l.id === lineId);
    if (line) {
      line.sections?.forEach(section => {
        const sectionPolyline = linePolylinesRef.current.find(p => p.sectionId === section.id);
        if (sectionPolyline && sectionPolyline.polyline && mapInstanceRef.current.hasLayer(sectionPolyline.polyline)) {
          try {
            sectionPolyline.polyline.setStyle({
              color: newColor,
              fillColor: newColor
            });
          } catch (error) {
            // Silent error handling
          }
        }
      });
    }
  }, [lines, selectedLine, setLines, setSelectedLine]);

  const contextValue = {
    lines,
    selectedLine,
    setSelectedLine,
    createLine,
    addSection,
    deleteLine,
    clearAllLines,
    deselectLine,
    calculateDistance,
    elementLines,
    updateLineColor
  };

  return (
    <LineContext.Provider value={contextValue}>
      {children}
    </LineContext.Provider>
  );
};