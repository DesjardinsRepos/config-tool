import { useContext, useState } from 'react';
import "react-toggle/style.css" 
import { GlobalStateContext } from "../App.js"
import {colors as c} from "../styles"

const PopupButton = ({label, selectedCondition, activationFunction}) => (
    <button style={{backgroundColor: selectedCondition ? "orange" : "white", margin: "2px", borderRadius: "10px", boxShadow: "none", border: "1px solid " + c.steel, width: "43px"}}
        onClick={activationFunction}>
        {label}
    </button>
)

export default ({direction, id}) => {
    const { selected, connections, setConnections, popupSettings, setPopupSettings, setDevices } = useContext(GlobalStateContext);

    const calculateLeftPosition = (direction) => 
        popupSettings?.endpointDirection === "left"
            ? direction === "left" 
                ? "calc(50% + 152px)" 
                : "calc(50% - 148px)"
            : direction === "left" 
                ? "calc(50% + 148px)"
                : "calc(50% - 152px)"
                
    return (
        <>
        {popupSettings && (
            
            <div
                style={{
                    width: "332px",
                    overflow: "auto",
                    backgroundColor: c.darkBlue,
                    color: "white",
                    borderRadius: "15px",
                    position: "absolute",
                    top: "calc(100% - 42px)",
                    left: calculateLeftPosition(direction),
                    transform: "translateX(-50%)",
                    padding: "10px",
                    border: "1px solid black",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 2
                }}
            >

                {
                    // make space for connectionEndpoint
                    popupSettings?.originId && <div style={{height: "30px"}}/>
                }
                
                <div style={{
                    display: "flex", 
                    alignItems: "space-between",
                    justifyContent: "space-between",
                }}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "space-between"}}>
                        <p style={{margin: "0 5px 5px 5px"}}>Connection</p>
                        <div style={{display: "flex"}}>
                            <div style={{display: "flex", flexDirection: "column",  alignItems: "space-between"}}>
                                {
                                    popupSettings.types.map((t, i) => i % 2 === 0 && 
                                        <PopupButton 
                                            label={t} 
                                            selectedCondition={popupSettings.settings?.type === t} 
                                                activationFunction={() => setPopupSettings(s => ({...s, settings: {
                                                ...s.settings,
                                                type: t
                                            }}))}/>
                                    )
                                }
                            </div>
                            <div style={{display: "flex", flexDirection: "column",  alignItems: "space-between"}}>
                                {
                                    popupSettings.types.map((t, i) => i % 2 === 1 && 
                                        <PopupButton 
                                            label={t} 
                                            selectedCondition={popupSettings.settings?.type === t} 
                                                activationFunction={() => setPopupSettings(s => ({...s, settings: {
                                                ...s.settings,
                                                type: t
                                            }}))}/>
                                    )
                                }    
                            </div>
                        </div>
                    </div>
                    {
                        popupSettings.participants.map((p, i) =>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <p style={{margin: "0 5px 3px 5px"}}>{p.pin.split("-")[1]}</p>
                                {
                                    p.direction === "consumer" || p.direction === "prosumer" && 
                                        <PopupButton 
                                            label="IN" 
                                            selectedCondition={popupSettings.settings.participants[i] === "IN"} 
                                            activationFunction={() => setPopupSettings(s => ({...s, settings: {
                                                ...s.settings,
                                                participants: s.settings.participants.map((value, index) =>
                                                    index === i ? "IN" : value
                                                )
                                            }}))}
                                        />
                                }
                                {
                                    p.direction === "producer" || p.direction === "prosumer" && 
                                        <PopupButton 
                                            label="OUT" 
                                            selectedCondition={popupSettings.settings.participants[i] === "OUT"} 
                                            activationFunction={() => setPopupSettings(s => ({...s, settings: {
                                                ...s.settings,
                                                participants: s.settings.participants.map((value, index) =>
                                                    index === i ? "OUT" : value
                                                )
                                            }}))}
                                        />
                                }
                                {
                                    p.direction === "prosumer" && 
                                        <PopupButton 
                                            label="BI" 
                                            selectedCondition={popupSettings.settings.participants[i] === "BI"} 
                                            activationFunction={() => setPopupSettings(s => ({...s, settings: {
                                                ...s.settings,
                                                participants: s.settings.participants.map((value, index) =>
                                                    index === i ? "BI" : value
                                                )
                                            }}))}
                                        />
                                }
                                {
                                    i === 1 &&
                                        <button style={{margin: "20px 5px auto auto", borderRadius: "5px", boxShadow: "none", border: "1px solid " + c.steel}}
                                            disabled={!popupSettings.settings.type || !popupSettings.settings.participants.every(p => p) }
                                            onClick={() => { 
                                                setConnections(c => c.map(con => con.id === selected.id ? {
                                                    ...con,
                                                    type: popupSettings.settings.type,
                                                    availableTypes: popupSettings.types,
                                                    previousEndpointDirection: popupSettings.endpointDirection,
                                                    previousOriginId: popupSettings.originId,
                                                    participants: popupSettings.participants.map((pp, i) => ({
                                                        id: pp.pin,
                                                        pinType: pp.direction,
                                                        direction: con.participants.find(cp => cp.id === pp.pin)?.direction,
                                                    }))
                                                } : con))

                                                const participantPins = popupSettings.participants.map(p => p.pin)
                                                
                                                // add selected direction to the devices as a property array
                                                setDevices(d => d.map(dev => ({
                                                    ...dev,
                                                    services: dev.services.map(s => {
                                                        // check if any service of the device was used in the edit connection
                                                        const participantPinsOfSercice = participantPins.filter(p => p.startsWith(s.id + "-"))
                                                        
                                                        // if not, leave as is
                                                        if(participantPinsOfSercice.length === 0) return s

                                                        // if yes, add the selected direction as a property
                                                        return ({
                                                            ...s,
                                                            interfaces: s.interfaces?.map(inface => {
                                                                const connectionType = popupSettings.settings.type.toLowerCase()
                                                                if(inface.interfaceType !== connectionType) return inface
                                                                
                                                                return {
                                                                    ...inface,
                                                                    availableSignals: {
                                                                        ...inface.availableSignals,
                                                                        [`${connectionType}-directions`]: inface.availableSignals[connectionType].map((pinName, idx) => {
                                                                            // Get the index of this pin in the participantPins list
                                                                            const participantIndex = participantPins.indexOf(`${s.id}-${pinName}`);

                                                                            // Try to get the new direction from popupSettings
                                                                            const newDirection = popupSettings.settings.participants[participantIndex];

                                                                            return newDirection || inface.availableSignals[`${connectionType}-directions`]?.[idx] || "n/a";
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                        })
                                                    })
                                                })))

                                                setPopupSettings(false)
                                            }}>
                                            Save
                                        </button>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )}</>
    )
}
