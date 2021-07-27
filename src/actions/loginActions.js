// ===================================---CHANGE LOGIN STATE---=======================================
// Updates the login state of the application

export const updateLoginState = (payload) => {
    return (dispatch) => {
        dispatch({ type: "SET_LOGIN_STATE", payload: payload });
    }
}

export const updateCurrentUser =  (cognitoUser) => {

    return (dispatch) => {
        dispatch({type: "GOT_CURRENT_USER", payload: cognitoUser})
    }
}
export const updateCredentials =  (credential) => {

    return (dispatch) => {
        dispatch({type: "GOT_CURRENT_CREDENTIALS", payload: credential})
    }
}