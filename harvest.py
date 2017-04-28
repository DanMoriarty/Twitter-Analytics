from tweepy import API
from tweepy import OAuthHandler
import tweepy
import json
import credentials1
import credentials2
import couchdb
import time

# couch = couchdb.Server('http://115.146.93.56:8888')
# db = couch['melbtweets2']

consumer_key1=credentials1.consumer_key
consumer_secret1=credentials1.consumer_secret
access_token1=credentials1.access_token
access_token_secret1=credentials1.access_token_secret

consumer_key2=credentials2.consumer_key
consumer_secret2=credentials2.consumer_secret
access_token2=credentials2.access_token
access_token_secret2=credentials2.access_token_secret

auth1=OAuthHandler(consumer_key1,consumer_secret1)
auth1.set_access_token(access_token1,access_token_secret1)

auth2=OAuthHandler(consumer_key2,consumer_secret2)
auth2.set_access_token(access_token2,access_token_secret2)

twitterAPI1 =  API(auth1, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())
twitterAPI2 =  API(auth2, wait_on_rate_limit_notify=True , wait_on_rate_limit=True, parser=tweepy.parsers.JSONParser())

twitterAPI = twitterAPI1

def insert_tweet(tweet):
    if tweet['id_str'] in db:
        print('Duplicate ignored')
    else:
        if tweet['coordinates']:
            entry = dict(tweet)
            del entry['id']
            del entry['id_str']
            db[tweet['id_str']] = entry

# oldest_id = float('inf')
newest_id = 0
while(1):
    try:
        results = twitterAPI.search(q="",geocode="-37.904199,144.920201,70km", count=100, since_id=str(newest_id+1))
        if not results:
            print('No results received. Waiting a lil bit.')
            time.sleep(20)
            continue
        newest_id = results['statuses'][0]['id']
        for tweet in results['statuses']:
            # insert_tweet(tweet)
            # print tweet['text']
            # print tweet['user']['screen_name']
            # print tweet['coordinates']
            if tweet['coordinates']:
                last_tweet_t = 0
                print('REQUESTNG TIMELINE --------------------------')
                for j in range(16):
                    if last_tweet_t == 0:
                        timeline = twitterAPI.user_timeline(id=tweet['user']['id_str'], count=200)
                    else:
                        timeline = twitterAPI.user_timeline(id=tweet['user']['id_str'], count=200, max_id=str(last_tweet_t-1))
                    # print timeline
                    last_tweet_t = timeline[-1]['id']
                    if not timeline:
                        break
                    for timeline_tweet in timeline:
                        # insert_tweet(timeline_tweet)
                        print timeline_tweet['text']
                        print timeline_tweet['user']['screen_name']
                        print timeline_tweet['coordinates']
        if twitterAPI.rate_limit_status() == 1:
            if twitterAPI == twitterAPI1:
                twitterAPI = twitterAPI2
            else:
                twitterAPI = twitterAPI1
    except:
        print "Didn't get any results, let's wait a while"
        time.sleep(20)
        continue
# outfile.write(']')