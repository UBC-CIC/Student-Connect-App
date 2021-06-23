import AWS from "aws-sdk";
import {htmlTagCleaner} from "../helpers/htmlTagCleaner";
import {API, graphqlOperation} from "aws-amplify";
import {listBlogsTables, listNewsTables} from "../graphql/queries";

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
                results=results.hits.hits
                for(let i=0;i<results.length;i++){
                    results[i]._source.excerpt= htmlTagCleaner(results[i]._source.excerpt)
                }

                dispatch(fetchBlogsSuccess(results))
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
export const fetchAllBlogs = () => {
    return (dispatch) => {
        API.graphql(graphqlOperation(listBlogsTables, {limit: 200})).then((response) => {
            let allBlogs = response.data.listBlogsTables.items
            for(let i=0;i<allBlogs.length;i++) {
                allBlogs[i].excerpt=htmlTagCleaner(allBlogs[i].excerpt)

            }

                dispatch(fetchAllBlogsSuccess(response.data.listBlogsTables.items))
        }).catch((err) => {
            console.log("Error fetching news: ", err);
        })
    }
}
export const fetchAllBlogsSuccess = (payload) => {
    return {
        type: "FETCH_ALL_BLOGS_SUCCESS",
        payload: payload
    }
}
