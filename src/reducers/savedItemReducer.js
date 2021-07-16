const initialSavedItem= null

export const savedItemReducer = ( input= initialSavedItem, action) => {
    switch (action.type) {
        case "GET_SAVED_ITEMS_SUCCESS": {
            return (action.payload);
        }
        default:
            return input;
    }

};
