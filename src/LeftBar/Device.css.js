import { colors as c, shadows } from "../styles.js";

export default {
	elementWrapper: {
	    display: "flex", 
	    backgroundColor: c.creme, 
	    height: "40px", 
	    width: "250px", 
	    margin: "2px auto 8px auto", 
	    borderRadius: "10px",
	    ...shadows.b
	},
    img: {
        width: "30px", 
        height: "25px", 
        margin: "auto 5px auto 15px"
    },
    info: {
        margin: "5px", 
        cursor: "pointer"
    },
	elementText: {
	    margin: "auto auto auto 10px"
	}
}

