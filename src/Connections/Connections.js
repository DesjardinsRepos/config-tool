import Xarrow, {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"

export default () => {
    const update = useXarrow();

    useTransformEffect(() => {
        update()
    
        return () => {};
    });

    return (
        <Xarrow 
        	start="dev0.ser1-r" 
        	end="dev1.ser2-l" 
        	showHead={false} 
        	curveness={0.2} 
        	color="black" 
        	strokeWidth={1}
            labels={
                <p onClick={() => alert("label")} style={{
                    backgroundColor: "#ffffffdd", 
                    borderRadius: 5
                }}>edit connection</p>
            }
            SVGcanvasProps={{
                onClick: () => alert("clicked")
            }}
            SVGcanvasStyle={{
                pointerEvents: "all",
                cursor: "pointer"
            }}
        />
    )        
}
