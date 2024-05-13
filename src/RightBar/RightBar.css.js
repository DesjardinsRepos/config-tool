import {colors as c, shadows} from "../styles"

export default {
    barWrapper: {
        backgroundColor: c.lightBlue, 
        width: "350px", 
        position: "fixed", 
        right: 0, 
        height: "100%",
        ...shadows.a
    },
    header: {
        display: "flex",
        padding: "5px 0"
    },
    settingsIcon: {
        width: "20px", 
        height: "20px", 
        margin: "auto 10px"
    },
    heading: {
        margin: "auto 0"
    },
    exit: {
        cursor: "pointer", 
        margin: "auto 0 auto auto", 
        width: "40px"
    }
}