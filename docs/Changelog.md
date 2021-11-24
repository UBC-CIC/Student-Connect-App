# Changelog

## V1.5.0 - 2021-11-XX
### Back-end Changes
- CWL integration:
    - SAML (shibboleth) integration using Cognito has been added. The instructions to deploy can be found [here](https://github.com/UBC-CIC/Student-Connect-App/blob/phase2/docs/AuthenticationArchitecture.md).
- DynamoDB Streams:
    - A new method to add data has been implemented using DynamoDB Streams. The details can be found [here](https://github.com/UBC-CIC/Student-Connect-App/blob/dynamodbstreams-aggregation/docs/StreamsAggregationWorkflow.md).
<p></p>

### User Interface/Front-end Changes

- Gender information: 
    - An information statement was added to let users know that providing gender information is optional and can be changed any time.
<p></p>

- Sports
    - Combined the list of men’s and women’s sports into one category.
    - Added the distinction between *Varsity Sports* and *Competitive Club Sports*.
<p></p>

- News, Events, Student life blogs
    - A message has been added when there are no recommendations for the user. This message asks the user to update its preferences and redirects it to the *Recent tab* or designated section's page.

<p></p>

- Copy Edits:
    (items inside the square brackets, i.e.[], have been added; strikethrough text has been removed)
    - Settings > General: Modify my preference settings to get the best out of the recommendation<b>[s]</b>
    - Preference/Profile Survey: Which of the following <b>[areas/departments on campus]</b> would you like to get event recommendations from?  
    - Under News, Events, Student life blogs, etc: “Sorry there are currently no events that match your preference<b>[s]</b>. Please make sure your preferences are up to date.” 
    - News and Blogs page: Explore all <b>[campus]</b> news, sports news and blogs here 
    - Events page: Explore all <b>~~the~~</b> events here 
    - Clubs page: Explore all <b>~~the~~</b> clubs here 
    - Home page: Explore <b>[your]</b> personalized <b>[recommendations]</b> and <b>~~most~~ [recently posted]</b>items here 
<p></p>

### Bug Fixes
> Deployment Guide
- Extend Amplify role to include missing policies after updates in AWS Amplify.
<p></p>

> Front-end
- “Preference” options not updating correctly.
<p></p>
