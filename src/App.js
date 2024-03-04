import React, { useState, useContext } from 'react';
import {ConnectProvider, Connect} from 'react-connect-lines'
import LeftBar from './LeftBar/LeftBar';
import TopBar from './TopBar/TopBar';
import RightBar from './RightBar/RightBar';
import Canvas from './Canvas/Canvas';

export const GlobalStateContext = React.createContext();

const App = () => {
  const [showConnections, setShowConnections] = useState(false);
  const [mode, setMode] = useState("pinplanner");

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
        x: 0,
        y: 0,
        xDeviceOffset: 0,
      },
      templateDevice: "https://api.goldi-labs.de/devices/9d9fcf04-c291-426f-8b06-fa237918564e"
    },
    {
      id: "cuj9wefaea",
      name: "3-ACHS-PORTAL",
      services: [
        {
          id: "cuj9wefaeao2dhowbnzl",
          serviceId: "Electrical Connection Sensor"
        },
        {
          id: "cuj9wefaea23opa90ipw",
          serviceId: "Electrical Connection Sensor"
        },
        {
          id: "cuj9wefaeasi3v4z4irt",
          serviceId: "Electrical Connection Sensor"
        }
      ],
      startPosition: {
        x: 100,
        y: 100,
        xDeviceOffset: 0,
      },
      templateDevice: "https://api.goldi-labs.de/devices/9d9fcf04-c291-426f-8b06-fa237918564e"
    }
  ]);

  const [connections, setConnections] = useState([
    {
      type: 2,
      start: "jlssfoh1n3llm191w4qv-r", 
      end: "cuj9wefaeasi3v4z4irt-l",
      id: "tksp5hz8ks"
    }
  ])

  const [selected, setSelected] = useState("")

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
        setSelected
        }}>
        <TopBar/>
        <div style={{display: "flex", height: "calc(100vh - 55px)"}}>
            <LeftBar/>
            
            <Canvas/>
            
            { selected !== "" && <RightBar/>}
        </div>

      </GlobalStateContext.Provider>
    </ConnectProvider>  
  );
};

export default App;