## Architecture

Using AWS Amplify, this project has the following configured backend resources:
* [Cognito authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js) featuring user pools (a user directory provided by AWS) and identity pools (Controls permission to access AWS resources in your account)
* 3 DynamoDB tables 
  1. Save user attributes from external IDP provider (For future development)
  2. Save user survey responses to provide best recommendation onto their feeds 
  3. Save user archived news/blogs/events
* A [GraphQL API](https://docs.amplify.aws/guides/api-graphql/building-a-form-api/q/platform/js) that allows the app to query data from the above 3 tables


