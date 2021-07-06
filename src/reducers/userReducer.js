const preference = null

export const preferenceReducer = ( input= preference, action) => {
    switch (action.type) {
        case "GET_USER_PREFERENCE_SUCCESS": {
            return (action.payload);
        }

        default:
            return input;
    }

};
