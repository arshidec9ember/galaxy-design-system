echo "\nBuilding all packages"
pnpm run build --force
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi


echo "\nPack all npm packages"
pnpm run pack-it
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi

echo "\nMove assets to output directory"
PACKAGE_TARBALLS=$(ls | grep zeta-gds)
OUTPUT_DIR=dist
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR
cp -rf ./apps/docs/dist/** $OUTPUT_DIR

mv $PACKAGE_TARBALLS $OUTPUT_DIR
mv packages/components/html-report $OUTPUT_DIR/report

echo "\nPack all icons package"
npm pack @zeta/icons
mv zeta-icons*.tgz $OUTPUT_DIR

find $OUTPUT_DIR
