import {colors as c, shadows} from "../styles"

export default {
    serviceWrapper: {
        borderRadius: "17px", 
        backgroundColor: c.whiteSteel, 
        ...shadows.d,
        minHeight: "35px", 
        margin: "10px 0"
    },
    header: {
        display: "flex"
    },
    img: {
        width: "25px", 
        height: "20px", 
        margin: "auto 5px auto 0"
    },
    text: {
        margin: "5px auto", 
        maxWidth: "120px"
    },
    dropButton: {
        margin: "auto 10px auto auto", 
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        transform: "rotate(180deg)"
    },
    rotated: {
        transform: "rotate(0deg)"
    },
    pinWrapper: {
        height: "fit-content", 
        padding: "5px 15px 10px 15px"
    }
}