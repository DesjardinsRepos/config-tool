import React, { useState, useContext, useEffect, useRef } from 'react';
import {ConnectProvider, Connect} from 'react-connect-lines'
import LeftBar from './LeftBar/LeftBar';
import TopBar from './TopBar/TopBar';
import RightBar from './RightBar/RightBar';
import Canvas from './Canvas/Canvas';
import Configuration from './Configuration/Configuration.js';
import { APIClient } from '@cross-lab-project/api-client';
import password from './password.js'
import {useXarrow} from 'react-xarrows';

const apiClient = new APIClient('https://api.goldi-labs.de');

export const GlobalStateContext = React.createContext();

const App = ({input, saveCallback}) => {
  const [showConnections, setShowConnections] = useState(true);
  const [mode, setMode] = useState("canvas");
  const update = useXarrow();

  useEffect(() => {(async () => {
      window.addEventListener("resize", () => { // TODO does not do anything?
        console.log("resize")
        update();
      })

      await apiClient.login("fabe1847", password)
    
      const parseDevices = (async () => await Promise.all(
        input.roles
        .map(r => ({
          id: r.name,
          name: r.name, 
          templateDevice: r.template_device,
          startPosition: r['x-esc-position']
        }))
        .map(async device => {
          const deviceData = await apiClient.getDevice(device.templateDevice)
          
          return {
            ...device,
            deviceData, // TODO remove old services
            services: deviceData.services.map(s => {
              return {
                ...s,
                id: require("./general.js").GENERATE_UID_10()
              }
            })
          }
        })
      )
      .then(updatedDevices => {
        console.log("updatedDevices", updatedDevices)
        setDevices(d => [...d, ...updatedDevices])


        const parseConnections = (() => {
          setConnections(connections => [...connections, ...input.serviceConfigurations.map(sc => ({
              ...sc, 
              mode: "canvas",
              participants: sc.participants.map(p => ({
                  direction: Math.random() < 0.5 ? "left" : "right",
                  id: (() => {
                    let parent = updatedDevices.find(d => d.id === p.role && d.services.some(s => s.serviceId === p.serviceId))
                    return parent?.services.find(s => s.serviceId === p.serviceId).id || "service not found"
                  })(),
                  ...p
              }))
            })).filter(sc => 
              !sc.participants.some(p => p.id === "service not found")
            )
          ])
        })()
      }))()
  })()}, [])

  

  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([])
  const [selected, setSelected] = useState({})
  const [dragEnabled, setDragEnabled] = useState(true)
  const [panningEnabled, setPanningEnabled] = useState(true)
  const [connectPos, setConnectPos] = useState([[0,0],[0,0]])
  const [currentConnectionNumber, setCurrentConnectionNumber] = useState(0)
  const [popupSettings, setPopupSettings] = useState(false)

  return (
    <ConnectProvider>
      <GlobalStateContext.Provider value={{ 
        mode, 
        setMode, 
        showConnections, 
        setShowConnections,
        devices,
        setDevices,
        connections, 
        setConnections,
        selected,
        setSelected,
        dragEnabled,
        setDragEnabled,
        panningEnabled,
        setPanningEnabled,
        connectPos,
        setConnectPos,
        currentConnectionNumber,
        setCurrentConnectionNumber,
        popupSettings,
        setPopupSettings,
        saveCallback,
        }}>
        <TopBar/>
        <div style={{display: "flex", height: "calc(100vh - 55px)"}}>
            { mode == "canvas" && <LeftBar/> }

            <Canvas/>

            { selected.id && !selected.currentlyLineDrawing && mode == "canvas" && <RightBar/>}

            { mode == "pinplanner" && 
              <div style={{position: "absolute", backgroundColor: "white", width: "100%", height: "100%"}}>
                <Configuration/>
              </div>
            }

            { selected.currentlyLineDrawing && <LineDrawingComponent pos={connectPos} />}
            
        </div>

      </GlobalStateContext.Provider>
    </ConnectProvider>  
  );
};

const LineDrawingComponent = ({ pos }) => {
  return <div style={{
    position: 'absolute',
    zindex: 9999,
    left: pos[0][0],
    top: pos[0][1],
    width: Math.sqrt((pos[1][0] - pos[0][0]) ** 2 + (pos[1][1] - pos[0][1]) ** 2),
    height: 1, // thickness
    transformOrigin: 'left top',
    transform: `rotate(${Math.atan2(pos[1][1] - pos[0][1], pos[1][0] - pos[0][0])}rad)`,
    backgroundColor: '#555555',
  }}/>;
};

export default App;