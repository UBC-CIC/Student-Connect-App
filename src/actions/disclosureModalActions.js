export const openModal = () => {
    return (dispatch) => {
        dispatch({ type: "OPEN_DISCLOSURE_MODAL", payload: true });
    }
}

export const closeModal = () => {
    return (dispatch) => {
        dispatch({ type: "CLOSE_DISCLOSURE_MODAL", payload: false });
    }
}