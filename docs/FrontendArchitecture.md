# Architecture

Using AWS Amplify, this project has the following configured backend resources:
* [Cognito authentication](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js) featuring user pools (a user directory provided by AWS) and identity pools (Controls permission to access AWS resources in your account)
* 3 DynamoDB tables 
  1. Save user attributes from external IDP provider (For future development)
  2. Save user survey responses to provide best recommendation onto their feeds 
  3. Save user archived news/blogs/events
* A [GraphQL API](https://docs.amplify.aws/guides/api-graphql/building-a-form-api/q/platform/js) that allows the app to query data from the above 3 tables


<hr>

## GraphQL Schema
### User preference table
```
type userPreference @model @auth(rules: [{ allow: owner, operations: [create, update, delete] }]) {
  id: ID!
  newsBlogsClubsPreference: newsBlogsClubsList!
  sportsPreference:sportsPreference!
  academicPreference:academicList!
  eventsPreference: eventsList!
  emailNotification: Boolean!
}
type sportsPreference {
  mensSportsList: mensSportsList
  womensSportsList: womensSportsList
}
type womensSportsList {
  basketball: Boolean
  crew: Boolean
  crossCountry: Boolean
  fieldHockey: Boolean
  golf: Boolean
  iceHockey: Boolean
  lacrosse: Boolean
  skiing: Boolean
  soccer: Boolean
  softball: Boolean
  squash: Boolean
  swimming: Boolean
  tennis: Boolean
  trackAndField: Boolean
  volleyball: Boolean
}
type mensSportsList {
  baseball: Boolean
  basketball: Boolean
  crew: Boolean
  crossCountry: Boolean
  football: Boolean
  golf: Boolean
  iceHockey: Boolean
  lacrosse: Boolean
  skiing: Boolean
  soccer: Boolean
  squash: Boolean
  swimming: Boolean
  tennis: Boolean
  trackAndField: Boolean
  wrestling: Boolean
}
type newsBlogsClubsList {
  academics: Boolean
  activism: Boolean
  careers: Boolean
  culture: Boolean
  gradSchool: Boolean
  healthAndWellbeing: Boolean
  recreation: Boolean
  religion: Boolean
  research: Boolean
  sports: Boolean
}
type academicList {
  arts: Boolean
  biology: Boolean
  business: Boolean
  chemistry: Boolean
  computerScience: Boolean
  economics: Boolean
  engineering: Boolean
  history: Boolean
  mathematics: Boolean
  philosophy: Boolean
  physics: Boolean
  psychology: Boolean
  science: Boolean
  statistics: Boolean
}
type eventsList {
  faculties: Boolean
  studentServices: Boolean
  subjectDepartments: Boolean
  universityServices: Boolean
}
```
### User data table
```
type userData  @model @auth(rules: [{ allow: owner, operations: [create, update, delete] }]) {
  id: ID!
  SPUID: ID
  displayName: String
  yearLevel: Int
  email: String
  primarySpecialization:String
  campus:String
  faculty: String
  gender: String
  cisOrTrans:String
}

```
### Saved Item Table
```
type savedItem{
  title:String
  image:String
  link:String

}
type savedItemsTable  @model @auth(rules: [{ allow: owner, operations: [create, update, delete] }]) {
  id:ID!
  savedItems:[savedItem]
}

