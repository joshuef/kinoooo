from mongoengine import connect
import documents
import os
from googleplaces import GooglePlaces, types, lang

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
        self.google_places = GooglePlaces('AIzaSyDCgLpjJAYt2KhBBW62spcNT5AB9BozLcc')

    def getPlaceList(self):
        return documents.RawShowings.objects.distinct(field='place')

    def createPlace(self, place_name):
        res = self.google_places.text_search(query=place_name)
        place = documents.Places(name=place_name)

        if res.places:
            google_place = res.places[0]
            google_place.get_details()
            print google_place.name.encode('utf-8')
            print google_place.geo_location


            place.venue = documents.Venue(
                name=google_place.name,
                geo_location=google_place.geo_location.values()[::-1],
                place_id=google_place.place_id,
                details=google_place.details,
                local_phone_number=google_place.local_phone_number,
                website=google_place.website,
                url=google_place.url,
                formatted_address=google_place.formatted_address
            )

        place.save()

    def createPlaces(self):
        documents.Places.drop_collection()
        for place in self.getPlaceList():
            self.createPlace(place)

placeMaker = PlaceMaker(db)
placeMaker.createPlaces()
