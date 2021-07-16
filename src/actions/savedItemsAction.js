import {API, graphqlOperation} from "aws-amplify";
import {createSavedItemsTable, updateSavedItemsTable,} from "../graphql/mutations";



export const createSavedItems = (id) => {
}

export const getSavedItems = (id) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(getSavedItems, {input: id})).then((response) => {
            let res = response.data
            dispatch(getSavedItemsSuccess(res))
        })
    }
}
export const getSavedItemsSuccess = (payload) => {
    return {
        type: "GET_SAVED_ITEMS_SUCCESS",
        payload: payload
    }
}

export const updateSavedItems = (payload) => {
    if(payload.createdAt)delete payload.createdAt
    if(payload.owner) delete payload.owner
    if(payload.updatedAt) delete payload.updatedAt
    API.graphql(graphqlOperation(updateSavedItemsTable, {input: payload})).then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log("Error updating user saved items: ", err);
    })
}
