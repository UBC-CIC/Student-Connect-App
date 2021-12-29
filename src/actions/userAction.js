import {API, graphqlOperation} from "aws-amplify";
import {getUserData, getUserPreference} from "../graphql/queries";
import {createUserData, createUserPreference, updateUserPreference, updateUserData} from "../graphql/mutations";

export const getUserDataAction = (id) => {
    return async (dispatch) => {
        await API.graphql(graphqlOperation(getUserData, {id: id})).then((response) => {
            let res = response.data
            dispatch(getUserDataSuccess(res.getUserData))
        }).catch((err) => {
            console.log(err);
        })
    }
}
export const getUserDataSuccess = (payload) => {
    return {
        type: "GET_USER_DATA_SUCCESS",
        payload: payload
    }
}
export const updateUserDataAction = (payload) => {
    API.graphql(graphqlOperation(updateUserData, {input: payload}))
    .then((response) => {
        console.log("user info updated")
    }).catch((err) => {
        console.log("Error updating user info: ", err);
    })
}
export const getUserPreferenceAction = (id) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(getUserPreference, {id: id})).then((response) => {
            let res = response.data
            dispatch(getUserPreferenceSuccess(res.getUserPreference))
        })
    }
}

export const getUserPreferenceSuccess = (payload) => {
    return {
        type: "GET_USER_PREFERENCE_SUCCESS",
        payload: payload
    }
}
export const createUserDataAction = (payload) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(createUserData, {input: payload})).then((response) => {
            dispatch(createUserDataSuccess(response))
        }).catch((err) => {
            console.log(err);
        })
    }
}
export const createUserDataSuccess = (payload) => {
    return {
        type: "CREATE_USER_DATA_SUCCESS",
        payload: payload
    }
}

export const createUserPreferenceAction = (payload) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(createUserPreference, {input: payload})).then((response) => {
            dispatch(createUserPreferenceSuccess(response))
            window.location.reload()
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }



}
export const createUserPreferenceSuccess = (payload) => {
    return {
        type: "CREATE_USER_PREFERENCE_SUCCESS",
        payload: payload
    }
}
export const updateUserPreferenceAction = (payload) => {
    if(payload.createdAt)delete payload.createdAt
    if(payload.owner) delete payload.owner
    if(payload.updatedAt) delete payload.updatedAt
    API.graphql(graphqlOperation(updateUserPreference, {input: payload})).then((response) => {
    }).catch((err) => {
            console.log("Error updating user preference: ", err);
    })
}
