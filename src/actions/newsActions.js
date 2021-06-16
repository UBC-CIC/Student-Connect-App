

// ===================================---FETCH NEWS---=============================================
import AWS from "aws-sdk";

export const fetchNews = () => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "news",
                'categories': "Health Psychology Research",
            }),
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(data.Payload));
                console.log(results.hits.hits)
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
