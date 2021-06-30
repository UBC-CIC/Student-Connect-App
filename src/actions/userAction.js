import {API, graphqlOperation} from "aws-amplify";
import {getUserData, getUserPreference, listAthleticsNewsTables} from "../graphql/queries";
import {bracketRemover} from "../helpers/HtmlTagCleaner";
import {fetchAllSportsNewsSuccess} from "./newsActions";
import {createUserData, createUserPreference} from "../graphql/mutations";

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
    return (dispatch) => {
        API.graphql(graphqlOperation(getUserPreference, {input: id})).then((response) => {
            let res = response.data
            dispatch(getUserPreferenceSuccess(res))
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
    return (dispatch) => {
        API.graphql(graphqlOperation(createUserPreference, {input: payload})).then((response) => {
            dispatch(createUserPreferenceSuccess(response))
        })
    }
}
export const createUserPreferenceSuccess = (payload) => {
    return {
        type: "CREATE_USER_PREFERENCE_SUCCESS",
        payload: payload
    }
}
