/* Amplify Params - DO NOT EDIT
	API_STUDENTENGAGEMENT_DOCUMENTSTABLE_ARN
	API_STUDENTENGAGEMENT_DOCUMENTSTABLE_NAME
	API_STUDENTENGAGEMENT_GRAPHQLAPIENDPOINTOUTPUT
	API_STUDENTENGAGEMENT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const htmlTagCleaner = (text) => {
  let res = text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return res;
};
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(event);
  var params = {
    TableName: process.env.API_STUDENTENGAGEMENT_DOCUMENTSTABLE_NAME,
    FilterExpression: "#dtype = :dname",
    ExpressionAttributeNames: {
      "#dtype": "documentType",
    },
    ExpressionAttributeValues: {
      ":dname": event.arguments.docType,
    },
  };
  const scanResult = await dynamodb.scan(params).promise();
  const allBlogs = scanResult.Items;
  allBlogs.forEach((item) => {
    item.excerpt = htmlTagCleaner(item.excerpt);
    item.dateModified = new Date(
      item.dateModified.replace(/-/g, "/")
    ).toLocaleDateString("en-CA");
  });
  allBlogs.sort(function (a, b) {
    return new Date(new Date(b.dateModified) - new Date(a.dateModified));
  });
  return JSON.stringify(allBlogs);
};
