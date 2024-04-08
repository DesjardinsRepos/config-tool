import React, {useState} from "react";
import Device from "../Device/Device"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Connections from "../Connections/Connections"
import {Xwrapper} from 'react-xarrows';
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";
import ConnectionPoint from "../Connections/ConnectionPoint";

export default () => {
    const { devices, connections, panningEnabled } = useContext(GlobalStateContext);

	const debugMarks = []
	for(let i = 0; i < 11280; i += 500) {
		for(let j = 0; j < 19440; j += 500) 
		debugMarks.push(<p key={i + "." + j} style={{marginTop: `${i}px`, marginLeft: `${j}px`, position: "absolute"}}>{i}x{j}</p>)
	}
    
    return (
        <Xwrapper>
            <TransformWrapper 
                panning={{disabled: !panningEnabled}}
                minScale={0.25}
                disablePadding={true}
                initialPositionX={-6480*(1+1.5/4)}
                initialPositionY={-3760*(1+1.5/4)}
            >
                {(utils) => (
                    <>
                        <TransformComponent 
                            wrapperStyle={{width: "100%", height: "100%"}} 
                            contentStyle={{width: "19440px", height: "11280px", backgroundColor: "white"}}
                        >
                            {/*console.log(utils)*/}
                        {debugMarks}
                        {devices.map(d => (
                            <Device dev={d} utils={utils} key={d.id}/>
                        ))}
                        {connections.map(c => (
                            c.participants.length > 2 && <ConnectionPoint c={c} utils={utils}/>
                        ))}
                        </TransformComponent>
                        
                        <Connections/>
                    </>
                )}
            </TransformWrapper>
        </Xwrapper>
    )
} 
