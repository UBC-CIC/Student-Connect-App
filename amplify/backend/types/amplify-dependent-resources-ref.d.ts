export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "studentengagement1e496f75": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "studentengagement": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "custom": {
        "StudentUserPool": {
            "IdentityPoolOutput": "string",
            "UserPoolOutput": "string"
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
        "documentStreamHandler": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}