# -*- coding: utf-8 -*-
import scrapy
import urlparse
from kino.items import KinoItem
from time import strptime, strftime
import locale

locale.setlocale(locale.LC_ALL, 'de_DE.utf8')

class BerlinSpider(scrapy.Spider):
    name = "berlin"
    allowed_domains = ["berlin.de"]
    start_urls = (
        'http://www.berlin.de/kino/_bin/trefferliste.php',
    )

    def parse(self, response):
        parsed_url = urlparse.urlparse(response.url)
        query_params = urlparse.parse_qs(parsed_url.query)
        if 'startat' in query_params:
            count = int(query_params['startat'][0])
        else:
            count = 0

        for sel in response.xpath('//*[@id="bo_mainbar"]/div[@class="searchresult"]/*'):
            if 'h2' in sel.extract():
                place = sel.xpath('.//text()').extract()
                place = place[0].encode('utf-8') + ' ' + place[2].encode('utf-8')
                continue
            if 'h3' in sel.extract():
                show = sel.xpath('.//text()').extract()[0].encode('utf-8')
                continue
            if 'table' in sel.extract():
                for row in sel.xpath('.//tr'):
                    date = row.xpath('.//td[@class="datum"]/text()').extract()[0].encode('utf-8')
                    time = row.xpath('.//td[@class="uhrzeit"]/text()').extract()[0].encode('utf-8')
                    times = [x.strip() for x in time.split(',')]
                    for time in times:
                        item = KinoItem()
                        item['place'] = place
                        item['show'] = show
                        item['time'] = strptime(date + time, '%a, %d.%m.%y %H:%M')
                        yield item
                    count = count + 1
                    continue
        yield scrapy.Request(self.start_urls[0] + '/?startat=' + str(count), callback = self.parse)
