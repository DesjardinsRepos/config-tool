import {useState} from "react"
import Draggable from "react-draggable";
import Service from "./Service"
import s from "./Device.css"
import {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"

export default ({setPanningEnabled, id, dev}) => {
    const update = useXarrow();
    const [scale, setScale] = useState(1)

    useTransformEffect(({ state }) => {
        setScale(state.scale)
    	console.log(state)
        return () => {};
    });
	// 4* 1620/940
    return (
        <Draggable scale={scale} 
            onStart={() => setPanningEnabled(false)} 
            onStop={() => setPanningEnabled(true)}
            onDrag={update}
			bounds="parent"
			defaultPosition={{
                x:6480*(1+1.5/4) + dev.startPosition.x,
                y:3760*(1+1.5/4) + dev.startPosition.y
            }}
        >
            <div style={s.deviceWrapper}>
                <div style={s.header}>
                    <img style={s.img}/>
                    <h3 style={s.title}>{dev.name}</h3>
                    <img style={s.settings} src={require("../media/settings.png")}/>
                </div>
                <div style={s.servicesWrapper}>
                    {dev.services.map(s => (
                        <Service ser={{...s, parentId: dev.id}}/>
                    ))}
                </div>
            </div>
        </Draggable>            
    )
}
