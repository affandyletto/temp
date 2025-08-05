import { MoreVertical, User, Calendar } from "lucide-react";
import { useMobile } from '@/context/Mobile/MobileContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const CardAlbum=()=> {
	const { onToggle } = useMobile()
	const navigate = useNavigate();

  return (
    <div className="w-96 flex flex-col gap-2 mt-4" onClick={()=>{
    	navigate("/album/1")
    }}>
      {/* Image Grid */}
      <div className="h-48 rounded-xl overflow-hidden bg-gray-100">
        <img 
          className="w-full h-24 object-cover" 
          src="https://placehold.co/390x100" 
          alt="Album cover"
        />
        <div className="flex h-24">
          <img 
            className="w-1/2 h-full object-cover" 
            src="https://placehold.co/195x100" 
            alt="Photo 1"
          />
          <img 
            className="w-1/2 h-full object-cover" 
            src="https://placehold.co/195x100" 
            alt="Photo 2"
          />
        </div>
      </div>

      {/* Album Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Album-02</h3>
          <p className="text-xs text-zinc-500">2 Photos</p>
        </div>
        <button onClick={()=>{
        	onToggle("albumOptions")
        }} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-gray-50">
          <MoreVertical className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Divider */}
      <hr className="border-slate-200" />

      {/* Metadata */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 text-zinc-500" />
          <span className="text-xs text-zinc-500">Created By Miftahul</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-zinc-500" />
          <span className="text-xs text-zinc-500">05/21/2025 11:37 AM PDT</span>
        </div>
      </div>
    </div>
  );
}