import { colors as c, shadows } from "../styles.js";

export default {
    wrapperToFixAutoResize: {
        height: "100%",
        ...shadows.a,
        backgroundColor: c.whiteSteel,
        zIndex: 9
    },
    barWrapper: {
        height: "calc(100%-20px)", 
        width: "280px", 
        margin: "10px"
    },
    groupsWrapper: {
        backgroundColor: c.lightSteel
    },
    groupWrapper: {
        display: "flex", 
        height: "45px", 
        cursor: "pointer"
    },
    img: {
        width: "30px", 
        height: "25px", 
        margin: "auto 5px auto 15px"
    },
    groupText: {
        margin: "auto auto auto 10px"
    },
    dropButton: {
        margin: "auto 10px", 
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transform: "rotate(180deg)"
    },
    rotated: {
        transform: "rotate(0deg)"
    },
    info: {
        margin: "5px", 
        cursor: "pointer"
    },
    hr: {
        margin: 0, 
        backgroundColor: c.darkSteel
    },
    elementsWrapper: {
        display: "flex", 
        flexDirection: "column", 
        padding: "5px 5px 0 5px"
    },
    elementWrapper: {
        display: "flex", 
        backgroundColor: c.creme, 
        height: "40px", 
        width: "250px", 
        margin: "2px auto 8px auto", 
        borderRadius: "10px",
        ...shadows.b
    },
    elementText: {
        margin: "auto auto auto 10px"
    }
}
