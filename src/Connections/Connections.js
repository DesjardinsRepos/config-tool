import Xarrow, {useXarrow} from 'react-xarrows';
import {useTransformEffect} from "react-zoom-pan-pinch"
import { useContext } from 'react';
import { GlobalStateContext } from "../App.js"

export default () => {
    const update = useXarrow();

    const { 
        connections,
        setSelected,
        selected
    } = useContext(GlobalStateContext);

    useTransformEffect(() => {
        update()
    
        return () => {};
    });

    return (
        <>
            {connections.map(c => (
                <div key={c.id}>
                    {c.participants.length === 2 && <Connect2 c={c} setSelected={setSelected} selected={selected}/>}
                    {c.participants.length >2 && <ConnectMultiple c={c} setSelected={setSelected} selected={selected}/>}
                </div>
            ))}
        </>
    )        
}

// add transparent draggable service circle
// farbliche umrandung

const Connect2 = ({c, setSelected, selected}) => ( 
    <>
        <Xarrow 
            start={c.participants[0]}
            end={c.participants[1]} 
            showHead={false} 
            curveness={0.2} 
            color="black" 
            strokeWidth={selected === c.id ? 2 : 1}
        />
        <Xarrow 
            start={c.participants[0]}
            end={c.participants[1]} 
            showHead={false} 
            curveness={0.2} 
            color="transparent" 
            strokeWidth={30}
            passProps= {{
                onClick: () => {
                    setSelected(c.id)
                }, 
                cursor: "pointer"
            }}
        />
    </>
)

const ConnectMultiple = ({c, setSelected, selected}) => ( 
    c.participants.map(p => (
        <>
            <Xarrow 
                start={p}
                end={c.id} 
                showHead={false} 
                curveness={0} 
                color="black" 
                strokeWidth={selected === c.id ? 2 : 1}
            />
            <Xarrow 
                start={p}
                end={`${c.id}-wrapper`} 
                showHead={false} 
                curveness={0} 
                color="#33333333" 
                strokeWidth={30}
                passProps= {{
                    onClick: () => {
                        setSelected(c.id)
                    }, 
                    cursor: "pointer",
                    zIndex: -1
                }}
            />
        </>
    ))
)