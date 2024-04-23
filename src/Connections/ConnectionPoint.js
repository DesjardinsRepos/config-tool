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
        devices,
        setConnections,
        connections
    } = useContext(GlobalStateContext);

    const evL = (c, e) => {
        if(selected.startsWith("&")) {
            setPanningEnabled(true)
            setConnections(connections.map(con => c.id === con.id ? {
                participants: [
                    ...c.participants,
                    selected.substring(1, 23)
                ],
                lastInteractionPosition: { 
                    x: e.clientX, 
                    y: e.clientY,
                    xDeviceOffset: - devices.length * 300, // solange das sich nicht resettet passt das
                },
                id: c.id
            } : con))
            setSelected(c.id)
        }
    }

    return (
        <Draggable scale={utils.instance.transformState.scale} 
            onStart={() => {
                setSelected(c.id)
                setPanningEnabled(false)
            }}
            onStop={() => setPanningEnabled(true)}
            onDrag={() => update()}
			
			defaultPosition={{
                x: (-utils.instance.transformState.positionX + c.lastInteractionPosition.x) / utils.instance.transformState.scale 
                    - 325,
                y: (-utils.instance.transformState.positionY + c.lastInteractionPosition.y) / utils.instance.transformState.scale 
                    - 80
            }}
        >
            <div id={`${c.id}-wrapper`} onMouseUpCapture={e => evL(c, e)}
                style={{height: "50px", width: "50px", cursor: "grab", position: "absolute"}}
            >
                <div id={c.id} style={{margin: "25px"}}/>
            </div>
        </Draggable>            
    )
}