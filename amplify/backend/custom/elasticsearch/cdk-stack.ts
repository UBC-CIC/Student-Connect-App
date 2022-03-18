import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import * as es from "@aws-cdk/aws-elasticsearch";
import * as cloudformation from "@aws-cdk/aws-cloudformation";
import * as iam from "@aws-cdk/aws-iam";
import * as ec2 from "@aws-cdk/aws-ec2";
import path from "path";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import { ManagedPolicy } from "@aws-cdk/aws-iam";
import { Aws } from "@aws-cdk/core";
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';

declare const customResourceProvider: cloudformation.CfnCustomResourceProps;

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

    const parentStackName = new cdk.CfnParameter(this, "ParentStackName", {
      type: "String",
      description:
        "The name of the amplify stack that this stack is a child of",
    });

    const dependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [{ category: "custom", resourceName: "StudentUserPool" }]
      );

    const esCognitoAccessRole = new iam.Role(this, "ESCognitoAccessRole", {
      assumedBy: new iam.ServicePrincipal("es.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromManagedPolicyArn(
          this,
          "ESCognitoAccessPolicy",
          "arn:aws:iam::aws:policy/AmazonESCognitoAccess"
        ),
      ],
    });
    const stackName = cdk.Stack.of(this).stackName;
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const projectName = amplifyProjectInfo.projectName;
    const env = amplifyProjectInfo.envName;
    const esDomainName = `${projectName.substring(0, 10).toLowerCase()}-es-idx`;
    const region = cdk.Stack.of(this).region;

    const esDomain = new es.Domain(this, "ESDomain", {
      version: es.ElasticsearchVersion.V7_1,
      cognitoKibanaAuth: {
        identityPoolId: cdk.Fn.ref(
          dependencies.custom.StudentUserPool.IdentityPoolOutputNoExport
        ),
        userPoolId: cdk.Fn.ref(
          dependencies.custom.StudentUserPool.UserPoolOutputNoExport
        ),
        role: esCognitoAccessRole,
      },
      domainName: esDomainName,
      ebs: {
        enabled: true,
        volumeSize: 10,
        volumeType: ec2.EbsDeviceVolumeType.GP2,
      },
      advancedOptions: {
        "indices.fielddata.cache.size": "",
        "rest.action.multi.allow_explicit_index": "true",
      },
      capacity: {
        dataNodeInstanceType: "t2.small.elasticsearch",
        dataNodes: 2,
      },
      zoneAwareness: {
        enabled: true,
      },
    });

    const esDomainEndpointOutputNoExport = new cdk.CfnOutput(
      this,
      "ESDomainEndpointOutputNoExport",
      {
        value: esDomain.domainEndpoint,
        description: "Elasticsearch Domain Endpoint",
      }
    );
  }
}
