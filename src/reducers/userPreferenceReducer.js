const initialPreference = null

export const preferenceReducer = ( input= initialPreference, action) => {
    switch (action.type) {
        case "GET_USER_PREFERENCE_SUCCESS": {
            return (action.payload);
        }
        default:
            return input;
    }

};
