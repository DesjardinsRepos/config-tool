import Draggable from "react-draggable";
import {useXarrow} from 'react-xarrows';
import { useContext } from 'react';
import { GlobalStateContext } from "../App.js"

export default ({setPanningEnabled, c, utils}) => {
    const update = useXarrow();

    const { 
        setSelected
    } = useContext(GlobalStateContext);

    return (
        <Draggable scale={utils.instance.transformState.scale} 
            onStart={() => {
                setSelected(c.id)
                setPanningEnabled(false)
            }}
            onStop={() => setPanningEnabled(true)}
            onDrag={() => update()}
			
			defaultPosition={{
                x: 9100,
                y: 5600
            }}
        >
            <div id={`${c.id}-wrapper`}
                style={{height: "50px", width: "50px", cursor: "grab", position: "absolute", backgroundColor: "red"}}
            >
                <div id={c.id} style={{margin: "25px"}}/>
            </div>
        </Draggable>            
    )
}