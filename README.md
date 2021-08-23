# Student Engagement Application

**NOTE: This branch contains an updated version of the backend's data aggregation process. While the backend will deploy
and run successfully, it will not work fully with the frontend. More details of the change can be found [here](./docs/StreamsAggregationWorkflow.md).**

## Project Overview
This prototype provides a centralised data aggregation and recommendation platform of relevant events, clubs 
and articles for students according to their interests. Hence, it allows students to be more engaged and connected to
their university by finding activities that are relevant to them.

Users sign up using a secured login through [Amazon Cognito](https://aws.amazon.com/cognito/) into a [ReactJS](https://reactjs.org/) 
Progressive Web Application hosted via [AWS Amplify](https://aws.amazon.com/amplify/) (through desktop or mobile) and 
answer a one-time survey to identify their interests as category tags.

The backend uses [AWS Lambda](https://aws.amazon.com/lambda/) functions to get data from various categorised data 
sources, and persist them into: 
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - for viewing all content from a certain data source
* [Amazon Elasticsearch Service](https://aws.amazon.com/elasticsearch-service/) - to query specific documents
from using the interests students marked as their subscribed category tags.

## Table of Contents

|Index| Description|
|:----------------|:-----------|
| [High Level Architecture](#high-level-architecture)        |    Examine the application architecture. |
| [Application Screenshots](#application-screenshots)         |    Check out the application's user interface. |
| [Stack Details](#stack-details)         |    Learn more about each stack of the application |
| [Deployment](#deployment)         |    Learn how to deploy this project yourself. |
| [Credits](#credits)         |    Meet the team behind this |
| [License](#license)      |     License details.     |


## High Level Architecture
![alt text](docs/ArchitectureDiagram.png)
<h6 align="center">Architecture Diagram</h6>

## Application Screenshots

![login page](./docs/LoginPage.png)
<h6 align="center">Application Login Page</h6>


![survey page](./docs/SurveyPage.png)
<h6 align="center">First time users complete a survey to identify their interests</h6>


![home page](./docs/HomePage.png)
<h6 align="center">Different types of content recommended to them based on interests</h6>

## Stack Details
* [Authentication](./docs/AuthenticationArchitecture.md)
* [Frontend User Interface](./docs/FrontendArchitecture.md)
* [Backend Data Aggregation](./docs/DataAggregationArchitecture.md)


## Deployment
To deploy this solution into your AWS Account please follow our [Deployment Guide](docs/DeploymentGuide.md)


## Changelog
- [X] Phase 1 Simple data aggregation and content-tag based recommendation
- [ ] Phase 2 Content recommendation based on user data

## Credits
This prototype was architected and developed by Edward Chen and Neelim Novo, with guidance from the [UBC CIC](https://cic.ubc.ca/)
technical and project management teams.

## License
This project is distributed under the [MIT License](./LICENSE).