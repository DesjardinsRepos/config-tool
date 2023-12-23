import {useState} from "react"
import Draggable from "react-draggable";
import Service from "./Service"
import s from "./Device.css"
import {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"

export default ({setPanningEnabled, id}) => {
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
			defaultPosition={{x:6480*(1+1.5/4),y:3760*(1+1.5/4)}}
        >
            <div style={s.deviceWrapper}>
                <div style={s.header}>
                    <img style={s.img}/>
                    <h3 style={s.title}>3-ACHS-PORTAL</h3>
                    <img style={s.settings} src={require("../media/settings.png")}/>
                </div>
                <div style={s.servicesWrapper}>
                    {[1, 2, 3].map(s => (
                        <Service id={`${id}-${s}`}/>
                    ))}
                </div>
            </div>
        </Draggable>            
    )
}
