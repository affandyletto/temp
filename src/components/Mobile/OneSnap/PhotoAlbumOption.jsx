import { MessageCircle, Pen, Archive, ImageMinus, X } from "lucide-react";
import { useMobile } from '@/context/Mobile/MobileContext';

export const PhotoAlbumOption=()=> {
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

	      {/* Delete */}
	      <div  onClick={()=>{
	      	setConfModal({
	      		title:"Do you want to remove the pictures from this album?", 
	      		content:"This action will remove the selected pictures from the album. They won’t be deleted from your gallery", 
	      		submitButton:"Remove",
	      		 isShow:true})
	      }} className="p-3 bg-white rounded-lg flex items-center gap-2">
	        <ImageMinus className="w-5 h-5" />
	        <span className="text-sm font-normal">Delete</span>
	      </div>
	  </div>
    </div>
  );
}