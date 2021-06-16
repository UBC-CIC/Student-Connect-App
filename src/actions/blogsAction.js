import AWS from "aws-sdk";

export const fetchBlogs = () => {
    return (dispatch) => {
        let lambda = new AWS.Lambda()
        const params = {
            FunctionName: process.env.REACT_APP_FunctionName,
            Payload:JSON.stringify({
                'index': "blogs",
                'categories': "Health Psychology Research Recreation Careers",
            }),
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                let results = (JSON.parse(data.Payload));
                results = JSON.parse(results)
                console.log(results)
                dispatch(fetchBlogsSuccess(results.hits.hits))
            }
        });
    }
}
export const fetchBlogsSuccess = (payload) => {
    return {
        type: "FETCH_BLOGS_SUCCESS",
        payload: payload
    }
}
