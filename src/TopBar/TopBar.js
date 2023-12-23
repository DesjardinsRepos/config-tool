import { useContext } from 'react';
import Toggle from "react-toggle"
import "react-toggle/style.css" 
import s from "./TopBar.css"
import { GlobalStateContext } from "../App.js"

export default ({}) => {
    const { 
        mode, 
        setMode, 
        showConnections, 
        setShowConnections 
    } = useContext(GlobalStateContext);
    
    return (
        <div style={s.wrapper}>
            {mode == "canvas" &&
                <h1 style={s.heading}>LAB DEVICES</h1>
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
                    <button style={{...s.leaveButton, ...s.button}} onClick={() => setMode("canvas")}>
                        Leave Pinplanner
                    </button>
                </>
            }

            <button style={{...s.saveButton, ...s.button}}>
                Save
            </button>
        </div>
    )
}