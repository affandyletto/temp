import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { X } from 'lucide-react';
import { useTab } from '@/context/TabContext';
import { useMap } from '@/context/MapContext';
import { useUrlParams } from "@/hooks/useUrlParams";

export const ColorSelection = ({ type, onClose }) => {
    const { toggleParameter } = useUrlParams();

    const {
        selectedElement,
        updateElementInState
    } = useMap();

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
                    color={selectedElement?.bgColor}
                    onChange={(color) => {
                        updateElementInState(selectedElement.id, {
                            bgColor:color.hex,
                            opacity:color.rgba.a*100
                        })
                    }}
                />
                :
                <Sketch
                    style={{ marginLeft: 20 }}
                    color={selectedElement?.color}
                    onChange={(color) => {
                        updateElementInState(selectedElement.id, {
                            color:color.hex
                        })
                    }}
                />
            }
        </div>
    );
}