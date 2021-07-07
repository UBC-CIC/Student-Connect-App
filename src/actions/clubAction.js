import AWS from "aws-sdk";
import {API, graphqlOperation} from 'aws-amplify';
import {listClubsTables} from "../graphql/queries";

export const fetchClubs = () => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "clubs",
                'categories': "Health Psychology Research Recreation Careers",
            }),
        };

        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(data.Payload));
                results = JSON.parse(results)
                dispatch(fetchClubsSuccess(results.hits.hits))
            }
        });
    }
}
export const fetchAllClubs = () => {
    return (dispatch) => {
        API.graphql(graphqlOperation(listClubsTables, {limit: 200})).then((response) => {
            dispatch(fetchAllClubsSuccess(response.data.listClubsTables.items))
        }).catch((err) => {
            console.log("Error fetching clubs: ", err);
        })
    }
}
export const fetchClubsSuccess = (payload) => {
    return {
        type: "FETCH_CLUBS_SUCCESS",
        payload: payload
    }
}
export const fetchAllClubsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_CLUBS_SUCCESS",
        payload: payload
    }
}
