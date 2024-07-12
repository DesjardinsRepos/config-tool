import Draggable from "react-draggable";
import {useXarrow} from 'react-xarrows';
import { useContext } from 'react';
import { GlobalStateContext } from "../App.js"

export default ({c, utils}) => {
    const { setPanningEnabled } = useContext(GlobalStateContext);
    const update = useXarrow();

    const { 
        setSelected,
        selected,
        setConnections
    } = useContext(GlobalStateContext);

    const onLineDrop = (c, e) => {
        if(selected.currentlyLineDrawing) {
            setPanningEnabled(true)

            require("../general").addParticipantToConnection(
                setSelected,
                setConnections,
                c,                              // initial connection
                selected,                    // connectionToAdd
                {                               // last interacted position
                    x: e.clientX,
                    y: e.clientY
                }
            )
        }
    }

    return (
        <Draggable scale={utils.instance.transformState.scale} 
            onStart={() => {
                setSelected({id: c.id})
                setPanningEnabled(false)
            }}
            onStop={() => setPanningEnabled(true)}
            onDrag={() => update()}
			
			defaultPosition={require("../general").calculateInitialConnectionPointPosition(
                utils.instance.transformState,
                c.lastInteractionPosition
            )}
        >
            <div id={`${c.id}-wrapper`} onMouseUpCapture={e => onLineDrop(c, e)}
                style={{height: "50px", width: "50px", cursor: "grab", position: "absolute"}}
            >
                {c.id === selected.id ? 
                    <svg height={6} width={6} style={{margin: "22px", position: "absolute"}}>
                        <circle r={3} cx={3} cy={3} fill={c.id === selected.id ? "black" : "grey"}/>
                    </svg>
                :
                    <svg height={4} width={4} style={{margin: "23px", position: "absolute"}}>
                        <circle r={2} cx={2} cy={2} fill="grey"/>
                    </svg>
                }
                <div id={c.id} style={{margin: "25px"}}/>
            </div>
        </Draggable>            
    )
}