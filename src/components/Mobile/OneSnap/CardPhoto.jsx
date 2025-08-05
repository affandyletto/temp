import { MoreVertical, Calendar, User, MapPin, Eye, Check } from 'lucide-react';

export const CardPhoto = ({ 
  photo, 
  selectionMode, 
  isSelected, 
  onToggleSelection, 
  onOptionsClick 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden cursor-pointer ${
        selectionMode && isSelected 
          ? 'border-2 border-primary-200' 
          : 'border border-gray-300'
      }`}
      onClick={() => selectionMode && onToggleSelection(photo.id)}
    >
      <div className="relative">
        <img 
          src={photo.imageUrl} 
          alt="Snap" 
          className="w-full h-32 object-cover"
        />
        {selectionMode && isSelected && (
          <div className="absolute inset-0 bg-primary-200/20" />
        )}

        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (selectionMode) {
              onToggleSelection(photo.id);
            } else {
              onOptionsClick();
            }
          }} 
          className={`absolute top-3 right-3 p-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] ${
            selectionMode && isSelected 
              ? 'outline-slate-200' 
              : 'outline-slate-200'
          } inline-flex justify-center items-center gap-2`}
        >
          {selectionMode && isSelected ? (
            <Check className="w-4 h-4 text-primary-200" />
          ) : (
            <MoreVertical className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <div className="p-2">
        <div className="mb-2">
          <h3 className="text-xs font-semibold text-gray-800">{photo.label}</h3>
          <p className="text-xs text-gray-500">{photo.description}</p>
        </div>
        
        <hr className="border-gray-200 mb-2" />
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{photo.uploadDate}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>Uploaded by {photo.uploadedBy}</span>
          </div>
          
          <div className="flex gap-1">
            <div className="p-1 border border-gray-200 rounded-md">
              <MapPin className="w-3 h-3 text-gray-800" />
            </div>
            <div className="p-1 border border-gray-200 rounded-md relative">
              <Eye className="w-3 h-3 text-black" />
              {photo.hasNotification && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-600 border border-white rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};