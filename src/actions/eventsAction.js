import AWS from "aws-sdk";
import {htmlTagCleaner} from "../helpers/htmlTagCleaner";
import {API, graphqlOperation} from "aws-amplify";
import {listClubsTables, listEventsTables} from "../graphql/queries";
import {fetchAllClubsSuccess} from "./clubAction";

export const fetchEvents = () => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "events",
                'categories': "Health Psychology Research Recreation Careers",
            }),
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(data.Payload));
                results = JSON.parse(results)
                results=results.hits.hits
                for(let i=0;i<results.length;i++){
                    results[i]._source.excerpt= htmlTagCleaner(results[i]._source.excerpt)
                }
                dispatch(fetchEventsSuccess(results))
            }
        });
    }
}
export const fetchEventsSuccess = (payload) => {
    return {
        type: "FETCH_EVENTS_SUCCESS",
        payload: payload
    }
}

export const fetchAllEvents = () => {
    return (dispatch) => {
        API.graphql(graphqlOperation(listEventsTables, {limit: 200})).then((response) => {
            dispatch(fetchAllEventsSuccess(response.data.listEventsTables.items))
        }).catch((err) => {
            console.log("Error fetching events: ", err);
        })
    }
}
export const fetchAllEventsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_EVENTS_SUCCESS",
        payload: payload
    }
}
