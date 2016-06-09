

echo "deploying frontend"
rsync -azP --delete --exclude-from 'frontend-exclude-list.txt' ../frontend0.2/dist/ fidget@fidget.webfactional.com:webapps/alpha_theatre
