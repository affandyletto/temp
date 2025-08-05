import { ImagePlus, Tag, Archive, Trash2, X } from "lucide-react";

export const PhotoSelection=({onToggle, setSelectionMode})=> {
  return (
    <div className="flex flex-col gap-1">
    	<div className="px-5 pt-2 pb-4 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Options
        </div>
        <button 
        	onClick={()=>{
        		onToggle();
        	}}
          className="w-8 h-8 flex items-center justify-center"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="px-3 py-3">
	      {/* Comment */}
	      <div className="p-3 bg-white rounded-lg flex items-center gap-2" onClick={()=>{
	      	onToggle("createAlbum");
	      }}>
	        <ImagePlus className="w-5 h-5 text-gray-800" />
	        <div className="flex-1 flex items-center gap-2">
	          <span className="text-gray-800 text-sm font-normal">Create Album</span>
	        </div>
	      </div>

	      {/* Archive */}
	      <div className="p-3 bg-white rounded-lg flex items-center gap-2">
	        <Archive className="w-5 h-5 text-gray-800" />
	        <span className="text-gray-800 text-sm font-normal">Archive</span>
	      </div>

	      {/* Delete */}
	      <div className="p-3 bg-white rounded-lg flex items-center gap-2">
	        <Trash2 className="w-5 h-5 text-red-700" />
	        <span className="text-red-700 text-sm font-normal">Delete</span>
	      </div>
	  </div>
    </div>
  );
}