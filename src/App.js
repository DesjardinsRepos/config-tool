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
  return (
    <ConnectProvider>
      <GlobalStateContext.Provider value={{ 
        mode, 
        setMode, 
        showConnections, 
        setShowConnections,
        setRightBarOpen
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

// soll es möglich sein 2 devices gleichzeitig zu öffnen?