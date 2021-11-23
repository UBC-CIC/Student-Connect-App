# Changelog

## V1.5.0 - 2021-11-XX
### Changes
> Back-end
- CWL integration:
    - SAML (shibboleth) integration using Cognito has been added with instrictions to deploy here.
- DynamoDB Streams:
    - New method of data adding using DynamoDB Streams.
<p></p>

> Front-end /& UI

- Gender information: 
    - Add disclaimer to let users know that gender information is optional and can be changed any time. 
<p></p>

- Sports
    - Remove gender differences in sports.
    - Split sports into Varsity Sports and Competitive Club Sports.
<p></p>

- When there are no recommendations, show a message asking the user to update its preferences and redirect it to the Recent tab or desginated section's page.

<p></p>

- Copy Edits:
    (items inside the square brackets, i.e.[], are added)
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
