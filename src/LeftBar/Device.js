import { useState } from 'react';
import Draggable from 'react-draggable';
import { colors as c } from "../styles.js";
import s from "./Device.css"
import { GlobalStateContext } from "../App.js"
import { useContext } from "react";

export default ({el, index, groupOffset}) => {
  	const [position, setPosition] = useState({ x: 0, y: -2 });
	const [cursor, setCursor ] = useState("grab");
    const { setDevices } = useContext(GlobalStateContext);

	const InnerElement = () => (
		<>
			<img style={s.img}/>
			<p style={s.elementText}>{el.name}</p>
			<svg style={s.info} fill={c.royal} width="13px" height="13px" viewBox="0 0 416.979 416.979"><g><path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/></g></svg>
		</>	
	)
  	
	return (
		<div style={s.elementWrapper}>
			<InnerElement/>
			
			<div style ={{position: "absolute"}}>
				<Draggable
					position={position}
					onStart={() => setCursor("grabbing")}
					onStop={() => {
						setPosition({ x: 0, y: -2 });
						setCursor("grab")

						// TODO panning mit reinrechnen
						setDevices(devices => [
							...devices,
							{
								id: "oij09834q",
								name: el.name,
								startPosition: {
									x: position.x - 300 - devices.length * 300,
									y: position.y + 65 + index * 48 + groupOffset
								},
								services: []
							}
						])
					}}
				    onDrag={(e, ui) => {
						const { x, y } = ui;
						setPosition({ x, y });
				    }}
				>
					<div style={{...s.elementWrapper, cursor: cursor, opacity: 0.5}}>
						<InnerElement/>
					</div>
				</Draggable>
			</div>
			
		</div>
	)
}
