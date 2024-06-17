import Xarrow, {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"
import { useContext, useState } from 'react';
import { GlobalStateContext } from "../App.js"

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
        if(selected?.startsWith("&")) {
            setPanningEnabled(true)

            require("../general").addParticipantToConnection(
                setSelected,
                setConnections,
                c,                              // initial connection
                selected.substring(1, 23),      // connectionToAddID
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
                start={c.participants[0]}
                end={c.participants[1]} 
                showHead={false} 
                color={(c.id === selected || hovering) ? "black" : "grey"}
                strokeWidth={selected === c.id ? 2 : 1.1}
                curveness={0} 
            />
            <Xarrow 
                start={c.participants[0]}
                end={c.participants[1]} 
                showHead={false} 
                color="transparent" 
                strokeWidth={30}
                curveness={0} 
                passProps= {{
                    onClick: () => {
                        setSelected(c.id)
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
        c.participants.map(p => (
            <>
                <Xarrow 
                    start={p}
                    end={c.id} 
                    showHead={false} 
                    curveness={0} 
                    color={selected === c.id ? "black" : "grey"} 
                    strokeWidth={selected === c.id ? 2 : 1.1}
                    passProps={{
                        pointerEvents: "none"
                    }}
                />
                <Xarrow 
                    start={p}
                    end={`${c.id}-wrapper`} 
                    showHead={false} 
                    curveness={0} 
                    color="#33333300" 
                    strokeWidth={30}
                    passProps= {{
                        onClick: () => {
                            setSelected(c.id)
                        }, 
                        cursor: "pointer",
                        zIndex: -1,
                        onMouseUp: e => onLineDrop(c, e),
                        onMouseEnter: () => setHovering(true),
                        onMouseLeave: () => setHovering(false)
                    }}
                />
            </>
        ))
    )
}