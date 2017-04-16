from tweepy import Stream
from tweepy import API
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import tweepy
import json
import re
import test
import couchdb

couch = couchdb.Server()
try:
    couch = couchdb.Server() # assuming localhost
    db = couch['melbtweets1']
except:
    db = couch.create('melbtweets1')



consumer_key=test.consumer_key
consumer_secret=test.consumer_secret
access_token=test.access_token
access_token_secret=test.access_token_secret

# outfile = open('/mnt/tweets_melb100000.json','w')

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
# outfile.write('[')
# twitterStream.filter(locations=[144.252215,-38.256574,145.659838,-37.280438])
# for word in small_words.queries:
last_id = 2
loops = 1
for i in range(loops):
    # try:
    results = twitterAPI.search(q="",geocode="-37.904199,144.920201,70km", count=1, max_id=str(last_id-1))
    if not results:
        break
    last_id = results['statuses'][-1]['id']
    # print last_id
    # if(i!=loops-1):    
        # outfile.write(json.dumps(results['statuses'])[1:-1] + ',')
    # else:
        # outfile.write(json.dumps(results['statuses'])[1:-1])
    # outfile.write(json.dumps(results['statuses'])[1:-1])
    print 'hi'
    doc = json.dumps(results['statuses'])[1:-1]
    print doc
    
    # try saving the tweet
    # doesnt work, says TypeError: string indices must be integers, not str
    db.save(doc)

    # try saving simple json
    # works
    # db.save({'type': 'Person', 'name': 'John Doe'})

    # try saving the json of the tweet
    # doesnt work, says NameError: name 'null' is not defined
    # db.save({"contributors": null, "truncated": false, "text": "Last minute changes to the rules of the game to allow electoral fraud! Erdogan cannot allow a NO vote https://t.co/sNW4RVX9MU", "is_quote_status": true, "in_reply_to_status_id": null, "id": 853618329029824512, "favorite_count": 0, "entities": {"symbols": [], "user_mentions": [], "hashtags": [], "urls": [{"url": "https://t.co/sNW4RVX9MU", "indices": [102, 125], "expanded_url": "https://twitter.com/nblaser18/status/853617437102755841", "display_url": "twitter.com/nblaser18/stat\u2026"}]}, "quoted_status_id": 853617437102755841, "retweeted": false, "coordinates": null, "quoted_status": {"contributors": null, "truncated": false, "text": "Turkey's Electoral Board reportedly makes a last-minute ruling that ballots unsealed by local clerks are still valid https://t.co/B0I39vk0iw", "is_quote_status": false, "in_reply_to_status_id": null, "id": 853617437102755841, "favorite_count": 0, "entities": {"symbols": [], "user_mentions": [], "hashtags": [], "urls": [{"url": "https://t.co/B0I39vk0iw", "indices": [117, 140], "expanded_url": "http://www.birgun.net/haber-detay/ysk-den-skandal-karar-muhursuz-pusula-ve-zarflar-gecerli-155669.html", "display_url": "birgun.net/haber-detay/ys\u2026"}]}, "retweeted": false, "coordinates": null, "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>", "in_reply_to_screen_name": null, "in_reply_to_user_id": null, "retweet_count": 4, "id_str": "853617437102755841", "favorited": false, "user": {"follow_request_sent": false, "has_extended_profile": false, "profile_use_background_image": true, "default_profile_image": false, "id": 555325997, "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/856692163/b46579a0ef6eeedc3670900e69974e66.jpeg", "verified": false, "translator_type": "none", "profile_text_color": "333333", "profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000078868716/7392a1e65c25f757ba288d1f93e08a0a_normal.jpeg", "profile_sidebar_fill_color": "DDEEF6", "entities": {"description": {"urls": []}}, "followers_count": 7044, "profile_sidebar_border_color": "FFFFFF", "id_str": "555325997", "profile_background_color": "C0DEED", "listed_count": 367, "is_translation_enabled": false, "utc_offset": 10800, "statuses_count": 4125, "description": "Istanbul-obsessed journalist. Bylines for @theAtlantic @AJEnglish @ForeignPolicy @CSMonitor @NewsweekEurope @P24Punto24", "friends_count": 1308, "location": "Istanbul", "profile_link_color": "0084B4", "profile_image_url": "http://pbs.twimg.com/profile_images/378800000078868716/7392a1e65c25f757ba288d1f93e08a0a_normal.jpeg", "following": false, "geo_enabled": false, "profile_banner_url": "https://pbs.twimg.com/profile_banners/555325997/1367659914", "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/856692163/b46579a0ef6eeedc3670900e69974e66.jpeg", "screen_name": "nblaser18", "lang": "en", "profile_background_tile": true, "favourites_count": 2026, "name": "Noah Blaser", "notifications": false, "url": null, "created_at": "Mon Apr 16 18:30:52 +0000 2012", "contributors_enabled": false, "time_zone": "Istanbul", "protected": false, "default_profile": false, "is_translator": false}, "geo": null, "in_reply_to_user_id_str": null, "possibly_sensitive": false, "lang": "en", "created_at": "Sun Apr 16 14:33:51 +0000 2017", "in_reply_to_status_id_str": null, "place": null, "metadata": {"iso_language_code": "en", "result_type": "recent"}}, "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>", "in_reply_to_screen_name": null, "in_reply_to_user_id": null, "retweet_count": 0, "id_str": "853618329029824512", "favorited": false, "user": {"follow_request_sent": false, "has_extended_profile": false, "profile_use_background_image": true, "default_profile_image": false, "id": 201669414, "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png", "verified": true, "translator_type": "none", "profile_text_color": "333333", "profile_image_url_https": "https://pbs.twimg.com/profile_images/826278680296988673/q5caIE2m_normal.jpg", "profile_sidebar_fill_color": "DDEEF6", "entities": {"url": {"urls": [{"url": "https://t.co/DCznJiI3Sq", "indices": [0, 23], "expanded_url": "http://www.amazon.com/Ihsan-Yilmaz/e/B001KHHY88", "display_url": "amazon.com/Ihsan-Yilmaz/e\u2026"}]}, "description": {"urls": []}}, "followers_count": 193469, "profile_sidebar_border_color": "C0DEED", "id_str": "201669414", "profile_background_color": "C0DEED", "listed_count": 616, "is_translation_enabled": false, "utc_offset": 10800, "statuses_count": 30353, "description": "Professor of Islamic Studies, Alfred Deakin Institute for Globalisation and Citizenship, Deakin Uni. Tweeting in personal capacity. Critical thinking Ya Hu!", "friends_count": 361, "location": "Melbourne, Victoria, Australia", "profile_link_color": "1DA1F2", "profile_image_url": "http://pbs.twimg.com/profile_images/826278680296988673/q5caIE2m_normal.jpg", "following": false, "geo_enabled": true, "profile_banner_url": "https://pbs.twimg.com/profile_banners/201669414/1475945257", "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png", "screen_name": "ihsanylmz", "lang": "en", "profile_background_tile": false, "favourites_count": 3713, "name": "Ihsan Yilmaz", "notifications": false, "url": "https://t.co/DCznJiI3Sq", "created_at": "Tue Oct 12 11:00:57 +0000 2010", "contributors_enabled": false, "time_zone": "Istanbul", "protected": false, "default_profile": true, "is_translator": false}, "geo": null, "in_reply_to_user_id_str": null, "possibly_sensitive": false, "lang": "en", "created_at": "Sun Apr 16 14:37:23 +0000 2017", "quoted_status_id_str": "853617437102755841", "in_reply_to_status_id_str": null, "place": null, "metadata": {"iso_language_code": "en", "result_type": "recent"}})




    # except:
        # print 'Oops'
        # break


# outfile.write(']')
