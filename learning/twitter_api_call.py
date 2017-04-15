from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test

consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret

outfile = open('/mnt/tweets_melb3.json','w')

class listener(StreamListener):
    
    def on_status(self,status):
        try:
            print status.text
            # tweet = json.loads(data)
            # print tweet['text']
            # print tweet['']
            # print "\n\n"
        except KeyError:
            print("Tossed it out cause it was trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------trash-------------------------------------------------\n\n")

    def on_error(self,status):
        print status


auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)

twitterAPI=  API(auth, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())
outfile.write('[')
# twitterStream.filter(locations=[144.252215,-38.256574,145.659838,-37.280438])
# for word in small_words.queries:
last_id = 2
loops = 1
for i in range(loops):
    try:
        results = twitterAPI.search(q="",geocode="-37.904199,144.920201,70km", count=100, max_id=str(last_id-1))
        if not results:
            break
        last_id = results['statuses'][-1]['id']
        # print last_id
        if(i!=loops-1):    
            outfile.write(json.dumps(results['statuses'])[1:-1] + ',')
        else:
            outfile.write(json.dumps(results['statuses'])[1:-1])
    except:
        print 'Oops'
        break
outfile.write(']')