import React, { useState, useContext, useEffect, useRef } from 'react';
import {ConnectProvider, Connect} from 'react-connect-lines'
import LeftBar from './LeftBar/LeftBar';
import TopBar from './TopBar/TopBar';
import RightBar from './RightBar/RightBar';
import Canvas from './Canvas/Canvas';

export const GlobalStateContext = React.createContext();

const App = () => {
  const [showConnections, setShowConnections] = useState(true);
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
        x: 700,
        y: 100
      },
      templateDevice: "https://api.goldi-labs.de/devices/9d9fcf04-c291-426f-8b06-fa237918564e"
    }
  ]);

  const [connections, setConnections] = useState([
    {
      participants: [
        "jlssfoh1n3llm191w4qv-r",
        "cuj9wefaeasi3v4z4irt-l"
      ],
      id: "tksp5hz8ks"
    }
  ])

  const [selected, setSelected] = useState(null)
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

            { selected?.startsWith("&") && <LineDrawingComponent pos={connectPos} />}

            { selected !== null && !selected.startsWith("&") && <RightBar/>}
        </div>

      </GlobalStateContext.Provider>
    </ConnectProvider>  
  );
};

const LineDrawingComponent = ({ pos }) => {
  return <div style={{
    position: 'absolute',
    zIndex: 9999, // Ensure the line is above other components
    left: pos[0][0],
    top: pos[0][1],
    width: Math.sqrt((pos[1][0] - pos[0][0]) ** 2 + (pos[1][1] - pos[0][1]) ** 2),
    height: 1, // Set the thickness of the line
    transformOrigin: 'left top',
    transform: `rotate(${Math.atan2(pos[1][1] - pos[0][1], pos[1][0] - pos[0][0])}rad)`,
    backgroundColor: '#555555',
  }}></div>;
};

export default App;