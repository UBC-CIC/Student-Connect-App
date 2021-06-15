
export const surveyReducer = (devices = initialDevices, action) => {
    let newDeviceList = [...devices];
    switch (action.type) {
        case "FETCH_CONTENT_TAGS_SUCCESS": {
            return action.payload;
        }
        case "REGISTER_NEW_DEVICE": {
            return [...newDeviceList, {id: action.payload.id, userID: null,
                deviceStatus: action.payload.deviceStatus, deviceOS: action.payload.deviceOS,
                osVersion: action.payload.osVersion, geofence: null, data: null}];
        }
        case "NEW_DEVICE_FOUND": {
            return [...newDeviceList, action.payload];
        }
        case "ASSOCIATE_NEW_DEVICE": {
            return pairDeviceHelper(newDeviceList, action.payload);
        }
        case "DISASSOCIATE_DEVICE": {
            return unpairDeviceHelper(newDeviceList, action.payload);
        }
        case "DELETE_DEVICE": {
            return deleteDeviceHelper(newDeviceList, action.payload);
        }
        case "ASSIGN_LOCATION": {
            return assignGeofenceHelper(newDeviceList, action.payload);
        }
        case "REMOVE_LOCATION": {
            return removeGeofenceHelper(newDeviceList, action.payload);
        }
        case "CLEAR_DEVICE_STATUS": {
            return clearDeviceStatusHelper(newDeviceList, action.payload);
        }
        case "DEVICE_UPDATED": {
            return updatedDeviceHelper(newDeviceList, action.payload);
        }
        default:
            return newDeviceList;
    }

};
