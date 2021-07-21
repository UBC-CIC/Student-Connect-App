import {API, graphqlOperation} from "aws-amplify";
import {createSavedItemsTable, updateSavedItemsTable,} from "../graphql/mutations";
import {getSavedItemsTable} from "../graphql/queries";




export const getSavedItems = (id) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(getSavedItemsTable, {id: id})).then((response) => {
            let res = response.data.getSavedItemsTable
            if(res){
                if(res.createdAt) delete res.createdAt
                if(res.updatedAt) delete res.updatedAt
                if(res.owner) delete res.owner
                console.log(response)

                dispatch(getSavedItemsSuccess(response.data.getSavedItemsTable))

            }
        })
    }
}
export const getSavedItemsSuccess = (payload) => {
    return {
        type: "GET_SAVED_ITEMS_SUCCESS",
        payload: payload
    }
}

export const removeSavedItems = (payload,showResult) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(updateSavedItemsTable, {input: payload})).then((response) => {
            dispatch(updateItemSuccess(payload))
            showResult("success")

        }).catch((err) => {
        console.log("Error updating user saved items: ", err);
            showResult("error")
    })
    }

}
export const updateSavedItems = (payload) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(updateSavedItemsTable, {input: payload})).then((response) => {
            dispatch(updateItemSuccess(payload))
        }).catch((err) => {
            console.log("Error updating user saved items: ", err);
        })
    }

}

export const updateItemSuccess = (payload) => {
    return {
        type: "UPDATE_SAVED_ITEMS_SUCCESS",
        payload: payload
    }
}
