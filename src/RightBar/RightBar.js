import s from "./RightBar.css"
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";

export default () => {
    const {  setRightBarOpen } = useContext(GlobalStateContext);

    return (
        <div style={s.barWrapper}>
            <div style={s.header}>
                <img style={s.settingsIcon} src={require("../media/settings.png")}/>
                <h3 style={s.heading}>Properties</h3>
                <img style={s.exit} onClick={() => setRightBarOpen(false)} src={require("../media/exit.png")}/>
            </div>
        </div>
    )
}