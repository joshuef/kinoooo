# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from time import strftime

def serialize_time(time):
    return strftime("%a, %d %b %Y %H:%M:%S", time)

class KinoItem(scrapy.Item):
    place = scrapy.Field()
    show = scrapy.Field()
    time = scrapy.Field()
    orig_flags = scrapy.Field()
    processed_flags = scrapy.Field()
    updated = scrapy.Field()
