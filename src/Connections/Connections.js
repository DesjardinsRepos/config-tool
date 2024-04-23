import Xarrow, {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"
import { useContext } from 'react';
import { GlobalStateContext } from "../App.js"

export default () => {
    const update = useXarrow();

    const { 
        connections,
        setSelected,
        selected,
        setPanningEnabled,
        setConnections,
        devices,
        showConnections
    } = useContext(GlobalStateContext);

    useTransformEffect(() => {
        update()
    
        return () => {};
    });

    const evL = (c, e) => {
        if(selected?.startsWith("&")) {
            setPanningEnabled(true)
            setConnections(connections.map(con => c.id === con.id ? {
                participants: [
                    ...c.participants,
                    selected.substring(1, 23)
                ],
                lastInteractionPosition: { 
                    x: e.clientX, 
                    y: e.clientY,
                    xDeviceOffset: - devices.length * 300, // solange das sich nicht resettet passt das
                },
                id: c.id
            } : con))
            setSelected(c.id)
        }
    }

    return (
        <>
            {showConnections && connections.map(c => (
                <div key={c.id}>
                    {c.participants.length === 2 && <Connect2 c={c} evL={evL} setSelected={setSelected} selected={selected}/>}
                    {c.participants.length >2 && <ConnectMultiple c={c} evL={evL} setSelected={setSelected} selected={selected}/>}
                </div>
            ))}
        </>
    )        
}

const Connect2 = ({c, setSelected, selected, evL}) => ( 
    <>
        <Xarrow 
            start={c.participants[0]}
            end={c.participants[1]} 
            showHead={false} 
            color={selected === c.id ? "black" : "grey"}
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
                onMouseUp: e => evL(c, e)
            }}
        />
    </>
)

const ConnectMultiple = ({c, setSelected, selected, evL}) => ( 
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
                    onMouseUp: e => evL(c, e)
                }}
            />
        </>
    ))
)