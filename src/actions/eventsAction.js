import AWS from "aws-sdk";
import {bracketRemover, eventDateCleaner, eventEndDateCleaner, htmlTagCleaner} from "../helpers/HtmlTagCleaner";
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
                results.map((item)=>{
                    item._source.excerpt= htmlTagCleaner(item._source.excerpt)
                })

                results.sort(function(a, b) {
                    return new Date(a._source.startDate) - new Date(b._source.startDate)
                });
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
            let allEvents = response.data.listEventsTables.items
            allEvents.map((item)=>{
                item.excerpt=htmlTagCleaner(item.excerpt)
                item.thumbnailImage = bracketRemover(item.thumbnailImage)

                if(item.startDate) item.startDate = eventDateCleaner(item.startDate)
                if(item.endDate) item.endDate = eventDateCleaner(item.endDate)
                if(item.endDate) item.endDate = eventEndDateCleaner(item.startDate,item.endDate)
                item.fullImage=bracketRemover(item.fullImage)

                if(item.cost===""){
                    item.cost='Free'
                }

            })

            allEvents.sort(function(a, b) {
                return new Date(a.startDate)-new Date(b.startDate)
            });

            console.log(allEvents)
            dispatch(fetchAllEventsSuccess(allEvents))

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
