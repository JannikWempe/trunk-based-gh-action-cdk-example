#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { TrunkBasedGhActionCdkExampleStack } from '../lib/trunk-based-gh-action-cdk-example-stack';


interface DeployStageProps extends cdk.StageProps {}

class DeployStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: DeployStageProps) {
    super(scope, id, props);

    new TrunkBasedGhActionCdkExampleStack(app, `${id}ExampleStack`, {
      env: props.env,
    });
  }
}

const app = new cdk.App();

new DeployStage(app, 'Staging', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
});

new DeployStage(app, 'Prod', {
  // this should usually be a different account
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  }
});

app.synth();