import Draggable from "react-draggable";
import Service from "./Service"
import s from "./Device.css"
import {useXarrow} from 'react-xarrows';
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";

export default ({dev, utils}) => {
    const update = useXarrow();
    const { setPanningEnabled, dragEnabled } = useContext(GlobalStateContext);

    const { 
        setSelected,
        selected
    } = useContext(GlobalStateContext);

	// 4* 1620/940
    return (
        <Draggable scale={utils.instance.transformState.scale} 
            handle=".drag-header"
            onStart={() => {setPanningEnabled(false); setSelected(dev.id)}} 
            onStop={() => setPanningEnabled(true)}
            onDrag={() => update()}
            disabled={!dragEnabled}
			bounds="parent"
			defaultPosition={{
                x: (-utils.instance.transformState.positionX + dev.startPosition.x) / utils.instance.transformState.scale 
                    + dev.startPosition.xDeviceOffset,
                y: (-utils.instance.transformState.positionY + dev.startPosition.y) / utils.instance.transformState.scale
            }}
        >
            <div style={selected === dev.id ? {...s.deviceWrapper, ...s.activeShadow} : s.deviceWrapper}>
                <div className="drag-header" style={s.header}>
                    <img style={s.img}/>
                    <h3 style={s.title}>{dev.name}</h3>
                    <img style={s.settings} src={require("../media/settings.png")}/>
                </div>
                <div style={s.servicesWrapper}>
                    {dev.services && dev.services.map(s => (
                        <Service ser={{...s, parentId: dev.id}} key={s.id}/>
                    ))}
                </div>
            </div>
        </Draggable>            
    )
}

// klein: zu niedrig, zu rechts
// groß: zu hoch, zu links