import { useContext, useEffect, useState, useRef } from 'react';
import "react-toggle/style.css" 
import { GlobalStateContext } from "../App.js"
import {colors as c, shadows} from "../styles"
import { APIClient } from '@cross-lab-project/api-client';
import Connections from "../Connections/StaticConnections"
import ConnectionPoint from "../Connections/ConnectionPoint";
import Popup from "../Configuration/Popup"

const apiClient = new APIClient('https://api.goldi-labs.de');

export default ({}) => {
    const { 
        selected,
        devices,
        connections,
        setShowConnections,
    } = useContext(GlobalStateContext);
    const [refs, setRefs] = useState({})

    useEffect(() => {(async () => {
        let connection = require("../general.js").findSelected(selected, devices, connections)[1]
        let services = []

        connection.participants.map(s => 
            services.push(require("../general.js").findSelected(s, devices, connections)[1])
        )

        setRefs({
            connection: connection,
            services: services
        })

        // workaround to force redrawing of connections
        setShowConnections(state => !state)
        setTimeout(() => setShowConnections(state => !state), 1);

        // TODO fix this at resize
        // TODO fix that irrelevant connections are showing
    })()}, [])

    const service = s => {
        return s.parent.services.filter(ser => ser.serviceId === s.service.serviceId)[0]
    }
    // TODO remove doubled services
    return (
        <div style={{display: "flex", width: "100vw", overflow: "scroll", height: "calc(100% - 55px)", userSelect: "none"}}>
            {refs.services?.filter(
                (item, index, self) => self.findIndex(i => i.service.id === item.service.id) === index // filter unique
            ).map(s => (
                <div style={{padding: "0 20px", margin: "auto"}}>
                    
                    <div style={{borderRadius: "12px", backgroundColor: c.lightBlue, ...shadows.c, margin: "auto", minWidth: "400px" }}>
                        <div style={{minHeight: "100px", color: "white", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", backgroundColor: c.royal, padding: "10px", margin: "0", display: "flex", flexDirection: "column"}}>
                            <h1 style={{margin: "auto"}}>{s.service.serviceId}</h1>
                            <h2 style={{margin: "auto"}}>{s.parent.name}</h2>
                        </div>
                        {(!service(s) || !service(s).interfaces) &&
                        <p style={{margin: "auto", padding: "20px", textAlign: "center"}}>No configuration available</p>}

                        {service(s)?.interfaces?.map((inface, i) => {
                            if (inface.interfaceType === "gpio")
                                return (<GPIOpins inface={inface} service={service(s)} key={i} refs={refs}></GPIOpins>)
                            if (inface.interfaceType === "i2c")
                                return alert("no i2c support atm")//(<I2Cpins service={service(s).interfaces}></I2Cpins>)
                        })}
                    </div>
                </div>
            ))}
            
            {// TODO only show relevant connectionPoints
            }
            {connections.map(c => (
                c.participants.length > 2 && c.mode === "editor" && <ConnectionPoint c={c}/>
            ))}
            
            <Connections mode="editor"/>
        </div>
    )
}

const GPIOpins = ({service, inface, refs}) => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <p style={{margin: "auto", padding: "15px 0 0 0"}}> --- GPIO Pins ---</p>
            <div style={{display: "flex", flexDirection: "column", padding: "10px 30px"}}>
                {inface.availableSignals.gpio.map(s => (
                    <div style={{ backgroundColor: c.whiteSteel, margin: "10px 0", width: "350px", height: "40px", display: "flex", borderRadius: "20px", justifyContent: "space-between", border: `2px solid ${c.cornflower}`}}>
                        <ConnectionEndPoint id={`${service.id}-${s}`} direction="left" pin={s} type="GPIO" refs={refs}></ConnectionEndPoint>
                        <p style={{margin: "auto"}}>{s}</p>
                        <ConnectionEndPoint id={`${service.id}-${s}`} direction="right" pin={s} type="GPIO" refs={refs}></ConnectionEndPoint>
                    </div>
                ))}
            </div>
        </div>
    )
}
const ConnectionEndPoint = ({ id, direction, pin, type, refs }) => {
    const {
        setSelected,
        selected,
        setConnections,
        setConnectPos,
        connections,
        currentConnectionNumber,
        setCurrentConnectionNumber,
        devices,
        popupSettings,
        setPopupSettings
    } = useContext(GlobalStateContext);

    const showEndpointInPopupPosition = element => {
        if (element === "svg") {
            if (popupSettings?.endpointDirection === direction && popupSettings?.originId === id)
                return {position: "relative", zIndex: 2}
            return {position: "relative", zIndex: 0}
        } // else elemnt === "p"
        if (popupSettings?.endpointDirection === direction && popupSettings?.originId === id)
            return {zIndex: 3}
        return {zIndex: 1}
    }

    return (
        <div style={{ position: "relative" }}>
            {
                popupSettings?.connectionId === require("../general.js").getConnectionParentId(connections, id, direction)
                && popupSettings?.endpointDirection === direction
                && popupSettings?.originId === id
                &&
                <Popup
                    direction={direction}
                    id={id}
                />
            }

            <svg
                onMouseDown={e=> {
                    setSelected({
                        id: id,
                        currentlyLineDrawing: true,
                        direction: direction
                    })
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
                        setSelected(selected => selected.currentlyLineDrawing ? {} : selected)
                        document.removeEventListener("mouseup", mouseMoveEnded)
                        document.removeEventListener("mousemove", mouseMove)
                    }
                    document.addEventListener("mouseup", mouseMoveEnded)
                    document.addEventListener("mousemove", mouseMove)
                }}

                onMouseUp={(e)=> {
                    if(selected?.currentlyLineDrawing) {
                        // create new pin connection
                        const [connection, connectionHash] = require("../general.js").createEditorConnection(
                            {
                                id: id,
                                direction: direction
                            },
                            selected,
                            "editor",
                            currentConnectionNumber,
                            refs.connection.id,
                        )

                        setConnections(connections => [
                            ...connections, connection
                        ])

                        setSelected({id: connectionHash})
                        setCurrentConnectionNumber(currentConnectionNumber + 1)
                        
                        // open popup with the options of the individual pins
                        setPopupSettings({
                            connectionId: connectionHash,
                            endpointDirection: direction,
                            originId: id,
                            types: [ type ], // TODO add other types than GPIO
                            participants: connection.participants.map(p => ({
                                pin: p.id,
                                direction: require("../general.js").findSelected({ id : p.id.split("-")[0]}, devices, [])[1].service.serviceDirection
                            })),
                            settings: {
                                type: undefined,
                                participants: [undefined, undefined]
                            }
                        })
                    }
                }}

                style={{margin: "8px 11px auto 11px", ...showEndpointInPopupPosition("svg")}} 
                id={id + "-" + direction.substring(0, 1)} 
                height="24" 
                width="24">
                    <circle cx="12" cy="12" r="10" stroke={c.denim} strokeWidth="2" 
                fill={c.steel}/>
            </svg>

            <p 
                style={{position: "absolute", left: "19px", top: "-6px", pointerEvents: "none", ...showEndpointInPopupPosition("p")}}>
                {(() => 
                    connections
                    .filter(c => c.mode === "editor")
                    .map(c => 
                        c.participants
                        .map(p => p.id === id && p.direction === direction)
                        .includes(true) ? c.editNumber : null
                    )
                    .filter(b => b !== null)
                )()}
            </p>
        </div>
    )
}