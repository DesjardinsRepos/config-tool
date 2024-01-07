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
  const [rightBarOpen, setRightBarOpen] = useState(true);

  const [devices, setDevices] = useState([
    {
      id: "dev0",
      name: "3-ACHS-PORTAL",
      services: [
        {
          id: "ser0",
          name: "Electrical Connection Sensor"
        },
        {
          id: "ser1",
          name: "Electrical Connection Sensor"
        },
        {
          id: "ser2",
          name: "Electrical Connection Sensor"
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
      id: "dev1",
      name: "3-ACHS-PORTAL",
      services: [
        {
          id: "ser0",
          name: "Electrical Connection Sensor"
        },
        {
          id: "ser1",
          name: "Electrical Connection Sensor"
        },
        {
          id: "ser2",
          name: "Electrical Connection Sensor"
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

  return (
    <ConnectProvider>
      <GlobalStateContext.Provider value={{ 
        mode, 
        setMode, 
        showConnections, 
        setShowConnections,
        setRightBarOpen,
        devices,
        setDevices
        }}>
        <TopBar/>
        <div style={{display: "flex", height: "calc(100vh - 55px)"}}>
            <LeftBar/>
            
            <Canvas/>
            
            { rightBarOpen && <RightBar/>}
        </div>

      </GlobalStateContext.Provider>
    </ConnectProvider>  
  );
};

export default App;