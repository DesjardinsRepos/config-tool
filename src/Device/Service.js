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
                <Connection direction={"left"} ser={ser}/>
                <img style={s.img}/>
                <p onClick={() => setOpen(!open)} style={s.text}>{ser.serviceId}</p>
                <svg style={open ? {...s.dropButton} : {...s.dropButton, ...s.rotated}} onClick={() => setOpen(!open)} width="32px" height="32px" viewBox="0 0 24 24" fill={c.darkSteel}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
                <Connection direction={"right"} ser={ser}/>
            </div>
            {open && 
                <div style={s.pinWrapper}>
                    {[1,1].map((v, k) => (
                        <Pin key={k}>D{k}</Pin>
                    ))}
                </div>
            }
        </div>
    )
}

const Connection = ({ser, direction}) => {
    const { 
        setSelected,
        selected,
        setPanningEnabled,
        setConnections,
        setConnectPos
    } = useContext(GlobalStateContext);

    const elementId = ser.id + "-" + direction.substring(0,1)

    return (
        <div style={{display: "flex"}} 

            onMouseDown={e=> {
                setSelected({
                    id: ser.id,
                    currentlyLineDrawing: true,
                    direction: direction
                })
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
                    setSelected(selected => selected.currentlyLineDrawing ? null : selected)
                    document.removeEventListener("mouseup", mouseMoveEnded)
                    document.removeEventListener("mousemove", mouseMove)
                }
                document.addEventListener("mouseup", mouseMoveEnded)
                document.addEventListener("mousemove", mouseMove)
            }}

            onMouseUp={()=> {
                if(selected?.currentlyLineDrawing) { // create connection
                    setPanningEnabled(true)

                    const [connection, connectionHash] = require("../general.js").createConnection(
                        {
                            id: ser.id,
                            direction: direction
                        },
                        selected
                    )

                    setConnections(connections => [
                        ... connections, connection
                    ])

                    setSelected({id: connectionHash})
                }
            }}
        >
        
            <div style={{position: "relative", display: "flex"}}>
                {(!ser.serviceDirection || ser.serviceDirection === "prosumer") && <svg style={{margin: "auto 11px auto 11px"}} 
                    height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" strokeWidth="1" 
                    fill={ser.id === selected.id ? c.darkSteel : c.steel}/>  
                </svg>} 

                {(ser.serviceDirection === "producer") && <svg style={{margin: "auto 11px auto 11px"}} height="12" width="13.44">
                <polygon points="2.8,1 11.8,5.75 2.8,11" fill={ser.id === selected.id ? c.darkSteel : c.steel} stroke="black" strokeWidth="1" />
                </svg>}

                {(ser.serviceDirection === "consumer") && <svg style={{margin: "auto 11px auto 11px"}} height="12" width="13.44">
                <polygon points="3.8,1 12.8,5.75 3.8,11" fill={ser.id === selected.id ? c.darkSteel : c.steel} stroke="black" strokeWidth="1" transform="rotate(180 6.6 6)" />
                </svg>}

                <div style={{ 
                    position: 'absolute', 
                    width: '0', 
                    height: '0', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)'
                }} id={elementId}/>
            </div>    
        </div>
    )
}
