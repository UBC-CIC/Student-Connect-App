// ===================================---FETCH NEWS---=============================================
import AWS from "aws-sdk";
import { htmlTagCleaner } from "../helpers/HtmlTagCleaner";
import { API, graphqlOperation } from "aws-amplify";
import { getESDocuments, fetchAllDocuments } from "../graphql/queries";

export const fetchNews = (categories) => {
  return (dispatch) => {
    let lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.REACT_APP_FunctionName,
      Payload: JSON.stringify({
        index: "news",
        categories: categories,
      }),
    };
    lambda.invoke(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        let results = JSON.parse(data.Payload);
        results = JSON.parse(results);
        dispatch(fetchNewsSuccess(results.hits.hits));
      }
    });
  };
};
export const fetchNewsSuccess = (payload) => {
  return {
    type: "FETCH_NEWS_SUCCESS",
    payload: payload,
  };
};
export const fetchAllNews = () => {
  return async (dispatch) => {
    let re = await API.graphql(
      graphqlOperation(fetchAllDocuments, {
        docType: "news",
      })
    );
    let allNews = JSON.parse(re.data.fetchAllDocuments);

    allNews.map((item) => {
      item.dateModified = new Date(
        item.dateModified.replace(/-/g, "/")
      ).toLocaleDateString("en-CA");
    });
    allNews.sort(function (a, b) {
      return new Date(new Date(b.dateModified) - new Date(a.dateModified));
    });
    dispatch(fetchAllNewsSuccess(allNews));
  };
};
export const fetchAllNewsSuccess = (payload) => {
  return {
    type: "FETCH_ALL_NEWS_SUCCESS",
    payload: payload,
  };
};
export const fetchSportsNews = (categories) => {
  return (dispatch) => {
    let lambda = new AWS.Lambda();
    const params = {
      FunctionName: process.env.REACT_APP_FunctionName,
      Payload: JSON.stringify({
        index: "athleticsnews",
        categories: categories,
      }),
    };
    lambda.invoke(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        let results = JSON.parse(JSON.parse(data.Payload)).hits.hits;
        results.map((item) => {
          item._source.dateModified = new Date(
            item._source.dateModified.replace(/-/g, "/")
          ).toLocaleDateString("en-CA");
          let male = item._source.categories.indexOf("Male");
          let female = item._source.categories.indexOf("Female");
          if (male > -1) item._source.categories[male] = "Men's";
          if (female > -1) item._source.categories[female] = "Women's";
        });
        results.sort(function (a, b) {
          return (
            new Date(b._source.dateModified) - new Date(a._source.dateModified)
          );
        });

        dispatch(fetchSportsNewsSuccess(results));
      }
    });
  };
};
export const fetchSportsNewsSuccess = (payload) => {
  return {
    type: "FETCH_SPORTS_NEWS_SUCCESS",
    payload: payload,
  };
};
export const fetchAllSportsNews = () => {
  return async (dispatch) => {
    let re = await API.graphql(
      graphqlOperation(fetchAllDocuments, {
        docType: "athleticsnews",
      })
    );
    let allSportsNews = JSON.parse(re.data.fetchAllDocuments);

    allSportsNews.map((item) => {
      item.dateModified = new Date(
        item.dateModified.replace(/-/g, "/")
      ).toLocaleDateString("en-CA");
    });
    allSportsNews.sort(function (a, b) {
      return new Date(new Date(b.dateModified) - new Date(a.dateModified));
    });
    dispatch(fetchAllSportsNewsSuccess(allSportsNews));
  };
};
export const fetchAllSportsNewsSuccess = (payload) => {
  return {
    type: "FETCH_ALL_SPORTS_NEWS_SUCCESS",
    payload: payload,
  };
};
