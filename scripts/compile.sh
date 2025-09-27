echo "\nBuilding all packages"
pnpm run build --force
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi
