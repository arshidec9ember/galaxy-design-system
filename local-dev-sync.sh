ni && nr build

TARGET_PROJECT_NODE_MODULES=/Users/vishwajeet.k/Workspace/Projects/vue-3-gds-webpack/node_modules/@zeta-gds/components

rm -rf $TARGET_PROJECT_NODE_MODULES/es/**
cp -vR ./packages/components/es/ $TARGET_PROJECT_NODE_MODULES/es/

rm -rf $TARGET_PROJECT_NODE_MODULES/lib/**
cp -vR ./packages/components/lib/ $TARGET_PROJECT_NODE_MODULES/lib/