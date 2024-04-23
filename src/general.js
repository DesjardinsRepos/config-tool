const UID_LENGTH = 10
const GENERATE_UID_10 = () => (Math.random() + 1).toString(36).substring(2).padEnd(UID_LENGTH, '0').substring(0, UID_LENGTH)

export const findSelected = (selected, devices, connections) => {
    if(selected.length === 10) {
        // check connections
        var obj = connections.find(obj => obj.id === selected)

        // check devices
        if(!obj)  {
            obj = devices.find(obj => obj.id === selected)
            
            return ["device", obj]
        }
    }

    if(selected.length === 22) {
        // check services
        obj = devices
            //.find(dev => dev.services.some(s => s.id === serviceId))
            .find(dev => dev.id === selected.slice(0, 10))
            .services.find(s => s.id === selected.slice(0, 20))
                
        return ["service", obj]
    }

    return obj ? ["connection", obj] : ["unknown", "unknown"]
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
        x: (-canvas.positionX + connectionPoint.x) / canvas.scale - 300 - 25,
        y: (-canvas.positionY + connectionPoint.y) / canvas.scale - 55 - 25
    }
}

export const addParticipantToConnection = (setSelected, setConnections, initialConnection, newParticipantID, lastInteractionPosition) => {
    setConnections(connections => connections.map(connection => initialConnection.id === connection.id ? {
        participants: [
            ...initialConnection.participants,
            newParticipantID
        ],
        lastInteractionPosition,
        id: initialConnection.id
    } : connection))

    setSelected(initialConnection.id)
}