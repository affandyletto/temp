import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { useMap } from '@/context/MapContext';

export const ColorSelection=({type})=>{
	const {
	    selectColor,
	    setSelectColor,
	    selectBGColor,
	    setSelectBGColor
	  } = useMap();

	return(<>
		{type==="bgColor"?
			<Sketch
	          style={{ marginLeft: 20 }}
	          color={selectBGColor}
	          onChange={(color) => {
	            setSelectBGColor(color.hex);
	          }}
	        />
		:
			<Sketch
	          style={{ marginLeft: 20 }}
	          color={selectColor}
	          onChange={(color) => {
	            setSelectColor(color.hex);
	          }}
	        />
		}
			
        </>
	)
}