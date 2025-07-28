import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { X } from 'lucide-react';
import { useTab } from '@/context/TabContext';
import { useUrlParams } from "@/hooks/useUrlParams";

export const ColorSelection = ({ type, onClose }) => {
    const { toggleParameter } = useUrlParams();
    const {
        selectColor,
        setSelectColor,
        selectBGColor,
        setSelectBGColor
    } = useTab();

    return (
        <div style={{ position: 'relative' }}>
            <X 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    cursor: 'pointer',
                    zIndex: 10
                }}
                size={20}
                onClick={onClose}
            />
            {type === "bgColor" ? 
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
        </div>
    );
}