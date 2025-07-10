import {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"
import StaticConnections from './StaticConnections.js';

export default ({mode}) => {
    const update = useXarrow();

    useTransformEffect(() => {
        update()
    
        return () => {};
    });

    return (
        <StaticConnections mode={mode}/>
    )        
}