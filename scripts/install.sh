node -v
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi

echo "\nInstall PNPM"
npm i -g pnpm@9 --no-save
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi

echo "\nInstalling Dependencies"
pnpm i --frozen-lockfile
if [ $? -ne 0 ]; then { echo "\nAborting!!." ; exit 1; } fi

BRANCH="$(git rev-parse HEAD | xargs git name-rev --name-only)"
if [[ "$BRANCH" != "tags/"* ]]; then
  node scripts/rename-docs.js
fi
