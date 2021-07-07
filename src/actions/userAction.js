import {API, graphqlOperation} from "aws-amplify";
import {getUserData, getUserPreference} from "../graphql/queries";
import {createUserData, createUserPreference, updateUserPreference} from "../graphql/mutations";

export const getUserDataAction = (id) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(getUserData, {input: id})).then((response) => {
            let res = response.data
            dispatch(getUserDataSuccess(res))
        })
    }
}
export const getUserDataSuccess = (payload) => {
    return {
        type: "GET_USER_DATA_SUCCESS",
        payload: payload
    }
}
export const getUserPreferenceAction = (id) => {
    console.log(id)
    return (dispatch) => {
        API.graphql(graphqlOperation(getUserPreference, {id: id})).then((response) => {
            let res = response.data
            console.log(res)
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
    console.log(payload)
    API.graphql(graphqlOperation(createUserPreference, {input: payload})).then((response) => {
        console.log(response)

    }).catch((err) => {
        console.log("Error: ", err);
    })


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
    console.log(payload)
    API.graphql(graphqlOperation(updateUserPreference, {input: payload})).then((response) => {
            console.log(response)
    }).catch((err) => {
            console.log("Error updating user preference: ", err);
    })
}
