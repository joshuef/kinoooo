from mongoengine import connect
import documents
import os
import omdb

db = {};
db['user'] = os.environ['MONGODB_USER']
db['pass'] = os.environ['MONGODB_PASS']

class ShowMaker(object):

    def __init__(self, db):
        connect(
            'playplay',
            host="ds062797.mongolab.com",
            port=62797,
            username=db['user'],
            password=db['pass']
        )

    def getShowList(self):
        return documents.RawShowings.objects.distinct(field='show')

    def createShow(self, show_name, places):
        show = documents.Shows(name=show_name)

        places_to_save = []
        showings = documents.RawShowings.objects(show=show_name)
        for showing in showings:
            place = self.getPlaceByName(places, showing.place)
            show_time = documents.ShowTime(
                place=place,
                time=showing.time,
                flags=showing.processed_flags
            )
            show.showingAt.append(show_time)
            if show not in place.shows:
                place.shows.append(show)
                places_to_save.append(place)
        show.metadata = omdb.title(show_name)
        show.save()
        for place in places_to_save:
            place.save()

    def createShows(self):
        documents.Shows.drop_collection()
        places = documents.Places.objects();
        for place in places:
            place.shows = []
            place.save()
        for show in self.getShowList():
            self.createShow(show, places)
            print show.encode('utf-8') + ' created'

    def getPlaceByName(self, places, name):
        for place in places:
            if name == place.name:
                return place
        raise Exception('No place with name ' + name)

showMaker = ShowMaker(db)
showMaker.createShows()
