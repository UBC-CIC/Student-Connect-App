import AWS from "aws-sdk";
import {eventDateCleaner, eventEndDateCleaner, htmlTagCleaner} from "../helpers/HtmlTagCleaner";

export const fetchEvents = (categories) => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "events",
                'categories': categories,
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
                    if(item._source.startDate) item._source.startDate = eventDateCleaner(item._source.startDate)
                    if(item._source.endDate) item._source.endDate = eventDateCleaner(item._source.endDate)
                    if(item._source.endDate) item._source.endDate = eventEndDateCleaner(item._source.startDate,item._source.endDate)

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
    var params = {
        TableName: "EventsTable"
    };
    return (dispatch) => {
        var dynamodb = new AWS.DynamoDB.DocumentClient()
        dynamodb.scan(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    let allEvents = data.Items
                    allEvents.map((item)=>{
                        item.excerpt=htmlTagCleaner(item.excerpt)

                        if(item.startDate) item.startDate = eventDateCleaner(item.startDate)
                        if(item.endDate) item.endDate = eventDateCleaner(item.endDate)
                        if(item.endDate) item.endDate = eventEndDateCleaner(item.startDate,item.endDate)

                        if(item.cost===""){
                            item.cost='Free'
                        }

                        allEvents.sort(function(a, b) {
                            return new Date(a.startDate) - new Date(b.startDate)
                        });

                        dispatch(fetchAllEventsSuccess(allEvents))

                    })

                }
            }
        )
    }
}
export const fetchAllEventsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_EVENTS_SUCCESS",
        payload: payload
    }
}
