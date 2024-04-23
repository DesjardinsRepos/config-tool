import s from "./RightBar.css"
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";
import JSONPretty from 'react-json-pretty';
import Service from "../Device/Service"

export default () => {
    const { setSelected, setConnections, selected, devices, connections } = useContext(GlobalStateContext);

    return (
        <div style={s.barWrapper}>
            <div style={s.header}>
                <img style={s.settingsIcon} src={require("../media/settings.png")}/>
                <h3 style={s.heading}>Properties</h3>
                <img style={s.exit} onClick={() => setSelected(null)} src={require("../media/exit.png")}/>
            </div>
            {selected}
            <div style={{overflow: "auto", height: "500px"}}>
                {(() => {
                    if(selected.length === 10) {
                        // check connections
                        var obj = connections.find(obj => obj.id === selected)

                        // check devices
                        if(!obj)  {
                            obj = devices.find(obj => obj.id === selected)
                            
                            return <DeviceInfo obj={obj}/>
                        }
                    }

                    if(selected.length === 22) {
                        // check services
                        obj = devices
                                //.find(dev => dev.services.some(s => s.id === serviceId))
                                .find(dev => dev.id == selected.slice(0, 10))
                                .services.find(s => s.id === selected.slice(0, 20))
                                
                        return <ServiceInfo obj={obj}/>
                    }

                    return obj ? <ConnectionInfo obj={obj} selected={selected}
                        setConnections={setConnections} connections={connections}/> : "unknown"
                })()}
            </div>
        </div>
    )
}

const DeviceInfo = ({obj}) => (
    <>
        {obj.services?.map(s => (
            <Service ser={s}></Service>
        ))}
        <JSONPretty id="json-pretty" data={obj}></JSONPretty>
    </>
)

const ConnectionInfo = ({obj, selected, connections, setConnections}) => (
    <>
        <JSONPretty id="json-pretty" data={obj}></JSONPretty>
        <h3>Teilnehmer</h3>
        {obj.participants.map(p => {
            const device = p.substring(0,10)
            const service = p.substring(10,20)
            const direction = p.substring(21, 22)
            return <p>{device},{direction}</p>
        })}
        <button onClick={() => {
            setConnections(connections.map(c => c.id === selected ? {
                participants: [
                    ...c.participants,
                    "cuj9wefaeao2dhowbnzl-l"
                ],
                id: c.id
            } : c))
        }}>add connection</button>
    </>
)

const ServiceInfo = ({obj}) => (
    <JSONPretty id="json-pretty" data={obj}></JSONPretty>
)