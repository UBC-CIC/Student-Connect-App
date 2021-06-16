

const initialEvents =[]

const eventsReducer = (event = initialEvents, action) => {
    let eventsList = [...event];
    switch (action.type) {
        case "FETCH_EVENTS_SUCCESS": {
            return (action.payload);
        }
        default:
            return eventsList;
    }

};


export default eventsReducer