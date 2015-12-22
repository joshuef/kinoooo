

echo "deploying frontend"
rsync -azP --delete --exclude-from 'frontend-exclude-list.txt' ../dist/ fidget@fidget.webfactional.com:webapps/alpha_theatre
