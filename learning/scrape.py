import tweepy

consumer_key = "vCN6JftzMrTsrOVIYgCla2pF8"
consumer_secret = "EbEj5mynzuji8s47YUhzsgUAAc2OAPcx1jhbdIVsNTDOaIcfzo"
access_token = "853118607907094532-CZEzZFhM61yr1mQkmDE0ZQ5x91JLZp1"
access_token_secret = "1k5yJf8F8UWX8CmF6VctDw61bLVNdD4T7mAIwZmgZ7DPv"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

public_tweets = api.home_timeline()
for tweet in public_tweets:
    print tweet.text