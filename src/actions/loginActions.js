
// ===================================---CHANGE LOGIN STATE---=======================================
// Updates the login state of the application
export const updateLoginState = (payload) => {
    return (dispatch) => {
        dispatch({ type: "SET_LOGIN_STATE", payload: payload });
    }
}