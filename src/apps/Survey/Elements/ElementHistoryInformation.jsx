import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useMap } from '@/context/MapContext';

export const ElementHistoryInformation = () => {
  const [isOneSafeEnabled, setIsOneSafeEnabled] = useState(false);
  const {
      selectedElement,
    } = useMap();
    
  return (
    <div className="max-w-md mx-auto p-1 bg-white">
      <div className="space-y-4">
        {/* Survey Info Section */}
        <div className="space-y-3">
          <h3 className="text-gray-800 text-sm font-semibold">Survey Info</h3>
          <div className="space-y-1">
            {[
              { label: 'Location', value: selectedElement?.info?.design?.descriptiveLocation||"-" },
              { label: 'Element Height', value: selectedElement?.info?.design?.elementHeight||'-' },
              { label: 'Mounting Surface', value: selectedElement?.info?.design?.mountingSurface||'-' },
              { label: 'Status', value: selectedElement?.info?.design?.category||'-' },
              { label: 'Date Installed', value: selectedElement?.info?.installationAccess?.installedOn||'-' }
            ].map((item, index) => (
              <div key={index} className="space-y-0.5">
                <div className="text-zinc-500 text-xs leading-none">{item.label}</div>
                <div className="text-gray-800 text-xs font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200" />

        {/* Element Information Section */}
        <div className="space-y-3">
          <h3 className="text-gray-800 text-sm font-semibold">Element Information</h3>
          <div className="space-y-1">
            {[
              { label: 'Label', value: selectedElement?.info?.elementInformation?.label||'-' },
              { label: 'Serial', value: selectedElement?.info?.elementInformation?.serialNumber||'-' },
              { label: 'Switch', value: selectedElement?.info?.elementInformation?.switchNumber||'-' },
              { label: 'Switch Port', value: selectedElement?.info?.elementInformation?.switchPortNumber||'-' },
              { label: 'MDF/IDF', value: selectedElement?.info?.elementInformation?.mdfIdf||'-' }
            ].map((item, index) => (
              <div key={index} className="space-y-0.5">
                <div className="text-zinc-500 text-xs leading-none">{item.label}</div>
                <div className="text-gray-800 text-xs font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          {/* OneSafe Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOneSafeEnabled(!isOneSafeEnabled)}
              className={`relative w-8 h-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                isOneSafeEnabled ? 'bg-blue-500 shadow-lg' : 'bg-slate-200'
              }`}
            >
              <div 
                className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform ${
                  isOneSafeEnabled 
                    ? 'translate-x-4 rotate-180 shadow-lg' 
                    : 'translate-x-0.5 rotate-0'
                }`}
              ></div>
            </button>
            <span className={`text-xs font-semibold transition-colors duration-300 ${
              isOneSafeEnabled ? 'text-blue-600' : 'text-gray-800'
            }`}>
              OneSafe<sup>TM</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}