import json
import test
import couchdb

consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret


couch = couchdb.Server()
try:
    couch = couchdb.Server() # assuming localhost
    db = couch['melbtweets1']
except:
    db = couch.create('melbtweets2')


# try:
#   self.server = couchdb.Server(url=url)
#   self.db = self.server.create(dbname)
#   self._create_views()
# except couchdb.http.PreconditionFailed:
#   self.db = self.server[dbname]