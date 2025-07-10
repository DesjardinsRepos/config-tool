import { useContext } from 'react';
import Toggle from "react-toggle"
import "react-toggle/style.css" 
import s from "./TopBar.css"
import { GlobalStateContext } from "../App.js"

export default ({}) => {
    const { 
        mode, 
        setMode, 
        setSelected,
        showConnections, 
        setShowConnections,
        devices,
        connections,
        saveCallback,
        popupSettings,
    } = useContext(GlobalStateContext);

    return (
        <div style={s.wrapper}>
            {mode == "canvas" &&
                <>
                    <div style={s.ppWrapper}>
                        <h1 style={s.heading}>LAB DEVICES</h1>
                        <p style={s.text}>Show Connections</p>
                        <p style={s.text}>ON</p>
                        <Toggle defaultChecked={false} icons={false} className='topbar-toggle' 
                            onChange={() => setShowConnections(!showConnections)}/>
                        <p style={s.text}>OFF</p>
                    </div>
                </>
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
                    <button style={{...s.leaveButton, ...s.button}} onClick={() => {
                        setSelected({})
                        setMode("canvas")
                    }}>
                        Leave Pinplanner
                    </button>
                </>
            }

            <button style={{...s.saveButton, ...s.button}} onClick={() => {
                console.log("Devices", devices)
                console.log("Connections", connections)
                console.log("popupSettings", popupSettings)

                let busMapping = connections
                    .filter(c => c.mode === "editor")
                    .map(c => c.participants.map(p => p.id))

                let merged = true
                while (merged) {
                    merged = false

                    for (let i = 0; i < busMapping.length; i++) {
                        for (let j = i + 1; j < busMapping.length; j++) {
                            if (busMapping[i].some(pin => busMapping[j].includes(pin))) {
                                busMapping[i].push(...busMapping[j].filter(pin => !busMapping[i].includes(pin)))
                                busMapping.splice(j, 1)
                                merged = true
                                break
                            }
                        }
                        if (merged) break
                    }
                }


                console.log("Bus Mapping", busMapping)

                // TODO 
                // does it even make sense to just specify which pins of which services are in which bus? This way we wont know which pin is connected to which other specifically
                // if yes, we need to refactor the pin state since there are multiple states for the same pin at the same time

                saveCallback(
                    JSON.stringify({
                        status: "created",
                        roles: devices.map(d => ({
                            name: d.name, 
                            template_device: d.url ?? d.templateDevice,
                            'x-esc-position': d.startPosition
                        })),
                        serviceConfiguration: connections.filter(c => 
                            c.mode === "canvas"
                        ).map(canvasCon => {
                            const serviceTypes = canvasCon.participants.map(p => {
                                const [objType, parentService] = require("../general.js").findSelected({id: p.id}, devices, connections)
                                if (objType !== "service") 
                                    alert("Canvas connection articipants must reference service")
                                return parentService.service.serviceType
                            })

                            return ({
                                // id: canvasCon.id,
                                serviceType: serviceTypes[0], // TODO what happens when i connect different ones?
                                configuration: {},
                                participants: canvasCon.participants.map(service => {

                                    let [objType, obj] = require("../general.js").findSelected({id: service.id}, devices, connections)
                                    if (objType !== "service")
                                        alert("Canvas connection articipants must reference service")

                                    let interfaces = connections.filter(editCon =>
                                        editCon.mode === "editor" 
                                        && editCon.canvasParentConnectionId === canvasCon.id
                                        && editCon.participants.some(part => part.id.split("-")[0] === service.id)
                                    ).map(editCon => 
                                        editCon.participants.filter(p => p.id.split("-")[0] === service.id).map(p => ({
                                            ...editCon,
                                            participant: p
                                        }))
                                    ).flat().filter((int, index, self) =>
                                        index === self.findIndex(i => i.participant.id === int.participant.id)
                                    )
                                    .map(editCon => {
                                        const pinHandle = editCon.participant.id
                                        
                                        return {
                                            interfaceId: busMapping.flat().findIndex(i => 
                                                i === pinHandle
                                            ), 
                                            interfaceType: editCon.type?.toLowerCase() || "n/a",
                                            signals: {
                                                [editCon.type?.toLowerCase() || "n/a"]: pinHandle.split("-")[1],
                                            },
                                            busId: busMapping.findIndex(mapping => mapping.includes(editCon.participant.id)),
                                            driver: obj.parent.name,
                                            direction: { IN: "in", OUT: "out", BI: "inout" } [
                                                (() => {
                                                    const [objType, pin] = require("../general.js").findSelected({id: editCon.participant.id}, devices, connections)
                                                    if (objType !== "pin")
                                                        alert("Canvas connection articipants must reference Pin")

                                                    const connectionType = editCon.type?.toLowerCase();
                                                    const availableSignals = pin.service.interfaces.find(inface => inface.interfaceType === connectionType).availableSignals

                                                    const pinDirections = availableSignals?.[`${editCon.type?.toLowerCase()}-directions`]
                                                    const pinNames = availableSignals?.[editCon.type?.toLowerCase()]

                                                    return pinDirections?.[pinNames.findIndex(pinName =>
                                                        pinName === editCon.participant.id.split("-")[1]
                                                    )]
                                                })()
                                            ] || "n/a"
                                        }
                                    })

                                    return {
                                        serviceId: obj.service.serviceId,
                                        role: obj.parent.name,
                                        config: interfaces.length > 0 ? {
                                            interfaces: interfaces
                                        } : {},
                                    }
                                })
                            })
                        })
                    }, null, 2)
                )
            }}>
                Save
            </button>
        </div>
    )
}