const initialState = {
    currentState: "signIn"
};



const loginReducer = (currentState = initialState, action) => {
    let newState = currentState;
    switch(action.type) {
        case "SET_LOGIN_STATE": {
            return {
                currentState: action.payload
            }
        }
        default:
            return newState
    }
}

export default loginReducer;