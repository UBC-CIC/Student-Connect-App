import AWS from "aws-sdk";
import { htmlTagCleaner } from "../helpers/HtmlTagCleaner";
import { API, graphqlOperation } from "aws-amplify";
import { getESDocuments, fetchAllDocuments } from "../graphql/queries";

export const fetchClubs = (categories) => {
  return (dispatch) => {
    let lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.REACT_APP_FunctionName,
      Payload: JSON.stringify({
        index: "clubs",
        categories: categories,
      }),
    };

    lambda.invoke(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        let results = JSON.parse(data.Payload);
        results = JSON.parse(results);
        dispatch(fetchClubsSuccess(results.hits.hits));
      }
    });
  };
};
export const fetchAllClubs = () => {
  return async (dispatch) => {
    let re = await API.graphql(
      graphqlOperation(fetchAllDocuments, {
        docType: "clubs",
      })
    );
    let fetchedData = JSON.parse(re.data.fetchAllDocuments);
    dispatch(fetchAllClubsSuccess(fetchedData));
  };
};
export const fetchClubsSuccess = (payload) => {
  return {
    type: "FETCH_CLUBS_SUCCESS",
    payload: payload,
  };
};
export const fetchAllClubsSuccess = (payload) => {
  return {
    type: "FETCH_ALL_CLUBS_SUCCESS",
    payload: payload,
  };
};
