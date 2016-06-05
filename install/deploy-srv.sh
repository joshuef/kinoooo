

echo "deploying server"
rsync -azP --delete --exclude-from 'srv-exclude-list.txt' ../. fidget@fidget.webfactional.com:webapps/kinos
