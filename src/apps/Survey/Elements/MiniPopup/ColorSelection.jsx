import React, { useState, useRef, useEffect } from 'react';
import { X, Pipette } from 'lucide-react';

import { useMap } from '@/context/MapContext';

// Utility functions
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const hexToHsv = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, v: 0 };
  
  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / diff) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / diff + 2;
    } else {
      h = (rNorm - gNorm) / diff + 4;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  return { h, s: s * 100, v: v * 100 };
};

const hsvToHex = (h, s, v) => {
  const hNorm = h / 60;
  const sNorm = s / 100;
  const vNorm = v / 100;
  
  const c = vNorm * sNorm;
  const x = c * (1 - Math.abs((hNorm % 2) - 1));
  const m = vNorm - c;
  
  let r, g, b;
  if (hNorm >= 0 && hNorm < 1) {
    [r, g, b] = [c, x, 0];
  } else if (hNorm >= 1 && hNorm < 2) {
    [r, g, b] = [x, c, 0];
  } else if (hNorm >= 2 && hNorm < 3) {
    [r, g, b] = [0, c, x];
  } else if (hNorm >= 3 && hNorm < 4) {
    [r, g, b] = [0, x, c];
  } else if (hNorm >= 4 && hNorm < 5) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return rgbToHex(r, g, b);
};

