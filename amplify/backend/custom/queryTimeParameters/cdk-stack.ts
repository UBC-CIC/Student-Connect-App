import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';
import * as ssm from "@aws-cdk/aws-ssm";

export class cdkStack extends cdk.Stack {
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

    const eventsQueryTime = new ssm.StringParameter(this, "eventsQueryTime", {
      stringValue: "2021-05-01 6:07:08",
      type: ssm.ParameterType.STRING,
    });

    const eventsQueryParameterOutput = new cdk.CfnOutput(
      this,
      "eventsQueryParameterOutput",
      {
        value: eventsQueryTime.parameterName,
        description: "eventsQueryTime",
      }
    );

    const newsQueryTime = new ssm.StringParameter(this, "newsQueryTime", {
      stringValue: "2021-05-01 6:07:08",
      type: ssm.ParameterType.STRING,
    });

    const newsQueryParameterOutput = new cdk.CfnOutput(
      this,
      "newsQueryParameterOutput",
      {
        value: newsQueryTime.parameterName,
        description: "newsQueryTime",
      }
    );

    const athleticsNewsQueryTime = new ssm.StringParameter(
      this,
      "athleticsNewsQueryTime",
      {
        stringValue: "2021-05-01 6:07:08",
        type: ssm.ParameterType.STRING,
      }
    );

    const athleticsNewsQueryParameterOutput = new cdk.CfnOutput(
      this,
      "athleticsNewsQueryParameterOutput",
      {
        value: athleticsNewsQueryTime.parameterName,
        description: "athleticsNewsQueryTime",
      }
    );

    const blogsQueryTime = new ssm.StringParameter(this, "blogsQueryTime", {
      stringValue: "2021-05-01 6:07:08",
      type: ssm.ParameterType.STRING,
    });

    const blogsQueryParameterOutput = new cdk.CfnOutput(
      this,
      "blogsQueryParameterOutput",
      {
        value: blogsQueryTime.parameterName,
        description: "blogsQueryTime",
      }
    );
  }
}
