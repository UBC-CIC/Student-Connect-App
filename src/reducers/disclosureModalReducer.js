const initialModalStatus = false;

export const disclosureModalReducer = ( currModalState = initialModalStatus, action) => {
    let newState = currModalState;
    switch (action.type) {
        case "OPEN_DISCLOSURE_MODAL": {
            return (action.payload);
        }
        case "CLOSE_DISCLOSURE_MODAL": {
            return (action.payload);
        }
        default:
            return newState;
    }

};
