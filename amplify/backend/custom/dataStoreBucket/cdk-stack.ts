import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import * as s3 from "@aws-cdk/aws-s3";
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

    const dataStoreBucket = new s3.Bucket(this, "DataStoreBucket", {});

    const dataStoreBucketOutput = new cdk.CfnOutput(
      this,
      "DataStoreBucketOutput",
      {
        value: dataStoreBucket.bucketName,
        description: "DataStoreBucket",
      }
    );
  }
}
