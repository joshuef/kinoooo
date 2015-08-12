from mongoengine import *
import datetime

class Places(Document):
    name = StringField(required=True)
    date_modified = DateTimeField(default=datetime.datetime.now)
    shows = ListField()
    venue = DictField()

class RawShowings(Document):
    place = StringField()
    show = StringField()
    time = DateTimeField()
    orig_flags = StringField()
    processed_flags = ListField()
    updated = DateTimeField()

    meta = {'collection': 'raw_showings'}

class Shows(Document):
    name = StringField()
    showingAt = ListField()
    updated = DateTimeField()

class ShowTime(EmbeddedDocument):
    place = ReferenceField(Places)
    time = DateTimeField()
    flags = ListField()
