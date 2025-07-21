import { MoreVertical, Clock, User } from 'lucide-react';


export const CardPhotoElement=({index, data})=>{
	return(
		<div key={index} className="bg-white border border-gray-300 rounded-xl">
	        {/* Image Container */}
	        <div className="p-2 relative">
	          <img 
	            className="w-full h-44 bg-gray-200 rounded-lg object-cover" 
	            src="https://placehold.co/240x172" 
	            alt="Camera capture"
	          />
	          <button className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
	            <MoreVertical className="w-4 h-4 text-gray-800" />
	          </button>
	        </div>

	        {/* Photo Info */}
	        <div className="px-3 pb-3">
	          <div className="flex flex-col gap-2">
	            {/* Title and ID */}
	            <div>
	              <h3 className="text-sm font-semibold text-gray-800">MV63X</h3>
	              <p className="text-xs text-zinc-500">Element ID: 766796 | CAMERA-1</p>
	            </div>

	            <hr className="border-slate-200" />

	            {/* Metadata */}
	            <div className="flex flex-col gap-1">
	              <div className="flex items-center gap-1">
	                <Clock className="w-3 h-3 text-zinc-500" />
	                <span className="text-xs text-zinc-500">05/21/2025 11:37 AM PDT</span>
	              </div>
	              <div className="flex items-center gap-1">
	                <User className="w-3 h-3 text-zinc-500" />
	                <span className="text-xs text-zinc-500">Uploaded by River Admin Stewart</span>
	              </div>
	            </div>
	          </div>
	        </div>
	    </div>
	)
}