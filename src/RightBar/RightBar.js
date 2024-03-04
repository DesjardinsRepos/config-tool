import s from "./RightBar.css"
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";

export default () => {
    const { setSelected, selected, devices, connections } = useContext(GlobalStateContext);

    const getSelectedInformation = () => {
        let obj
        
        if(selected.length === 10) {
            // check connections
            obj = connections.find(obj => obj.id === selected)

            // check devices
            if(!obj)  {
                obj = devices.find(obj => obj.id === selected)
                
                return <ConnectionInfo obj={obj}/>
            }
        }

        if(selected.length === 22) {
            // check services
            const serviceId = selected.slice(0, -2)
            obj = devices
                    .find(dev => dev.services.some(s => s.id === serviceId))
                    .services.find(s => s.id === serviceId)
                    
            return <ServiceInfo obj={obj}/>
        }

        return obj ? <DeviceInfo obj={obj}/> : "unknown"
    }

    return (
        <div style={s.barWrapper}>
            <div style={s.header}>
                <img style={s.settingsIcon} src={require("../media/settings.png")}/>
                <h3 style={s.heading}>Properties</h3>
                <img style={s.exit} onClick={() => setSelected("")} src={require("../media/exit.png")}/>
            </div>
            {
                getSelectedInformation()
            }
        </div>
    )
}

const DeviceInfo = ({obj}) => (
    <>{JSON.stringify(obj)}</>
)

const ConnectionInfo = ({obj}) => (
    <>{JSON.stringify(obj)}</>
)

const ServiceInfo = ({obj}) => (
    <>{JSON.stringify(obj)}</>
)