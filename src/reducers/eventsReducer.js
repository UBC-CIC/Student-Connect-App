

const initialEvents =[]

export const eventsReducer = (event = initialEvents, action) => {
    let eventsList = [...event];
    switch (action.type) {
        case "FETCH_EVENTS_SUCCESS": {
            return (action.payload);
        }
        default:
            return eventsList;
    }

};
const initialAllEvents=[]

export const allEventsReducer = (event = initialAllEvents, action) => {
    let eventsList = [...event];
    console.log(eventsList)
    switch (action.type) {
        case "FETCH_ALL_EVENTS_SUCCESS": {
            return (action.payload);
        }
        default:
            return eventsList;
    }

};


