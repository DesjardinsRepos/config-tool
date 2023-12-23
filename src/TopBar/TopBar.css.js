import {colors as c, shadows} from "../styles.js";

export default {
    wrapper: { 
		position: "relative",
        color: "white", 
        backgroundColor: c.darkBlue, 
        height: "55px", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between",
        zIndex: 10,
        ...shadows.a // wieso will der nicht?
    },
    heading: {
        margin: "auto 30px auto 20px"
    },
    ppWrapper: {
        display: "flex"
    },
    text: {
        margin: "auto 10px auto 10px"
    },
    button: {
        color: "white", 
        cursor: "pointer", 
        height: "35px", 
        backgroundColor: c.royal, 
        border: "none", 
        borderRadius: "17px", 
        padding: "0 20px 0 20px", 
        fontSize: "15px"
    },
    leaveButton: {
        margin: "auto 10px auto auto"
    },
    saveButton: {
        margin: "auto 50px auto 10px"
    }
}
