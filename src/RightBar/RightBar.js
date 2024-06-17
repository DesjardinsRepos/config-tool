import s from "./RightBar.css"
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";
import JSONPretty from 'react-json-pretty';
import Service from "../Device/Service"
import { findSelected } from "../general.js";
import {colors as c, shadows} from "../styles.js"
import topBarStyle from "../TopBar/TopBar.css"

export default () => {
    const { setSelected, setConnections, selected, devices, connections } = useContext(GlobalStateContext);

    return (
        <div style={s.barWrapper}>
            <div style={s.header}>
                <img style={s.settingsIcon} src={require("../media/settings.png")}/>
                <h3 style={s.heading}>Properties</h3>
                <img style={s.exit} onClick={() => setSelected(null)} src={require("../media/exit.png")}/>
            </div>
            {(() => {
                const [type, obj] = require("../general.js").findSelected(selected, devices, connections)
                
                if(type === "device") return <DeviceInfo obj={obj}/>

                if(type === "connection") return (
                    <>
                        <div style={{position: "relative", height: "100%"}}>
                            <div style={{overflow: "auto", maxHeight: "750px", margin: "10px"}}>
                                <div style={{borderRadius: 5, padding: "10px"}}>
                                    <h3>PARTICIPANTS</h3>
                                    {obj.participants.map(p => {
                                        const service = findSelected(p, devices, connections)[1]
                                        const device = findSelected(p.substring(0, 10), devices, connections)[1]
                                        const direction = p.substring(21, 22) === "l" ? "LEFT" : "RIGHT"

                                        return <div style={{backgroundColor: c.whiteSteel, borderRadius: 8, margin: "10px 0", padding: "5px 10px", display: "flex", justifyContent: "space-between"}}>
                                            <div>
                                                <p style={{fontSize: 18, margin: "0 auto"}}>{`${service.serviceId}`}</p>
                                                <p style={{fontSize: 12, margin: "0 auto"}}>{device.name}</p>
                                            </div>
                                            <div onClick={() => require("../general").changeParticipantDirection(obj, p, setConnections)} 
                                                style={{backgroundColor: c.lightBlue, height: 30, width: 60, margin: "auto 10px auto auto", borderRadius: 8, display: "flex", justifyContent: "space-between", cursor: "pointer", }}>
                                                <p style={{fontSize: 14, margin: "auto auto auto auto", pointerEvents: "none", userSelect: "none"}}>{direction}</p>
                                                <img style={{width: "16px", height: "16px", margin: "auto 3px auto -2px", pointerEvents: "none"}} src={require("../media/switch.png")}/>
                                            </div>
                                            <div onClick={() => require("../general").deleteParticipant(obj, p, setConnections)} 
                                                style={{backgroundColor: c.lightBlue, height: 30, width: 30, margin: "auto 0", borderRadius: 8, cursor: "pointer"}}>
                                                <svg style={{margin: "4px 0 0 4px", pointerEvents: "none"}} version="1.1" width="22" height="22" viewBox="0 0 256 256"><defs></defs><g style={{stroke: "none", strokeWidth: 0, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 64.71 90 H 25.291 c -4.693 0 -8.584 -3.67 -8.859 -8.355 l -3.928 -67.088 c -0.048 -0.825 0.246 -1.633 0.812 -2.234 c 0.567 -0.601 1.356 -0.941 2.183 -0.941 h 59.002 c 0.826 0 1.615 0.341 2.183 0.941 c 0.566 0.601 0.86 1.409 0.813 2.234 l -3.928 67.089 C 73.294 86.33 69.403 90 64.71 90 z M 18.679 17.381 l 3.743 63.913 C 22.51 82.812 23.771 84 25.291 84 H 64.71 c 1.52 0 2.779 -1.188 2.868 -2.705 l 3.742 -63.914 H 18.679 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 80.696 17.381 H 9.304 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 71.393 c 1.657 0 3 1.343 3 3 S 82.354 17.381 80.696 17.381 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 58.729 17.381 H 31.271 c -1.657 0 -3 -1.343 -3 -3 V 8.789 C 28.271 3.943 32.214 0 37.061 0 h 15.879 c 4.847 0 8.789 3.943 8.789 8.789 v 5.592 C 61.729 16.038 60.386 17.381 58.729 17.381 z M 34.271 11.381 h 21.457 V 8.789 C 55.729 7.251 54.478 6 52.939 6 H 37.061 c -1.538 0 -2.789 1.251 -2.789 2.789 V 11.381 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /> 
                                                    <path d="M 58.33 74.991 c -0.06 0 -0.118 -0.002 -0.179 -0.005 c -1.653 -0.097 -2.916 -1.517 -2.819 -3.171 l 2.474 -42.244 c 0.097 -1.655 1.508 -2.933 3.171 -2.819 c 1.653 0.097 2.916 1.516 2.819 3.17 l -2.474 42.245 C 61.229 73.761 59.906 74.991 58.33 74.991 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 31.669 74.991 c -1.577 0 -2.898 -1.23 -2.992 -2.824 l -2.473 -42.245 c -0.097 -1.654 1.165 -3.073 2.819 -3.17 c 1.646 -0.111 3.073 1.165 3.17 2.819 l 2.473 42.244 c 0.097 1.654 -1.165 3.074 -2.819 3.171 C 31.788 74.989 31.729 74.991 31.669 74.991 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 45 74.991 c -1.657 0 -3 -1.343 -3 -3 V 29.747 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 42.244 C 48 73.648 46.657 74.991 45 74.991 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g>
                                                </svg>
                                            </div>
                                            
                                        </div>
                                    })}
                                </div>
                                <JSONPretty id="json-pretty" data={obj}></JSONPretty>
                            </div>
                            
                            <div style={{position: "absolute", bottom: 0, width: "100%"}}>
                                    
                                <div style={{height: "50px", background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(204, 220, 236, 1))"}}/>
                                <div style={{display: "flex", justifyContent: "center", width: "100%", backgroundColor: c.lightBlue, paddingBottom: "130px"}}>
                                    <button style={{...topBarStyle.button, borderRadius: "7px", margin: "5px"}} onClick={() => {}}>Configure</button>
                                    <button style={{...topBarStyle.button, borderRadius: "7px", margin: "5px"}}>delete Connection</button>
                                </div>
                            </div>
                        </div>
                    </>
                )

                return "unknown"
            })()}
        </div>
    )
}

const DeviceInfo = ({obj}) => (
    <>
        {obj.services?.map((s, k) => (
            <Service ser={s} key={k}></Service>
        ))}
        <JSONPretty id="json-pretty" data={obj}></JSONPretty>
    </>
)