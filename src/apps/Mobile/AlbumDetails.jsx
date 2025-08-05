import { CardPhoto } from "@/components/Mobile/OneSnap/CardPhoto";
import { useMobile } from '@/context/Mobile/MobileContext';

export const AlbumDetails=()=>{
  const { onToggle } = useMobile();
	const photos = [
	    {
	      id: 'photo1',
	      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
	      label: 'OneSnap Label',
	      description: 'OneSnap Description Example',
	      uploadDate: '05/21/2025 11:37 AM PDT',
	      uploadedBy: 'Miftahul',
	      hasNotification: true
	    },
	    {
	      id: 'photo2',
	      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
	      label: 'OneSnap Label',
	      description: 'OneSnap Description Example',
	      uploadDate: '05/21/2025 11:37 AM PDT',
	      uploadedBy: 'Miftahul',
	      hasNotification: false
	    }
	  ];
	return(
		<>
			<div className="px-5 grid grid-cols-2 gap-4 mt-4">
              {photos.map((photo) => (
                <CardPhoto
                  key={photo.id}
                  photo={photo}
                  selectionMode={false}
                  onOptionsClick={() => onToggle("photoAlbumOption")}
                />
              ))}
            </div>
		</>
	)
}