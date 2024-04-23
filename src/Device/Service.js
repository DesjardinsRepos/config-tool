import {colors as c} from "../styles"
import { useState } from "react";
import s from "./Service.css"
import Pin from "./Pin"
import { useContext } from 'react';
import { GlobalStateContext } from "../App.js"

export default ({ser}) => {
    const [open, setOpen ] = useState(false);
    return (
        <div style={open ? {...s.serviceWrapper, ...s.serviceOpen} : {...s.serviceWrapper}}>
            <div style={s.header}>
                <Connection id={`${ser.id}-l`}/>
                <img style={s.img}/>
                <p onClick={() => setOpen(!open)} style={s.text}>{ser.serviceId}</p>
                <svg style={open ? {...s.dropButton} : {...s.dropButton, ...s.rotated}} onClick={() => setOpen(!open)} width="32px" height="32px" viewBox="0 0 24 24" fill={c.darkSteel}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
                <Connection id={`${ser.id}-r`}/>
            </div>
            {open && 
                <div style={s.pinWrapper}>
                    {[1,1].map(() => (
                        <Pin>D0</Pin>
                    ))}
                </div>
            }
        </div>
    )
}

const Connection = ({id}) => {
    const { 
        setSelected,
        selected,
        setPanningEnabled,
        setConnections,
        setConnectPos
    } = useContext(GlobalStateContext);

    return (
        <div style={{display: "flex"}} 

            onMouseDown={e=> {
                setSelected(`&${id}:${e.pageX}:${e.pageY}`)
                setPanningEnabled(false)
                setConnectPos([
                    [e.clientX, e.clientY],
                    [e.clientX, e.clientY]
                ])

                const mouseMove = e => {
                    setConnectPos(connectPos => [
                        connectPos[0],
                        [e.clientX, e.clientY]
                    ])
                }
                const mouseMoveEnded = () => {
                    setPanningEnabled(true)
                    setSelected(selected => selected.startsWith("&") ? null : selected)
                    document.removeEventListener("mouseup", mouseMoveEnded)
                    document.removeEventListener("mousemove", mouseMove)
                }
                document.addEventListener("mouseup", mouseMoveEnded)
                document.addEventListener("mousemove", mouseMove)
            }}

            onMouseUp={()=> {
                if(selected?.startsWith("&")) { // create connection
                    setPanningEnabled(true)

                    const [connection, connectionHash] = require("../general.js").createConnection(
                        id,
                        selected.substring(1, 23)
                    )

                    setConnections(connections => [
                        ... connections, connection
                    ])

                    setSelected(connectionHash)
                }
            }}
        >
            <svg id={id} style={id.charAt(21) === "l" ? s.leftConnection : s.rightConnection} 
                height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" strokeWidth="1" 
                fill={id === selected ? c.darkSteel : c.steel}/></svg>     
        </div>
    )
}
