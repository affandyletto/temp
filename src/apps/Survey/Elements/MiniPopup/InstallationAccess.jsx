import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, X } from 'lucide-react';
import { useUrlParams } from "@/hooks/useUrlParams";

export const InstallationAccess = () => {
  const { toggleParameter, getParam } = useUrlParams();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    assigned: 'Prime Vendor / Contractor',
    installedOn: '',
    installedBy: '',
    technicianAssigned: '',
    estimatedInstallationTime: '',
    technicianTypeRequired: '',
    specificInstallationNotes: ''
  });

  const [accessRequirements, setAccessRequirements] = useState('');

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

  const handleAccessRequirementChange = (requirement) => {
    setAccessRequirements(requirement);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Delay the actual close to allow exit animation
    setTimeout(() => {
      toggleParameter("more", "installationAccess");
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
          Installation Access
        </div>
        <div className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-gray-700 transition-colors" onClick={handleClose}>
          <X size={20} />
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        {/* Access Requirements Radio Buttons */}
        <div className="py-1 flex flex-wrap gap-2">
          {[
            { key: 'liftNeeded', label: 'Lift Needed' },
            { key: 'extensionLadderNeeded', label: 'Extension Ladder Needed' },
            { key: 'highTraffic', label: 'High Traffic' },
            { key: 'escortedAccess', label: 'Escorted Access' }
          ].map((requirement) => (
            <label
              key={requirement.key}
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <input
                type="radio"
                name="accessRequirements"
                value={requirement.key}
                checked={accessRequirements === requirement.key}
                onChange={() => handleAccessRequirementChange(requirement.key)}
                className="w-4 h-4"
              />
              <span className="text-gray-800 text-xs font-normal font-['Inter'] leading-tight tracking-tight">
                {requirement.label}
              </span>
            </label>
          ))}
        </div>

        {/* Assigned Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Assigned
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2 hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.assigned}
              onChange={(e) => handleInputChange('assigned', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Prime Vendor / Contractor"
            />
            <ChevronDown size={20} className="text-zinc-500" />
          </div>
        </div>

        {/* Installed On Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Installed On
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center gap-2 hover:bg-slate-150 transition-colors">
            <input
              type="date"
              value={formData.installedOn}
              onChange={(e) => handleInputChange('installedOn', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
            />
            <Calendar size={20} className="text-zinc-500" />
          </div>
        </div>

        {/* Installed By Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Installed By
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.installedBy}
              onChange={(e) => handleInputChange('installedBy', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input technician"
            />
          </div>
        </div>

        {/* Technician Assigned Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Technician Assigned
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.technicianAssigned}
              onChange={(e) => handleInputChange('technicianAssigned', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input technician"
            />
          </div>
        </div>

        {/* Estimated Installation Time Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Estimated Installation Time
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.estimatedInstallationTime}
              onChange={(e) => handleInputChange('estimatedInstallationTime', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input estimated"
            />
          </div>
        </div>

        {/* Technician Type Required Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Technician Type Required
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.technicianTypeRequired}
              onChange={(e) => handleInputChange('technicianTypeRequired', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input technician type"
            />
          </div>
        </div>

        {/* Specific Installation Notes Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight">
            Specific Installation Notes
          </label>
          <div className="min-h-11 p-3 bg-slate-100 rounded-lg flex items-center hover:bg-slate-150 transition-colors">
            <input
              type="text"
              value={formData.specificInstallationNotes}
              onChange={(e) => handleInputChange('specificInstallationNotes', e.target.value)}
              className="flex-1 bg-transparent text-gray-800 text-sm font-normal font-['Inter'] leading-snug tracking-tight outline-none"
              placeholder="Input specific installation notes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};