export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "studentengagement1e496f75": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "api": {
        "studentengagement": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "custom": {
        "elasticsearch": {
            "ESDomainEndpointOutputNoExport": "string"
        },
        "StudentUserPool": {
            "IdentityPoolOutput": "string",
            "IdentityPoolOutputNoExport": "string",
            "UserPoolOutputNoExport": "string",
            "ESDomainOutput": "string"
        },
        "querytimes": {
            "eventsQueryParameterOutput": "string",
            "newsQueryParameterOutput": "string",
            "athleticsNewsQueryParameterOutput": "string",
            "blogsQueryParameterOutput": "string"
        },
        "dataStoreBucket": {
            "DataStoreBucketOutput": "string"
        }
    },
    "function": {
        "studentengagementfunctionsLayer": {
            "Arn": "string"
        },
        "cognitoUserCreator": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getBlogData": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getAthleticsNewsData": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "documentTableStreamHandler": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getClubData": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getESDocuments": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getEventsData": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "getNewsData": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "fetchAllDocuments": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}