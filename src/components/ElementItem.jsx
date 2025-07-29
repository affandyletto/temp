import React, { useState, useRef } from 'react';

export const ElementItem = ({ element, index }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const dragRef = useRef(null);
  const dragImageRef = useRef(null);

  // Mouse drag handlers (existing functionality)
  const handleMouseDragStart = (e) => {
    const elementData = element;
    
    e.dataTransfer.setData('application/json', JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create custom drag image
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: -1000px;
      left: -1000px;
      background: white;
    `;
    
    const img = document.createElement('img');
    img.src = element.url;
    img.alt = element.name;
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
    
    dragImage.appendChild(img);
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
    
    e.currentTarget.style.opacity = '0.5';
  };

  const handleMouseDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  // Touch handlers for iPad/mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    
    // Add a slight delay to distinguish between tap and drag
    setTimeout(() => {
      if (touchStart && !isDragging) {
        setIsDragging(true);
        // Create floating drag image
        createFloatingDragImage(touch.clientX, touch.clientY);
        // Make original semi-transparent
        if (dragRef.current) {
          dragRef.current.style.opacity = '0.5';
        }
      }
    }, 150);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !touchStart) return;
    
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    
    // Update floating drag image position
    if (dragImageRef.current) {
      dragImageRef.current.style.left = `${touch.clientX - 20}px`;
      dragImageRef.current.style.top = `${touch.clientY - 20}px`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) {
      setTouchStart(null);
      return;
    }
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Check if we're dropping on the map container
    const mapContainer = elementBelow?.closest('.leaflet-container');
    if (mapContainer) {
      // Create a synthetic drop event that matches your existing drop handler
      const syntheticEvent = {
        preventDefault: () => {},
        clientX: touch.clientX,
        clientY: touch.clientY,
        dataTransfer: {
          getData: (type) => {
            if (type === 'application/json') {
              return JSON.stringify(element);
            }
            return '';
          }
        }
      };
      
      // Trigger the existing drop event on the map container
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'preventDefault', { value: () => {} });
      Object.defineProperty(dropEvent, 'clientX', { value: touch.clientX });
      Object.defineProperty(dropEvent, 'clientY', { value: touch.clientY });
      Object.defineProperty(dropEvent, 'dataTransfer', { 
        value: {
          getData: (type) => {
            if (type === 'application/json') {
              return JSON.stringify(element);
            }
            return '';
          }
        }
      });
      
      mapContainer.dispatchEvent(dropEvent);
    }
    
    // Cleanup
    cleanup();
  };

  const createFloatingDragImage = (x, y) => {
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      pointer-events: none;
      left: ${x - 20}px;
      top: ${y - 20}px;
      transition: none;
    `;
    
    if (element.url) {
      const img = document.createElement('img');
      img.src = element.url;
      img.alt = element.name;
      img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
      dragImage.appendChild(img);
    } else {
      dragImage.style.background = 'rgb(226 232 240)';
    }
    
    document.body.appendChild(dragImage);
    dragImageRef.current = dragImage;
  };

  const cleanup = () => {
    setIsDragging(false);
    setTouchStart(null);
    
    // Restore original opacity
    if (dragRef.current) {
      dragRef.current.style.opacity = '1';
    }
    
    // Remove floating drag image
    if (dragImageRef.current && document.body.contains(dragImageRef.current)) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
  };

  return (
    <div 
      ref={dragRef}
      className={`flex-1 px-1 py-2 bg-white rounded-lg flex flex-col justify-center items-center gap-1 hover:bg-gray-50 cursor-grab active:cursor-grabbing ${isDragging ? 'dragging' : ''}`}
      draggable={true}
      onDragStart={handleMouseDragStart}
      onDragEnd={handleMouseDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: isDragging ? 'none' : 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div className="w-10 h-10 relative rounded-full overflow-hidden">
        {element.url ? (
          <img 
            src={element.url}
            alt={element.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        )}
      </div>
      <div className="text-center text-gray-800 text-[10px] font-normal leading-none tracking-tight">
        {element.name}
      </div>
    </div>
  );
};