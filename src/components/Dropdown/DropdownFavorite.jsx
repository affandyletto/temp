import React from 'react';
import { X } from 'lucide-react';

export const DropdownFavorite = ({ favoriteElements, onRemoveFavorite }) => {
  return (
    <div className="w-96 bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="text-xl font-semibold text-gray-800">Favorite Element for Site A</div>
        <div className="text-sm text-zinc-500">{favoriteElements.length} of 20 favorites used</div>
      </div>
      
      <div className="flex-1 max-h-96 overflow-y-auto">
        {favoriteElements.length === 0 ? (
          <div className="px-4 py-32 flex flex-col gap-2">
            <div className="text-center text-gray-800 text-sm font-semibold leading-snug tracking-tight">Element has not been added</div>
            <div className="text-center text-zinc-500 text-xs font-normal leading-tight tracking-tight">Select your favorite elements available based on category.</div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {favoriteElements.map((item) => (
              <div key={item.id} className="p-3 bg-white rounded-xl flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <div className="text-primary-200 text-xs font-semibold">{item.code || 'E01'}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">{item.name}</div>
                    <div className="text-xs text-zinc-500 mt-1">{item.parentCategory}</div>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveFavorite(item)}
                  className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-red-50"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-4 pt-6 pb-4 border-t border-slate-200">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-2 bg-gradient-to-r from-blue-600 to-sky-900 rounded-full"
            style={{ width: `${(favoriteElements.length / 20) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2">
          <div className="text-xs text-zinc-500">{20 - favoriteElements.length} slots remaining</div>
        </div>
      </div>
    </div>
  );
};