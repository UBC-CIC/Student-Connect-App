

// ===================================---FETCH NEWS---=============================================
import AWS from "aws-sdk";
import {API, graphqlOperation} from "aws-amplify";
import {listEventsTables, listNewsTables} from "../graphql/queries";

export const fetchNews = () => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "news",
                'categories': "Health Psychology Research Recreation Careers",
            }),
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(data.Payload));
                results = JSON.parse(results)
                dispatch(fetchNewsSuccess(results.hits.hits))
            }
        });
    }
}
export const fetchNewsSuccess = (payload) => {
    return {
        type: "FETCH_NEWS_SUCCESS",
        payload: payload
    }
}
export const fetchAllNews = () => {
    return (dispatch) => {
        API.graphql(graphqlOperation(listNewsTables, {limit: 200})).then((response) => {
            let res = response.data.listNewsTables.items
            res.sort(function(a, b) {
                return new Date(a.dateModified)-new Date(b.dateModified)
            });
            res.map((item)=>{
                item.dateModified = new Date(item.dateModified).toLocaleDateString('en-CA');
            })

            dispatch(fetchAllNewsSuccess(res))
        }).catch((err) => {
            console.log("Error fetching news: ", err);
        })
    }
}
export const fetchAllNewsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_NEWS_SUCCESS",
        payload: payload
    }
}