export const ColorSelection = ({ type = 'bgColor', onClose }) => {  
    const {
        selectedElement,
        updateElementInState
    } = useMap();
  const currentColor = type === 'bgColor' ? selectedElement?.bgColor : selectedElement?.color;
  const currentOpacity = selectedElement?.opacity || 100;
  
  const [color, setColor] = useState(currentColor || '#D9D9D9');
  const [hsv, setHsv] = useState(() => hexToHsv(currentColor || '#D9D9D9'));
  const [opacity, setOpacity] = useState(currentOpacity);
  
  const colorAreaRef = useRef(null);
  const hueBarRef = useRef(null);
  const opacityBarRef = useRef(null);
  
  const [isDragging, setIsDragging] = useState({
    colorArea: false,
    hueBar: false,
    opacityBar: false
  });

  const presetColors = [
    '#000000', '#FFFFFF', '#D1D5DB', '#8B5CF6', '#9CA3AF', '#0E7490',
    '#DC2626', '#D97706', '#6366F1', '#10B981', '#78716C', '#1D4ED8'
  ];

  // Update color when HSV changes
  useEffect(() => {
    const newHex = hsvToHex(hsv.h, hsv.s, hsv.v);
    setColor(newHex);
  }, [hsv]);

  // Update element state when color or opacity changes
  const updateElementColor = (newColor, newOpacity) => {
    if (type === 'bgColor') {
      updateElementInState(selectedElement?.id, {
        bgColor: newColor,
        opacity: newOpacity
      });
    } else {
      updateElementInState(selectedElement?.id, {
        color: newColor
      });
    }
  };

  const handleColorAreaClick = (e) => {
    if (!colorAreaRef.current) return;
    
    const rect = colorAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const s = (x / rect.width) * 100;
    const v = ((rect.height - y) / rect.height) * 100;
    
    const newHsv = { ...hsv, s: Math.max(0, Math.min(100, s)), v: Math.max(0, Math.min(100, v)) };
    setHsv(newHsv);
    
    const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    updateElementColor(newColor, opacity);
  };

  const handleHueBarClick = (e) => {
    if (!hueBarRef.current) return;
    
    const rect = hueBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const h = (x / rect.width) * 360;
    
    const newHsv = { ...hsv, h: Math.max(0, Math.min(360, h)) };
    setHsv(newHsv);
    
    const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    updateElementColor(newColor, opacity);
  };

  const handleOpacityBarClick = (e) => {
    if (!opacityBarRef.current) return;
    
    const rect = opacityBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newOpacity = (x / rect.width) * 100;
    
    const finalOpacity = Math.max(0, Math.min(100, newOpacity));
    setOpacity(finalOpacity);
    updateElementColor(color, finalOpacity);
  };

  const handleMouseDown = (area) => {
    setIsDragging(prev => ({ ...prev, [area]: true }));
  };

  const handleMouseMove = (e) => {
    if (isDragging.colorArea) {
      handleColorAreaClick(e);
    } else if (isDragging.hueBar) {
      handleHueBarClick(e);
    } else if (isDragging.opacityBar) {
      handleOpacityBarClick(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging({ colorArea: false, hueBar: false, opacityBar: false });
  };

  useEffect(() => {
    if (isDragging.colorArea || isDragging.hueBar || isDragging.opacityBar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleHexChange = (e) => {
    const newHex = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      setColor(newHex);
      setHsv(hexToHsv(newHex));
      updateElementColor(newHex, opacity);
    }
  };

  const handleOpacityChange = (e) => {
    const newOpacity = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
    setOpacity(newOpacity);
    updateElementColor(color, newOpacity);
  };

  const handlePresetClick = (presetColor) => {
    setColor(presetColor);
    setHsv(hexToHsv(presetColor));
    updateElementColor(presetColor, opacity);
  };

  const colorAreaStyle = {
    background: `linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(${hsv.h}, 100%, 50%))`
  };

  const hueBarStyle = {
    background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
  };

  const opacityBarStyle = {
    background: `linear-gradient(to right, transparent, ${color}), 
                 conic-gradient(#808080 90deg, transparent 90deg 180deg, #808080 180deg 270deg, transparent 270deg) 0 0/8px 8px`
  };

  return (
    <div className="w-72 p-3 bg-white rounded-xl shadow-[0px_8px_16px_0px_rgba(145,158,171,0.24)] outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col gap-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Color Picker
        </div>
        <button 
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded"
        >
          <X size={16} className="text-zinc-500" />
        </button>
      </div>

      {/* Color Area */}
      <div className="relative">
        <div 
          ref={colorAreaRef}
          className="w-full h-64 rounded-lg cursor-crosshair"
          style={colorAreaStyle}
          onClick={handleColorAreaClick}
          onMouseDown={() => handleMouseDown('colorArea')}
        />
        <div 
          className="w-3 h-3 absolute rounded-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.70)] outline outline-1 outline-white pointer-events-none"
          style={{
            left: `${(hsv.s / 100) * 100}%`,
            top: `${100 - (hsv.v / 100) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {/* Sliders */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Hue Slider */}
          <div className="relative">
            <div 
              ref={hueBarRef}
              className="w-full h-4 rounded-[500px] cursor-pointer"
              style={hueBarStyle}
              onClick={handleHueBarClick}
              onMouseDown={() => handleMouseDown('hueBar')}
            />
            <div 
              className="w-4 h-4 absolute rounded-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.70)] outline outline-1 outline-white pointer-events-none"
              style={{
                left: `${(hsv.h / 360) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Opacity Slider */}
          {type === 'bgColor' && (
            <div className="relative">
              <div 
                ref={opacityBarRef}
                className="w-full h-4 rounded-[500px] cursor-pointer"
                style={opacityBarStyle}
                onClick={handleOpacityBarClick}
                onMouseDown={() => handleMouseDown('opacityBar')}
              />
              <div 
                className="w-4 h-4 absolute rounded-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.70)] outline outline-1 outline-white pointer-events-none"
                style={{
                  left: `${opacity}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex gap-2">
        <div className={`${type !== 'bgColor' ? 'flex-1' : 'w-[172px]'} flex flex-col gap-1`}>
          <div className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            HEX
          </div>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center">
            <input
              type="text"
              value={color}
              onChange={handleHexChange}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
            />
          </div>
        </div>
        
        {type === 'bgColor' && (
          <div className="w-20 max-w-24 flex flex-col gap-1">
            <div className="h-[1.2rem]"></div>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2">
              <div className="text-zinc-500 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
                %
              </div>
              <input
                type="number"
                value={Math.round(opacity)}
                onChange={handleOpacityChange}
                min="0"
                max="100"
                className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-0 outline outline-1 outline-offset-[-0.50px] outline-slate-200" />

      {/* Preset Colors */}
      <div className="flex flex-col gap-2">
        <div className="text-gray-800 text-xs font-normal font-['Inter'] leading-tight tracking-tight">
          On This Page
        </div>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((presetColor, index) => (
            <button
              key={index}
              className="w-5 h-5 rounded border border-slate-200 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: presetColor }}
              onClick={() => handlePresetClick(presetColor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};