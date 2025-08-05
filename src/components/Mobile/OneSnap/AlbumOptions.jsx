import { MessageCircle, Pen, Archive, Trash2, X } from "lucide-react";
import { useMobile } from '@/context/Mobile/MobileContext';

export const AlbumOptions=()=> {
  const { confModal, setConfModal, onToggle } = useMobile();

  return (
    <div className="flex flex-col gap-1">
    	<div className="px-5 pt-2 pb-4 border-b border-slate-200 flex justify-between items-center">
        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
          Edit Album
        </div>
        <button 
        onClick={()=>onToggle()}
          className="w-8 h-8 flex items-center justify-center"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="px-3 py-3">

	      {/* Label */}
	      <div 
        	onClick={()=>onToggle("editAlbum")} className="p-3 bg-white rounded-lg flex items-center gap-2">
	        <Pen className="w-5 h-5 text-gray-800" />
	        <span className="text-gray-800 text-sm font-normal">Edit</span>
	      </div>

	      {/* Delete */}
	      <div  onClick={()=>{
	      	setConfModal({
	      		title:"Do you want to delete this Album?", 
	      		content:"This album will be permanently deleted. You will not be able to recover it.", 
	      		submitButton:"Delete",
	      		 isShow:true})
	      }} className="p-3 bg-white rounded-lg flex items-center gap-2">
	        <Trash2 className="w-5 h-5 text-red-700" />
	        <span className="text-red-700 text-sm font-normal">Delete</span>
	      </div>
	  </div>
    </div>
  );
}