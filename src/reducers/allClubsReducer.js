

const initialClubs =[]

const allClubsReducer = (club = initialClubs, action) => {
    let clubsList = club;
    switch (action.type) {
        case "FETCH_ALL_CLUBS_SUCCESS": {
            return (action.payload);
        }
        default:
            return clubsList;
    }

};


export default allClubsReducer