import {colors as c, shadows} from "../styles"

export default {
    deviceWrapper: { 
        ...shadows.c, 
        padding: "10px", 
        width: "280px", 
        height: "fit-content", 
        borderRadius: "12px", 
        backgroundColor: c.lightBlue, 
        cursor: "pointer",
        position: "absolute"
    },
    activeShadow: {
        ...shadows.modC,
        backgroundColor: "#b5cde3"
    },
    header: {
        display: "flex",
        margin: "-10px 0 -3px 0",
        padding: "10px 0",
        cursor: "grab"
    },
    img: {
        width: "30px", 
        height: "25px", 
        margin: "auto 5px auto 5px"
    },
    title: {
        margin: "auto 10px"
    },
    settings: {
        width: "18px", 
        height: "18px", 
        margin: "auto 0 auto auto"
    },
    servicesWrapper: {
        padding: "0 7px 0 7px"
    }
}