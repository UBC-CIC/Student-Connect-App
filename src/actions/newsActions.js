// ===================================---FETCH NEWS---=============================================
import AWS from "aws-sdk";

export const fetchNews = (categories) => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "news",
                'categories': categories,
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
    var params = {
        TableName: "DocumentsTable",
        KeyConditionExpression: "#dtype = :dname",
        ExpressionAttributeNames:{
            "#dtype": "documentType"
        },
        ExpressionAttributeValues: {
            ":dname": "news"
        }
    };

    return (dispatch) => {
        var dynamodb = new AWS.DynamoDB.DocumentClient()
        dynamodb.scan(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {

                    let allNews = data.Items
                    allNews.map((item)=>{
                        item.dateModified =  new Date(item.dateModified.replace(/-/g, "/")).toLocaleDateString('en-CA')
                    })
                    allNews.sort(function(a, b) {
                        return new Date(new Date(b.dateModified)-new Date(a.dateModified))
                    });

                    dispatch(fetchAllNewsSuccess(allNews))
                }
            }
        )

    }
}
export const fetchAllNewsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_NEWS_SUCCESS",
        payload: payload
    }
}
export const fetchSportsNews = (categories) => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "athleticsnews",
                'categories':categories
            }),
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(JSON.parse(data.Payload))).hits.hits;
                results.map((item)=>{
                    item._source.dateModified =  new Date(item._source.dateModified.replace(/-/g, "/")).toLocaleDateString('en-CA')
                    let male = item._source.categories.indexOf('Male')
                    let female = item._source.categories.indexOf('Female')
                    if(male>-1) item._source.categories[male]='Men\'s'
                    if (female>-1) item._source.categories[female]='Women\'s'

                })
                results.sort(function(a, b) {
                    return (new Date(b._source.dateModified)-new Date(a._source.dateModified))
                });

                dispatch(fetchSportsNewsSuccess(results))

            }
        });
    }
}
export const fetchSportsNewsSuccess = (payload) => {
    return {
        type: "FETCH_SPORTS_NEWS_SUCCESS",
        payload: payload
    }
}
export const fetchAllSportsNews = () => {
    var params = {
        TableName: "DocumentsTable",
        KeyConditionExpression: "#dtype = :dname",
        ExpressionAttributeNames:{
            "#dtype": "documentType"
        },
        ExpressionAttributeValues: {
            ":dname": "athleticsnews"
        }
    };

    return (dispatch) => {
        var dynamodb = new AWS.DynamoDB.DocumentClient()
        dynamodb.scan(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    let allSportsNews = data.Items
                    allSportsNews.map((item)=>{
                        // item.categories=(bracketRemover(item.categories).split(","))
                        item.dateModified = new Date(item.dateModified.replace(/-/g, "/")).toLocaleDateString('en-CA');

                    })
                    allSportsNews.sort(function(a, b) {
                        return new Date(new Date(b.dateModified)-new Date(a.dateModified))
                    });

                    dispatch(fetchAllSportsNewsSuccess(allSportsNews))
                }
            }
        )
    }
}
export const fetchAllSportsNewsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_SPORTS_NEWS_SUCCESS",
        payload: payload
    }
}
