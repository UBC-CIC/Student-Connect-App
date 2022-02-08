import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import * as cognito from "@aws-cdk/aws-cognito";
import * as iam from "@aws-cdk/aws-iam";
export class cdkStack extends cdk.Stack {
  public identityPoolId: string;
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });

    const stackName = cdk.Stack.of(this).stackName;
    const region = cdk.Stack.of(this).region;
    const accountId = cdk.Stack.of(this).account;
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const cognitoResourcePrefix = `cognito-${amplifyProjectInfo.projectName}-${amplifyProjectInfo.envName}`;

    const studentUserPool = new cognito.CfnUserPool(this, "CognitoUserPool", {
      adminCreateUserConfig: {
        allowAdminCreateUserOnly: false,
        inviteMessageTemplate: {
          emailMessage:
            "Welcome to the Student Engagement App. Username: {username} Pwd: {####}",
          emailSubject: "Welcome to the Student Engagement App.",
          smsMessage:
            "Welcome to the Student Engagement App. Username: {username} Pwd: {####}",
        },
        unusedAccountValidityDays: 14,
      },
      aliasAttributes: ["email"],
      autoVerifiedAttributes: ["email"],
      emailVerificationMessage:
        "Welcome to the Student Engagement App. Here is your confirmation code: {####}",
      emailVerificationSubject:
        "The Student Engagement App Email Confirmation Code",
      policies: {
        passwordPolicy: {
          minimumLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireSymbols: true,
          requireNumbers: true,
        },
      },
      userPoolName: `${cognitoResourcePrefix}-kibana-users`,
    });

    const studentAppClient = new cognito.CfnUserPoolClient(
      this,
      "CognitoUserPoolClient",
      {
        clientName: `${cognitoResourcePrefix}-appclient`,
        generateSecret: false,
        refreshTokenValidity: 2,
        userPoolId: studentUserPool.ref,
      }
    );
    const studentIdentityPool = new cognito.CfnIdentityPool(
      this,
      "CognitoIdentityPool",
      {
        allowUnauthenticatedIdentities: true,
        cognitoIdentityProviders: [
          {
            clientId: studentAppClient.ref,
            providerName: `cognito-idp.${region}.amazonaws.com/${studentUserPool.ref}`,
            serverSideTokenCheck: false,
          },
        ],
      }
    );
    this.identityPoolId = studentIdentityPool.ref;
    const studentUserPoolDomain = new cognito.CfnUserPoolDomain(
      this,
      "CognitoUserPoolDomain",
      {
        userPoolId: studentUserPool.ref,
        domain: `kibana-${stackName.toLowerCase()}-${region}-${
          cdk.Stack.of(this).account
        }`,
      }
    );

    const cognitoAuthRole = new iam.CfnRole(this, "CognitoAuthRole", {
      assumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: {
          Effect: "Allow",
          Principal: { Federated: "cognito-identity.amazonaws.com" },
          Action: ["sts:AssumeRoleWithWebIdentity"],
          Condition: {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": studentIdentityPool.ref,
            },
          },
        },
      },
    });

    const identityPoolOutput = new cdk.CfnOutput(this, "IdentityPoolOutput", {
      description: "Identity Pool Id",
      value: studentIdentityPool.ref,
    });

    const userPoolOutput = new cdk.CfnOutput(this, "UserPoolOutput", {
      description: "User Pool Id",
      value: studentUserPool.ref,
    });
  }
}
