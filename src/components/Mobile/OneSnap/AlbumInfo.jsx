import { User, Calendar, Share, X } from "lucide-react";
import { useMobile } from '@/context/Mobile/MobileContext';


export const AlbumInfo=()=>{
  const { onToggle } = useMobile();
	return(
		<>
		<div className="flex flex-col gap-1">
	    	<div className="px-5 pt-2 pb-4 border-b border-slate-200 flex justify-between items-center">
		        <div className="text-gray-800 text-base font-semibold font-['Inter'] leading-normal tracking-tight">
		          Album Information
		        </div>
		        <button 
		        onClick={()=>onToggle()}
		          className="w-8 h-8 flex items-center justify-center"
		        >
		          <X className="w-6 h-6 text-gray-600" />
		        </button>
		      </div>
		     <div className="p-4">
			<div className="flex flex-col gap-4">
		      <div className="flex flex-col gap-2">
		        <div className="flex items-center gap-0.5">
		          <div className="text-gray-800 text-sm font-semibold">Album Title</div>
		        </div>
		        <div className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
		          <div className="flex-1 text-gray-800 text-sm">Album-01</div>
		        </div>
		      </div>
		      
		      <div className="flex flex-col gap-4">
		        <div className="flex items-center gap-2">
		          <User className="w-5 h-5 text-gray-800" />
		          <div className="flex-1 text-gray-800 text-sm">Created by Miftahul</div>
		        </div>
		        
		        <div className="flex items-center gap-2">
		          <Calendar className="w-5 h-5 text-gray-800" />
		          <div className="flex-1 text-gray-800 text-sm">05/21/2025 11:37 AM PDT</div>
		        </div>
		        
		        <button className="px-2 py-1 bg-blue-50 rounded-full flex items-center gap-1 w-fit">
		          <Share className="w-4 h-4 text-cyan-700" />
		          <span className="text-cyan-700 text-xs">Copy Public Link</span>
		        </button>
		      </div>
		    </div>
		    </div>
		</div>
		</>
	)
}