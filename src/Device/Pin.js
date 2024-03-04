import {colors as c} from "../styles"
import s from "./Pin.css"

export default ({children}) => (
    <div style={s.pinWrapper}>
        <svg style={s.leftConnection} height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" strokeWidth="1" fill={c.steel}/></svg> 
        <p style={s.text}>{children}</p>
        <svg style={s.rightConnection} height="12" width="12"><circle cx="6" cy="6" r="5" stroke="black" strokeWidth="1" fill={c.steel}/></svg> 
    </div>
)