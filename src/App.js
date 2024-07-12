import React, { useState, useContext, useEffect, useRef } from 'react';
import {ConnectProvider, Connect} from 'react-connect-lines'
import LeftBar from './LeftBar/LeftBar';
import TopBar from './TopBar/TopBar';
import RightBar from './RightBar/RightBar';
import Canvas from './Canvas/Canvas';
import { APIClient } from '@cross-lab-project/api-client';
import password from './password.js'

const apiClient = new APIClient('https://api.goldi-labs.de');

export const GlobalStateContext = React.createContext();

const App = ({input, callback}) => {
  const [showConnections, setShowConnections] = useState(true);
  const [mode, setMode] = useState("pinplanner");

  useEffect(() => {(async () => {
      await apiClient.login("fabe1847", password)
    
      const parseDevices = (async () => await Promise.all(
        input.roles
        .map(r => ({
          id: require("./general").GENERATE_UID_10(),
          name: r.name, 
          templateDevice: r.template_device,
          startPosition: r['x-esc-position']
        }))
        .map(async device => {
          const deviceData = await apiClient.getDevice(device.templateDevice)
          const devId = require("./general.js").GENERATE_UID_10()
          
          return {
            ...device,
            id: devId,
            deviceData,
            services: deviceData.services.map(s => {
              return {
                ...s,
                id: devId + require("./general.js").GENERATE_UID_10()
              }
            })
          }
        })
      )
      .then(updatedDevices => {
        console.log("updatedDevices", updatedDevices)
        setDevices(d => [...d, ...updatedDevices])
      }))()

      const parseConnections = () => {
        input.serviceConfigurations.map(sc => {
          // wieso hier namen. Eindeutigkeit????
        })
      }
  })()}, [])

  

  const [devices, setDevices] = useState([
    {
      id: "jlssfoh1n3",
      name: "3-ACHS-PORTAL",
      services: [
        {
          id: "jlssfoh1n3oo8pxmmacz",
          serviceId: "Electrical Connection Sensor"
        },
        {
          id: "jlssfoh1n3llm191w4qv",
          serviceId: "Electrical Connection Sensor"
        },
        {
          id: "jlssfoh1n3wa8eik5zkl",
          serviceId: "Electrical Connection Sensor"
        }
      ],
      startPosition: {
        x: 300,
        y: 50
      },
      templateDevice: "https://api.goldi-labs.de/devices/9d9fcf04-c291-426f-8b06-fa237918564e"
    },
    {
      id: "cuj9wefaea",
      name: "3-ACHS-PORTAL",
      services: [
        {
          id: "cuj9wefaeao2dhowbnzl",
          serviceId: "Electrical Connection Sensor",
          serviceDirection: "consumer"
        },
        {
          id: "cuj9wefaea23opa90ipw",
          serviceId: "Electrical Connection Sensor",
          serviceDirection: "prosumer"
        },
        {
          id: "cuj9wefaeasi3v4z4irt",
          serviceId: "Electrical Connection Sensor",
          serviceDirection: "producer"
        }
      ],
      startPosition: {
        x: 700,
        y: 100
      },
      templateDevice: "https://api.goldi-labs.de/devices/9d9fcf04-c291-426f-8b06-fa237918564e"
    }
  ]);

  const [connections, setConnections] = useState([
    {
      participants: [
        {
          id: "jlssfoh1n3llm191w4qv",
          direction: "right"
        },
        {
          id: "cuj9wefaeasi3v4z4irt",
          direction: "left"
        }
      ],
      id: "tksp5hz8ks"
    }
  ])

  const [selected, setSelected] = useState({})
  const [dragEnabled, setDragEnabled] = useState(true)
  const [panningEnabled, setPanningEnabled] = useState(true)
  const [connectPos, setConnectPos] = useState([[0,0],[0,0]])

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
        setConnectPos
        }}>
        <TopBar/>
        <div style={{display: "flex", height: "calc(100vh - 55px)"}}>
            <LeftBar/>
            
            <Canvas/>

            { selected.currentlyLineDrawing && <LineDrawingComponent pos={connectPos} />}

            { selected.id && !selected.currentlyLineDrawing && <RightBar/>}
        </div>

      </GlobalStateContext.Provider>
    </ConnectProvider>  
  );
};

const LineDrawingComponent = ({ pos }) => {
  return <div style={{
    position: 'absolute',
    zIndex: 9999,
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