const initialState = {
    currentState: "signIn"
};



export const loginReducer = (currentState = initialState, action) => {
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

const initialUser = null

export const currentUserReducer = (currentUser = initialUser, action) => {
    let newUser = currentUser;
    switch(action.type) {
        case "GOT_CURRENT_USER": {
            return action.payload

        }
        default:
            return newUser
    }
}
