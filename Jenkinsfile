@Library("ci@master") _

NodeAppPublish(
  nodeVersion: '20.9.0',
  compileScriptPath: 'scripts/compile-docs.sh',
  installScriptPath: 'scripts/install.sh',
  buildFolder: 'dist',
  packageJsonPath: 'apps/docs/package.json',
  unitTestsScriptPath: 'scripts/test.sh',
  publishElenchosArtifacts: true,
  disablePushToJfrog: true,
  enableCodeSonarUTRun: true,
  timeout: 30,
  bucketsToPush: [
    'aws:31051:zetaapps-artifacts',
    'aws:31051:zetaapps-artifact-lon1',
    'aws:65913:zeta-aws-use2-common-prod-nonpci-fe-infra'
  ]
)
