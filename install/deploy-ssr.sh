echo "deploying ssr"

rsync -azP --delete --exclude-from 'srv-exclude-list.txt' ../frontend0.2/. fidget@fidget.webfactional.com:webapps/kino_ssr
