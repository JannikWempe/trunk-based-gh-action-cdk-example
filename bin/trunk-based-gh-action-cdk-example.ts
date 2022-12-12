#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TrunkBasedGhActionCdkExampleStack } from '../lib/trunk-based-gh-action-cdk-example-stack';
import { Environment } from 'aws-cdk-lib';
import { Construct } from 'constructs';

class DeployStage extends cdk.Stage {
  constructor(scope: Construct, id: string, config: { env: Environment }) {
    super(scope, id, config);

    new TrunkBasedGhActionCdkExampleStack(app, 'TrunkBasedGhActionCdkExampleStack', {
      env: config.env,
    });
  }
}

const app = new cdk.App();
new DeployStage(app, 'Dev', {
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
