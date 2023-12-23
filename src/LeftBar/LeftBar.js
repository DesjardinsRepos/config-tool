import { useState } from "react";
import { colors as c } from "../styles.js";
import s from "./LeftBar.css"

export default () => {
    const groups = [
        {
            name: "Group 1",
            elements: [
                {
                    name: "Element 1"
                },
                {
                    name: "Element 2"
                }
            ]
        },
        {
            name: "Group 2",
            elements: [
                {
                    name: "Element 1"
                },
                {
                    name: "Element 2"
                }
            ]
        }
    ]
    return (
        <div style={s.wrapperToFixAutoResize}>
            <div style={s.barWrapper}>
                {groups.map(g => (
                    <DeviceDropdown group={g}/>
                ))}
            </div>
        </div>
    )
}

const DeviceDropdown = ({group}) => {
    const [open, setOpen ] = useState(false);

    return (
        <div style={open ? s.groupsWrapper:{}}>
            <div style={s.groupWrapper} onClick={() => setOpen(!open)}>
                <img style={s.img}/>
                <p style={s.groupText}>{group.name}</p>
                <svg style={open ? {...s.dropButton} : {...s.dropButton, ...s.rotated}} onClick={() => setOpen(!open)} width="32px" height="32px" viewBox="0 0 24 24" fill={c.darkSteel}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M7 10l5 5 5-5"></path> </g> </g></svg>
                <svg style={s.info} fill={c.royal} width="13px" height="13px" viewBox="0 0 416.979 416.979"><g><path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/></g></svg>
            </div>
            <hr style={s.hr} />
            {open &&
                <div style={s.elementsWrapper}>
                    {group.elements.map(el => (
                        <div style={s.elementWrapper}>
                            <img style={s.img}/>
                            <p style={s.elementText}>{el.name}</p>
                            <svg style={s.info} fill={c.royal} width="13px" height="13px" viewBox="0 0 416.979 416.979"><g><path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/></g></svg>
                        </div>
                    ))}
                    <hr style={s.hr} />
                </div>
            }
        </div>
    )
}