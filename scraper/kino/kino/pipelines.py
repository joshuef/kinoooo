# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo
import re

from scrapy.conf import settings
from scrapy.exceptions import DropItem
from scrapy import log

from time import mktime
from datetime import datetime

class KinoPipeline(object):
    prog = re.compile(ur'(\(\w+\)|\ 3D)')

    def process_item(self, item, spider):
        result = self.prog.search(item['show'])
        if result is not None:
            flags = result.group(1).lower()
            item['orig_flags'] = flags
            item['processed_flags'] = []
            possibilities = ['3d', 'omu', 'ov']
            for pos in possibilities:
                if pos in flags.lower():
                    item['processed_flags'].append(pos)
            item['show'] = re.sub(ur'(\(\w+\)|\ 3D)', '', item['show']).strip()
        item['time'] = datetime.fromtimestamp(mktime(item['time']))
        if 'freiluft' in item['place'].lower():
            item['processed_flags'].append('fl')
        item['updated'] = datetime.utcnow()
        return item

class MongoDBPipeline(object):

    def __init__(self):
        connection = pymongo.MongoClient(
            settings['MONGODB_SERVER'],
            settings['MONGODB_PORT']
        )
        db = connection[settings['MONGODB_DB']]
        db.authenticate(
            settings['MONGODB_USER'],
            settings['MONGODB_PASS']
        )
        self.collection = db[settings['MONGODB_COLLECTION']]
        self.collection.drop()
        self.collection.ensure_index('place')
        self.collection.ensure_index('show')

    def process_item(self, item, spider):
        self.collection.insert(dict(item))
        log.msg("Item added to DB.",
                level=log.DEBUG, spider=spider)
        return item
