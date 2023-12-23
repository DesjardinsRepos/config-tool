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
        	start="dev0-1-r" 
        	end="dev1-2-l" 
        	showHead={false} 
        	curveness={0.2} 
        	color="black" 
        	strokeWidth={1}
        />
    )        
}
