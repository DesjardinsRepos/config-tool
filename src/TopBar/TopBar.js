import { useContext } from 'react';
import Toggle from "react-toggle"
import "react-toggle/style.css" 
import s from "./TopBar.css"
import { GlobalStateContext } from "../App.js"

export default ({}) => {
    const { 
        mode, 
        setMode, 
        showConnections, 
        setShowConnections,
        devices,
        connections
    } = useContext(GlobalStateContext);
    
    return (
        <div style={s.wrapper}>
            {mode == "canvas" &&
                <h1 style={s.heading}>LAB DEVICES</h1>
            }

            {mode == "pinplanner" &&
                <>
                    <div style={s.ppWrapper}>
                        <h1 style={s.heading}>PINPLANNER</h1>
                        <p style={s.text}>Show Connections</p>
                        <p style={s.text}>ON</p>
                        <Toggle defaultChecked={false} icons={false} className='topbar-toggle' 
                            onChange={() => setShowConnections(!showConnections)}/>
                        <p style={s.text}>OFF</p>
                    </div>
                    <button style={{...s.leaveButton, ...s.button}} onClick={() => setMode("canvas")}>
                        Leave Pinplanner
                    </button>
                </>
            }

            <button style={{...s.saveButton, ...s.button}} onClick={() => {
                const string = JSON.stringify({
                    status: "running",
                    roles: devices.map(d => ({
                        name: d.name, 
                        template_device: d.templateDevice,
                        'x-esc-position': d.startPosition
                    })),
                    serviceConfiguration: connections.map(c => ({
                        id: c.id,
                        serviceType: c.serviceType,
                        configuration: {}, // TODO
                        participants: c.participants.map(p => {
                            let pp = require("../general.js").findSelected({id: p.id}, devices, connections)[1]
                            return {
                                serviceId: pp.service.serviceId,
                                role: pp.parent.name,
                                config: {},
                            }
                        })
                    }))
                }, null, 2)

                const blob = new Blob([string], { type: 'application/json' })
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob);
                link.download = 'myObject.json';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }}>
                Save
            </button>
        </div>
    )
}