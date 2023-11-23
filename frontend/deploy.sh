echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* ubuntu@dhvsu-archives.site:/var/www/dhvsu-archives.site/

echo "Done!"