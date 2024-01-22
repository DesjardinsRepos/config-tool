import {useState} from "react"
import Draggable from "react-draggable";
import Service from "./Service"
import s from "./Device.css"
import {useXarrow} from 'react-xarrows';

export default ({setPanningEnabled, dev, utils}) => {
    const update = useXarrow();
	// 4* 1620/940
    return (
        <Draggable scale={utils.instance.transformState.scale} 
            onStart={() => setPanningEnabled(false)} 
            onStop={() => setPanningEnabled(true)}
            onDrag={() => update()}
			bounds="parent"
			defaultPosition={{
                x: (-utils.instance.transformState.positionX + dev.startPosition.x) / utils.instance.transformState.scale 
                    + dev.startPosition.xDeviceOffset,
                y: (-utils.instance.transformState.positionY + dev.startPosition.y) / utils.instance.transformState.scale
            }}
        >
            <div style={s.deviceWrapper}>
                <div style={s.header}>
                    <img style={s.img}/>
                    <h3 style={s.title}>{dev.name}</h3>
                    <img style={s.settings} src={require("../media/settings.png")}/>
                </div>
                <div style={s.servicesWrapper}>
                    {dev.services && dev.services.map(s => (
                        <Service ser={{...s, parentId: dev.id}}/>
                    ))}
                </div>
            </div>
        </Draggable>            
    )
}

// klein: zu niedrig, zu rechts
// groß: zu hoch, zu links