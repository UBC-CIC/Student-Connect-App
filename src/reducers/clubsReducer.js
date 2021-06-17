

const initialClubs =[]

const clubsReducer = (club = initialClubs, action) => {
    let clubsList = [...club];
    switch (action.type) {
        case "FETCH_CLUBS_SUCCESS": {
            return (action.payload);
        }
        default:
            return clubsList;
    }

};


export default clubsReducer