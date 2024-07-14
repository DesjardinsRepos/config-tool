const UID_LENGTH = 10
export const GENERATE_UID_10 = () => (Math.random() + 1).toString(36).substring(2).padEnd(UID_LENGTH, '0').substring(0, UID_LENGTH)

export const findSelected = (selected, devices, connections) => {
    // check connections
    let obj = connections.find(obj => obj.id === selected?.id)
    if(obj) return ["connection", obj]

    // check devices
    obj = devices.find(obj => obj.id === selected?.id)
    if(obj) return ["device", obj]

    // check services
    obj = devices.find(dev => dev.services.some(s => s.id === selected?.id))
    if(obj) return ["service", {
        parent: obj,
        service: obj.services.find(s => s.id === selected?.id)
    }]

    // this wont find & and one-sided connections

    return ["unknown", undefined]
}

export const createDevice = (staticDevice, position, positionRef) => {
    const devID = GENERATE_UID_10()

    return {
        id: devID,
        startPosition: {
            x: position.x - 150,
            y: position.y - 55 + positionRef.current.getBoundingClientRect().top
        },
        ...staticDevice,
        services: staticDevice.services?.map(s => ({
            ...s, 
            id: devID + GENERATE_UID_10()
        }))
    }
}

export const calculateInitialDevicePosition = (canvas, device) => {
    // subtracting leftbar width = 300 both here and in createDevice, to center placement

    return {
        x: (-canvas.positionX + device.x) / canvas.scale - 150,
        y: (-canvas.positionY + device.y) / canvas.scale
    }
}

export const createConnection = (id1, id2) => {
    const connectionHash = GENERATE_UID_10()
    
    return [{
        participants: [
            id1,
            id2
        ],
        id: connectionHash
    }, connectionHash]
}

export const calculateInitialConnectionPointPosition = (canvas, connectionPoint) => {
    // topbar height: 55, leftbar width: 300, connectionPoint: 50x50

    return {
        x: (-canvas.positionX + connectionPoint.x - 300) / canvas.scale - 25,
        y: (-canvas.positionY + connectionPoint.y- 55) / canvas.scale - 25 
    }
}

export const addParticipantToConnection = (setSelected, setConnections, initialConnection, newParticipant, lastInteractionPosition) => {
    
    setConnections(connections => connections.map(connection => initialConnection.id === connection.id ? {
        ...initialConnection,
        participants: [
            ...initialConnection.participants,
            {
                id: newParticipant.id,
                direction: newParticipant.direction
            }
        ],
        lastInteractionPosition
    } : connection))

    setSelected({id: initialConnection.id})
}

export const deleteConnection = (connectionToDelete, setConnections, setSelected) => {
    setConnections(connections => connections.filter(c => c.id !== connectionToDelete.id))
    setSelected({})
}

export const deleteParticipant = (initialConnection, participant, setConnections, setSelected) => {
    if(initialConnection.participants.length < 3) 
        deleteConnection(initialConnection, setConnections, setSelected)
    else    
        setConnections(connections => connections.map(connection => initialConnection.id === connection.id ? {
            ...initialConnection,
            participants: initialConnection.participants.filter(p => p !== participant),
        } : connection))
}

export const changeParticipantDirection = (initialConnection, participant, setConnections) => {
    setConnections(connections => connections.map(connection => initialConnection.id === connection.id ? {
        ...initialConnection,
        participants: initialConnection.participants.map(p => p.id === participant.id ? 
            {
                id: p.id,
                direction: p.direction === "left" ? "right" : "left"
            }
            : p
        ),
    } : connection))
}