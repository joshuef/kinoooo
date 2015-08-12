from mongoengine import connect
import documents
import os

db = {};
db['user'] = os.environ['MONGODB_USER']
db['pass'] = os.environ['MONGODB_PASS']

class PlaceMaker(object):

    def __init__(self, db):
        connect(
            'playplay',
            host="ds062797.mongolab.com",
            port=62797,
            username=db['user'],
            password=db['pass']
        )

    def getPlaceList(self):
        return documents.RawShowings.objects.distinct(field='place')

    def createPlace(self, place_name):
        place = documents.Places(name=place_name)
        place.save()

    def createPlaces(self):
        documents.Places.drop_collection()
        for place in self.getPlaceList():
            self.createPlace(place)

placeMaker = PlaceMaker(db)
placeMaker.createPlaces()
