from mongoengine import connect
import documents
import os

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

    def createShow(self, show_name):
        show = documents.Shows(name=show_name)
        showings = documents.RawShowings.objects(show=show_name)
        for showing in showings:
            place = documents.Places.objects.get(name=showing.place)
            show_time = documents.ShowTime(
                place=place,
                time=showing.time,
                flags=showing.processed_flags
            )
            show.showingAt.append(show_time)
        show.save()

    def createShows(self):
        documents.Shows.drop_collection()
        for show in self.getShowList():
            self.createShow(show)

showMaker = ShowMaker(db)
showMaker.createShows()
