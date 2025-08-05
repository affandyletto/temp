import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMobile } from '@/context/Mobile/MobileContext';

export const EditAlbum = ({ onClose, onSave }) => {
	const { onToggle }=useMobile()
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave?.(title);
    }
  };

  const handleCancel = () => {
    setTitle('');
    onToggle()
  };

  return (
    <div className="w-full bg-white rounded-tl-3xl rounded-tr-3xl flex flex-col">
      
      {/* Header */}
      <div className="px-5 pt-2 pb-4 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Edit Album
        </div>
        <button 
          onClick={handleCancel}
          className="w-8 h-8 flex items-center justify-center"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-5 flex flex-col gap-4">
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight">
            Album Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input title"
            className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 text-sm font-normal font-['Inter'] leading-snug tracking-tight placeholder:text-zinc-500 focus:outline-none focus:border-primary-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-6 py-3 bg-primary-200 rounded-xl text-white text-sm font-semibold font-['Inter'] leading-snug tracking-tight disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-300 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-white rounded-xl border border-slate-200 text-gray-800 text-sm font-semibold font-['Inter'] leading-snug tracking-tight hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};