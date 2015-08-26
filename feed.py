import feedparser

f_url = 'http://feeds.bbci.co.uk/news/system/latest_published_content/rss.xml'
feed = feedparser.parse(f_url)

print(feed)
