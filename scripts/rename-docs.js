const { execSync } = require('child_process')
const pkg = require('../apps/docs/package.json')
const fs = require('fs')
const path = require('path')
const kebabCase = require('lodash.kebabcase')

const branchName = execSync(
  'git rev-parse HEAD | xargs git name-rev --name-only'
)
  .toLocaleString()
  .replace('\n', '')
  .replace('remotes/', '')
  .replace('tags/', '')
  .replace('heads/', '')
  .replace('origin/', '')
  .replace('refs/', '')

const appPackage = path.join(__dirname, '..', 'apps/docs/package.json')

/**
 * Change the version of the docs package to the branch name
 * 0.0.0 is required for the version to be valid
 * why ?
 * because domain point to specific version of the docs
 * this will help us to not to deployed again and again.
 */
const newPkg = {
  ...pkg,
  version: `0.0.0-${kebabCase(branchName)}`
}
console.log(`Branch Name: ${branchName}`)
console.log(`Updated Version: ${newPkg.version}`)
fs.writeFileSync(appPackage, JSON.stringify(newPkg, null, 2))
