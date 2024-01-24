import {colors as c} from "../styles"
import { useState } from "react";
import s from "./Service.css"
import Pin from "./Pin"

export default ({ser}) => {
    const [open, setOpen ] = useState(false);

    // ser.serviceDirection: prosumer, ...?
    return (
        <div style={open ? {...s.serviceWrapper, ...s.serviceOpen} : {...s.serviceWrapper}}>
            <div style={s.header}>
                <svg id={`${ser.parentId}.${ser.id}-l`} style={s.leftConnection} height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" stroke-width="1" fill={c.steel}/></svg> 
                <img style={s.img}/>
                <p onClick={() => setOpen(!open)} style={s.text}>{ser.serviceId}</p>
                <svg style={open ? {...s.dropButton} : {...s.dropButton, ...s.rotated}} onClick={() => setOpen(!open)} width="32px" height="32px" viewBox="0 0 24 24" fill={c.darkSteel}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
                <svg id={`${ser.parentId}.${ser.id}-r`} style={s.rightConnection} height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" stroke-width="1" fill={c.steel}/></svg> 
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