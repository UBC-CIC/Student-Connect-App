import AWS from "aws-sdk";
import { htmlTagCleaner } from "../helpers/HtmlTagCleaner";
import { API, graphqlOperation } from "aws-amplify";
import { getESDocuments, fetchAllDocuments } from "../graphql/queries";
export const fetchBlogs = (categories) => {
  return async (dispatch) => {
    // let lambda = new AWS.Lambda()
    // const params = {
    //     FunctionName: process.env.REACT_APP_FunctionName,
    //     Payload:JSON.stringify({
    //         'index': "blogs",
    //         'categories': categories,
    //     }),
    // };
    let res = await API.graphql(
      graphqlOperation(getESDocuments, {
        index: "blogs",
        categories: categories,
      })
    ).then((e) => {
      console.log(e);
    });
    console.log("LOOK HERE");

    console.log(categories);
    console.log(res);
    // lambda.invoke(params, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else{
    //         let results = (JSON.parse(data.Payload));
    //         results = JSON.parse(results)
    //         results=results.hits.hits
    //         for(let i=0;i<results.length;i++){
    //             results[i]._source.excerpt= htmlTagCleaner(results[i]._source.excerpt)
    //         }

    //         dispatch(fetchBlogsSuccess(results))
    //     }
    // });
  };
};
export const fetchBlogsSuccess = (payload) => {
  return {
    type: "FETCH_BLOGS_SUCCESS",
    payload: payload,
  };
};
export const fetchAllBlogs = () => {
  return async (dispatch) => {
    let re = await API.graphql(
      graphqlOperation(fetchAllDocuments, {
        docType: "blogs",
      })
    );
    let fetchedData = JSON.parse(re.data.fetchAllDocuments);
    fetchedData.map((item) => {
      item.excerpt = htmlTagCleaner(item.excerpt);
      item.dateModified = new Date(
        item.dateModified.replace(/-/g, "/")
      ).toLocaleDateString("en-CA");
    });

    fetchedData.sort(function (a, b) {
      return new Date(new Date(b.dateModified) - new Date(a.dateModified));
    });
    dispatch(fetchAllBlogsSuccess(fetchedData));
  };
};
export const fetchAllBlogsSuccess = (payload) => {
  return {
    type: "FETCH_ALL_BLOGS_SUCCESS",
    payload: payload,
  };
};
