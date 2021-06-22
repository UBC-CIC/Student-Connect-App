

const initialClubs =[]

export const clubsReducer = (club = initialClubs, action) => {
    let clubsList = club;
    switch (action.type) {
        case "FETCH_CLUBS_SUCCESS": {
            return (action.payload);
        }

        default:
            return clubsList;
    }

};

const initialAllClubs =[]

export const allClubsReducer = (club = initialAllClubs, action) => {
    let clubsList = club;
    switch (action.type) {
        case "FETCH_ALL_CLUBS_SUCCESS": {
            return (action.payload);
        }
        default:
            return clubsList;
    }

};

