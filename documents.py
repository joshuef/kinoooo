from mongoengine import *
import datetime

class Venue(EmbeddedDocument):
    name = StringField(required=True)
    geo_location = PointField(required=True)
    place_id = DynamicField(required=True)
    details = DynamicField()
    local_phone_number = DynamicField()
    website = DynamicField()
    url = DynamicField()
    formatted_address = DynamicField()

class Places(Document):
    name = StringField(required=True)
    date_modified = DateTimeField(default=datetime.datetime.now)
    shows = ListField(ReferenceField('Shows'))
    venue = EmbeddedDocumentField(Venue)

class RawShowings(Document):
    place = StringField()
    show = StringField()
    time = DateTimeField()
    orig_flags = StringField()
    processed_flags = ListField()
    updated = DateTimeField()

    meta = {'collection': 'raw_showings'}

class ShowTime(EmbeddedDocument):
    place = ReferenceField(Places)
    time = DateTimeField()
    flags = ListField()

class Shows(Document):
    name = StringField()
    showingAt = ListField(EmbeddedDocumentField(ShowTime))
    updated = DateTimeField()
    metadata = DictField()


