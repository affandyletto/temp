import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUrlParams } from "@/hooks/useUrlParams";

export const ElementInformation = () => {
  const { toggleParameter, getParam } = useUrlParams();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    serialNumber: '',
    switchNumber: '',
    switchPortNumber: '',
    mdfIdf: ''
  });

  // Animation effect - component appears on mount
  useEffect(() => {
    // Small delay to trigger CSS animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    setIsVisible(false);
    // Delay the actual close to allow exit animation
    setTimeout(() => {
      toggleParameter("more", "elementInformation");
      console.log('Component closed');
    }, 200);
  };

  return (
    <div 
      className={`w-72 p-3 bg-white rounded-xl shadow-[0px_8px_16px_0px_rgba(145,158,171,0.24)] border border-slate-200 flex flex-col gap-4 transition-all duration-200 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 translate-x-3 scale-95'
      }`}
      style={{
        transformOrigin: 'right center'
      }}
    >
      {/* Header */}
      <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Element Information
        </div>
        <div className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-gray-700 transition-colors" onClick={handleClose}>
          <X size={20} />
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        {/* Label and Serial # Row */}
        <div className="flex gap-3">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Label
            </label>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
              <input
                type="text"
                value={formData.label}
                onChange={(e) => handleInputChange('label', e.target.value)}
                className="w-full min-w-0 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
                placeholder="Input label"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Serial #
            </label>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                className="w-full min-w-0 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
                placeholder="Input serial"
              />
            </div>
          </div>
        </div>

        {/* Switch # and Switch Port # Row */}
        <div className="flex gap-3">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Switch #
            </label>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
              <input
                type="text"
                value={formData.switchNumber}
                onChange={(e) => handleInputChange('switchNumber', e.target.value)}
                className="w-full min-w-0 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
                placeholder="Input switch"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
              Switch Port #
            </label>
            <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
              <input
                type="text"
                value={formData.switchPortNumber}
                onChange={(e) => handleInputChange('switchPortNumber', e.target.value)}
                className="w-full min-w-0 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
                placeholder="Input port"
              />
            </div>
          </div>
        </div>

        {/* MDF/IDF Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            MDF/IDF
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.mdfIdf}
              onChange={(e) => handleInputChange('mdfIdf', e.target.value)}
              className="w-full min-w-0 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input MDF/IDF"
            />
          </div>
        </div>
      </div>
    </div>
  );
};