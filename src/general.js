const UID_LENGTH = 10
export const GENERATE_UID_10 = () => (Math.random() + 1).toString(36).substring(2).padEnd(UID_LENGTH, '0').substring(0, UID_LENGTH)

export const findSelected = (selected, devices, connections) => {
    if(!selected.id) alert("wrong findSelected format!")

    // check connections
    let obj = connections.find(obj => obj.id === selected?.id)
    if(obj) return ["connection", obj]

    // check devices
    obj = devices.find(obj => obj.id === selected?.id)
    if(obj) return ["device", obj]

    // check services
    obj = devices.find(dev => dev.services?.some(s => s.id === selected?.id))
    if(obj) return ["service", {
        parent: obj,
        service: obj.services.find(s => s.id === selected?.id)
    }]

    // check Pins
    if(selected.id.includes("-")) {
        const [serviceId, pin] = selected.id.split("-")
        const dev = devices.find(dev => dev.services?.some(s => s.id === serviceId))
        if(dev) {
            const service = dev.services.find(s => s.id === serviceId)

            return ["pin", {
                device: dev,
                service: service,
                pin: pin
            }]
        }

    }

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

export const createCanvasConnection = (id1, id2, mode, editNumber) => {
    const connectionHash = GENERATE_UID_10()
    
    return [{
        participants: [
            id1,
            id2
        ],
        id: connectionHash,
        mode: mode,
        editNumber: editNumber,
    }, connectionHash]
}

export const createEditorConnection = (id1, id2, mode, editNumber, canvasParentConnectionId) => {
    const connectionHash = GENERATE_UID_10()
    
    return [{
        participants: [
            id1,
            id2
        ],
        id: connectionHash,
        mode: mode,
        editNumber: editNumber,
        canvasParentConnectionId: canvasParentConnectionId,
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

export const deleteDevice = (device, setDevices, setConnections, setSelected) => {
    const serviceIdsOfDeletionService = device.services?.map(s => s.id) || []

    setDevices(devices => devices.filter(d => d.id !== device.id))

    setConnections(
        connections => connections.map(c => ({
            ...c,
            participants: c.participants.filter(p => 
                !serviceIdsOfDeletionService.includes(p.id.substring(0, 20)) // substring to apply for edit connections too
            )
        })).filter(
            c => c.participants.length > 1
        )
    )

    setSelected(selected => selected.id === device.id ? {} : selected)
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

export const getConnectionParentId = (connections, id, direction) => {
    const connection = connections.find(c => c.participants.some(p => p.id === id && p.direction === direction))
    return connection?.id
}

export const reconstructPopupSettingsFromConnections = (c) => {
    alert(JSON.stringify(c, null, 2))
    return {
        connectionId: c.id,
        types: c.availableTypes,
        endpointDirection: c.previousEndpointDirection,
        originId: c.previousOriginId,
        participants: c.participants.map(p => ({
            pin: p.id,
            direction: p.pinType
        })),
        settings: {
            participants: c.participants.map(p => p.connectedDirection),
            type: c.type
        }
    }
}