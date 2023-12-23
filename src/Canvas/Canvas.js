import React, {useState} from "react";
import Device from "../Device/Device"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Connections from "../Connections/Connections"
import {Xwrapper} from 'react-xarrows';

export default () => {
    const [panningEnabled, setPanningEnabled] = useState(true)

	
	const debugMarks = []
	for(let i = 0; i < 11280; i += 500) {
		for(let j = 0; j < 19440; j += 500) 
		debugMarks.push(<p key={i} style={{marginTop: `${i}px`, marginLeft: `${j}px`, position: "absolute"}}>{i}x{j}</p>)
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
                        {debugMarks}
                            <Device setPanningEnabled={setPanningEnabled} id="dev0"/>
                            <Device setPanningEnabled={setPanningEnabled} id="dev1"/>
                        </TransformComponent>
                        
                        <Connections/>
                    </>
                )}
            </TransformWrapper>
        </Xwrapper>
    )
} 
