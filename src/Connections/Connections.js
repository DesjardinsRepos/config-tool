import Xarrow, {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"
import { useContext, useState } from 'react';
import { GlobalStateContext } from "../App.js"

const constructElementId = (service) => {
    return service.id + "-" + service.direction.substring(0,1)
}

export default () => {
    const update = useXarrow();

    const { 
        connections,
        setSelected,
        selected,
        setPanningEnabled,
        setConnections,
        showConnections
    } = useContext(GlobalStateContext);

    useTransformEffect(() => {
        update()
    
        return () => {};
    });

    const onLineDrop = (c, e) => {
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
        }
    }

    return (
        <>
            {showConnections && connections.map(c => (
                <div key={c.id}>
                    {c.participants.length === 2 && <Connect2 c={c} onLineDrop={onLineDrop} setSelected={setSelected} selected={selected}/>}
                    {c.participants.length >2 && <ConnectMultiple c={c} onLineDrop={onLineDrop} setSelected={setSelected} selected={selected}/>}
                </div>
            ))}
        </>
    )        
}

const Connect2 = ({c, setSelected, selected, onLineDrop}) => { 
    const [hovering, setHovering] = useState(false)

    return (
        <>
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

const ConnectMultiple = ({c, setSelected, selected, onLineDrop}) => {
    const [hovering, setHovering] = useState(false)

    return(
        c.participants.map(p => {
            return (
            <>
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