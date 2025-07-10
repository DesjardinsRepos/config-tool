import { useContext, useState } from 'react';
import "react-toggle/style.css" 
import Xarrow from 'react-xarrows';
import { GlobalStateContext } from "../App.js"
import Popup from "../Configuration/Popup"

const constructElementId = (service) => {
    return service.id + "-" + service.direction.substring(0,1)
}

export default ({mode}) => {

    const { 
        devices,
        connections,
        setSelected,
        selected,
        setPanningEnabled,
        setConnections,
        showConnections,
        setPopupSettings,
    } = useContext(GlobalStateContext);

    const onLineDrop = (c, e, mode) => {
        if(selected?.currentlyLineDrawing) {
            setPanningEnabled(true)
            
            require("../general").addParticipantToConnection(
                setSelected,
                setConnections,
                c,                              // initial connection
                selected,                    // connectionToAdd
                {                               // last interacted position
                    x: e.clientX,
                    y: e.clientY
                }
            )
            
            // add pin to popup settings
            // TODO this only works if the connection is currently selected
            if (mode === "editor") {
                const [type, lineOrigin] = require("../general").findSelected(selected, devices, connections)
                if (type !== "pin")
                    alert("Only pins should be able to be dragged in editor mode")

                const [type2, existingConnection] = require("../general").findSelected({id: c.id}, devices, connections)
                if (type2 !== "connection")
                    alert("Only connections should be able to be dragged in editor mode")

                let oldSettings = require("../general").reconstructPopupSettingsFromConnections(
                    existingConnection
                )

                setPopupSettings(o => ({
                    ...oldSettings,

                    // participants: [
                    //     ...oldSettings.participants,
                    //     {
                    //         pin: selected.id,
                    //         direction: lineOrigin.service.serviceDirection,
                    //     }
                    // ],
                    // settings: {
                    //     type: oldSettings.settings.type,
                    //     participants: [...oldSettings.settings.participants, undefined]
                    // }
                }))
            }
        }
    }

    return (
        <>
            {showConnections && connections.map(c =>
                c.mode === mode ? (
                    <div key={c.id}>
                        {c.participants.length === 2 && <Connect2 mode={mode} c={c} onLineDrop={(c,e) => onLineDrop(c, e, mode)} setSelected={setSelected} selected={selected}/>}
                        {c.participants.length >2 && <ConnectMultiple mode={mode} c={c} onLineDrop={(c,e) => onLineDrop(c, e, mode)} setSelected={setSelected} selected={selected}/>}
                    </div>
                ) : (<></>)
            )}
        </>
    )        
}

const Connect2 = ({c, setSelected, selected, onLineDrop, mode}) => { 
    const [hovering, setHovering] = useState(false)
    const {
        popupSettings,
        connectPos
    } = useContext(GlobalStateContext);

    return (
        <>  
            {/* {
                popupSettings?.connectionId === c.id &&
                <div style={{ position: "absolute", 
                    left: `${(connectPos[0][0] + connectPos[1][0]) / 2}px`, 
                    top: + `${(connectPos[0][1] + connectPos[1][1]) / 2}px`, 
                    zIndex: 1000 }}>
                    <Popup
                        direction={"middle"}
                        id={c.id}
                    />
                </div>
            } */}
            
            <Xarrow 
                start={constructElementId(c.participants[0])}
                end={constructElementId(c.participants[1])} 
                showHead={false} 
                color={(c.id === selected.id || hovering) ? "black" : "grey"}
                strokeWidth={selected.id === c.id ? 2 : 1.1}
                curveness={0} 
            />
            <Xarrow 
                start={constructElementId(c.participants[0])}
                end={constructElementId(c.participants[1])} 
                showHead={false} 
                color="transparent" 
                strokeWidth={30}
                curveness={0} 
                passProps= {{
                    onClick: () => {
                        setSelected({id: c.id})
                    }, 
                    cursor: "pointer",
                    onMouseUp: e => onLineDrop(c, e),
                    onMouseEnter: () => setHovering(true),
                    onMouseLeave: () => setHovering(false)
                }}
            />
        </>
    )
}

const ConnectMultiple = ({c, setSelected, selected, onLineDrop, mode}) => {
    const [hovering, setHovering] = useState(false)
    const [popupSettings, setPopupSettings] = useState(false)

    return(
        c.participants.map(p => {
            return (
            <>
                {/* <div style={{ position: "relative", zIndex: 10000 }}>
                    <Popup
                        popupSettings={popupSettings}
                        setPopupSettings={setPopupSettings}
                        direction={"middle"}
                        id={c.id}
                    />
                </div> */}

                <Xarrow 
                    start={constructElementId(p)}
                    end={c.id} 
                    showHead={false} 
                    curveness={0} 
                    color={selected.id === c.id ? "black" : "grey"} 
                    strokeWidth={selected.id === c.id ? 2 : 1.1}
                    passProps={{
                        pointerEvents: "none"
                    }}
                />
                <Xarrow 
                    start={constructElementId(p)}
                    end={`${c.id}-wrapper`} 
                    showHead={false} 
                    curveness={0} 
                    color="#33333300" 
                    strokeWidth={30}
                    passProps= {{
                        onClick: () => {
                            setSelected({id: c.id})
                        }, 
                        cursor: "pointer",
                        zIndex: -1,
                        onMouseUp: e => onLineDrop(c, e),
                        onMouseEnter: () => setHovering(true),
                        onMouseLeave: () => setHovering(false)
                    }}
                />
            </>
        )})
    )
}