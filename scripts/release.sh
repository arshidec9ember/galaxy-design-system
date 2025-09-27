#!/bin/bash

# Prompt for commit message this might be useful in future for getting input
# read -p "Enter your commit message: " commit_message
# if [ -z "$commit_message" ]; then
#   echo "Please provide a commit message."
#   exit 1
# fi

# Get the current branch
branch=$(git branch --show-current)

# Create a changeset
# This is not required this will be done by the user while raising PR
# pnpm changeset

# check changeset status
pnpm changeset status --since=$branch

# check changeset is present or not
if [ $? -eq 0 ]
then
  echo "✅ Changeset is present"
else
  echo "❌ Changeset is not present"
  exit 1
fi

# Create a version of packages
echo "🔄 Creating version of packages"
pnpm changeset version

# get version from packages/components/package.json
version=$(grep -E '"version":' packages/components/package.json | sed -E 's/.*"version": "([^"]+)",/\1/')

# print the updated version of @zeta-gds/components
echo "✨ Updated version of @zeta-gds/components is $version"

# Build the packages
echo "🔨 Building the packages"
pnpm run build --force

# run pnpm build and check build is failed or not
if [ $? -eq 0 ]
then
  echo "✅ Build is successful"
else
  echo "❌ Build is failed"
  exit 1
fi

# Add the bumped version and commit in git
echo "➕ Adding the bumped version and changelog in git"
git add .

# Generate the commit message for the release
commit_message="chore(release): published $version"

# Commit the changes
echo "📝 Committing the changes"
git commit -m "$commit_message"

# Login to verdaccio
echo "🔑 Logging in to verdaccio"
pnpm login --registry='https://verdaccio.internal.olympus-world.zetaapps.in'

# if login failed then exit
if [ $? -eq 0 ]
then
  echo "✅ Login is successful"
else
  echo "❌ Login is failed"
  exit 1
fi

# Publish the packages
echo "🚀 Publishing the packages"
pnpm changeset publish

# Push the changes to git
echo "📤 Pushing the changes to git"
git push origin $branch

# Push the changes
echo "📤 Pushing the changes to git"
git push --follow-tags

echo "✅ Release is successful"
