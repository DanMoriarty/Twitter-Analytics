#!/usr/bin/env python
#coding: utf-8
#####---------------------------- DESCRIPTION ----------------------------#####

#    Authors:   T. Glennan, T. Lynch, D. Moriarty, S. Spratley, A. White
#    Course:    COMP90024 Cluster and Cloud Computing
#    Project:   Melbourne Twitter analytics
#    Purpose:   Sentiment analysis
#    Modified:  26/04/2017

#####----------------------------   IMPORTS   ----------------------------#####

import re
import cPickle

from string      import punctuation
from nltk.corpus import stopwords
from sklearn.svm import LinearSVC
from sklearn     import metrics
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer

#####----------------------------  CONSTANTS  ----------------------------#####

POS_THRESHOLD = 0.4  #Minimum polarity for positive tweets.
NEG_THRESHOLD = 0.4  #Minimum polarity for positive tweets.
NEU_THRESHOLD = 0.8  #Maximum subjectivity for objective tweets.
POL_CSV       = "tweet_polarity_noRT_nltk_loose.csv"  #Pre-built polarity set.
TWEETS        = "tweets_rebuild.json"           #Tweets for rebuilding POL_CSV.
CLASSIFIER    = "classifier.pkl"                #Pickled classifier model.
STOPWORDS     = set(stopwords.words('english')) #Set of English stopwords.

#####----------------------------  FUNCTIONS  ----------------------------#####

#Function to take an array of items and split it into n-grams.
def makeNGrams(arr, n=2):
    ngrams = []
    for i in range(len(arr)-n+1):
        ngrams.append(arr[i : i+n])
    return ngrams

#Function to pre-process tweets. Removes punctuation and uppercase.
#   Optionally removes stopwords, usernames, URLs, and emoji.
def cleanTweet(s, removeURLs  = True, removeStopwords = False, \
                  removeEmoji = True, removeUsernames = True   ):
    if removeUsernames:
        s = " ".join([w for w in s.split() if w[0] != '@'])
    if removeURLs:
        urlPattern = re.compile(r"(?:https?:\/\/)?[\n\S]+\.\S+(?:\s…)?")
        s = urlPattern.sub(r'', s)
    if removeEmoji: #Remove emojis by ignoring unicode.
        s = s.encode('ascii','ignore').decode('unicode_escape')
        
    #Strip punctuation and uppercase.
    punctPattern = re.compile('[%s]' % re.escape(punctuation))
    s = punctPattern.sub('', s).lower()
    
    if removeStopwords:
        s = " ".join([w for w in s.split() if w not in STOPWORDS])
        
    #Remove any extra whitespace and return.
    return ' '.join(s.split())

#Function to tokenize a list of tweets.
def tokenize(tweets):
    return [ (cleanTweet(t)) for t in tweets ]

#Function to split string arrays into training and test sets, including tweets
#   of positive, negative, and objective/neutral sentiment.
def testTrainSplit(pos, neg, obj, split=0.9):
    #Split sets up at the split mark.
    mark = lambda x: int(len(x)*split)
    sets = lambda x: ( x[ :mark(x)], x[mark(x): ] )
    (posX,posx),(negX,negx),(objX,objx) = sets(pos), sets(neg), sets(obj)
        
    #Combine into full train/test (X,x) sets, and provide sentiment labels.
    train_tweets = posX + negX + objX
    test_tweets  = posx + negx + objx
    train_labels = [1 for i in posX] + [-1 for i in negX] + [0 for i in objX] 
    test_lables  = [1 for i in posx] + [-1 for i in negx] + [0 for i in objx]

    #Return tuple of train and test data.
    return ((train_tweets, train_labels), (test_tweets, test_lables))

#Function to fit a classifier on the training set.
def trainModel(clf, train, test, evaluate=True):
    #Fit model and predict classes.
    model = clf.fit(train[0], train[1])

    #If evaluation is specified, make predictions and print results.
    if evaluate == True:
        pred = model.predict(test[0])
        print(clf)
        print("Accuracy: %.3f" % (metrics.accuracy_score(test[1], pred) * 100))
        print(metrics.classification_report(test[1], pred))
    return model

#Function to vectorize training/test (X,x) data.
def getVects(X, x, nGramMin=1, nGramMax=2, maxFeats=None):
    #Initialize a count vectorizer using total counts.
    vect = CountVectorizer(analyzer="word", ngram_range=(nGramMin, nGramMax),
                           max_features=maxFeats, binary=False)

    #Fit/transform the training data to a vector, and transform test data to match.
    train_vect = vect.fit_transform(X)
    test_vect  = vect.transform(x)
    return (train_vect, test_vect, vect)

#Function to classify a tweet's sentiment, based on the trained model.
def classify(tweet):
    #Preprocess the tweet, and transform into a count vector of the ngram
    #   features the classifier was trained on.
    return m.predict(vect.transform([cleanTweet(tweet)]))[0]


#####----------------------------   PROGRAM   ----------------------------##### 


#To set up the module for use in sentiment classification, try loading the 
#   model's pickle file from disk. If non-existent, rebuild.
#   Create training and test sets using NLTK's sentiment classifier on
#   Melbourne tweets.
try:
    with open(CLASSIFIER, 'rb') as model_file:
        m,vect = cPickle.load(model_file)
except (IOError, cPickle.UnpicklingError) as e:
    print("Error: Unable to read model file. Attempting to rebuild model.")
    
    pos_t = [] #Positive tweets
    neg_t = [] #Negative tweets
    obj_t = [] #Objective/neutral tweets
    
    #Attempt to read in the tweet polarity set from file.
    try:
        with open(POL_CSV, "r") as inf:
            for line in inf:
                #CSV: split on commas.
                l = line.split(",")
    
                #Grab the polarity. The remainder is the tweet.
                polarity = l.pop(0)
                tweet = ",".join(l)            
    
                #Sort tweet into polarity groups.
                if polarity == "1":
                    pos_t.append(tweet)
                elif polarity == "0":
                    obj_t.append(tweet)
                elif polarity == "-1":
                    neg_t.append(tweet)
    
    except IOError:
        print("Error: Unable to locate file '%s'." % POL_CSV)
        print("Attempting to rebuild csv...")
        try:
            cap = 24000
            # Rebuild polarity file using (line-separated) tweet JSON and NLTK.
            with open(TWEETS) as f:
                sid = SentimentIntensityAnalyzer()

                for line in f:
                    try:
                        # Extract text field and skip over re-tweets.
                        t = re.search(r"\"text\":\s\"(.*?)\",\s\"is_quote_status\"", line).group(1)
                        if t[:2] == "RT":
                            continue

                        # Use NLTK for ground truth labelling
                        ss = sid.polarity_scores(t)

                        # Sort tweet into positive/neutral/negative
                        if ss["pos"] >= POS_THRESHOLD and len(pos_t) < cap:
                            pos_t.append(t)
                        elif ss["neg"] >= NEG_THRESHOLD and len(neg_t) < cap:
                            neg_t.append(t)
                        elif ss["neu"] >= NEU_THRESHOLD and len(obj_t) < cap:
                            obj_t.append(t)

    
                        # Stop when each group of tweets is full
                        if len(pos_t) >= cap and len(neg_t) >= cap and len(obj_t) >= cap:
                            break 
    
                    except AttributeError:
                        pass
            # Output to file
            with open(POL_CSV, "w") as o:
                for tweet in pos_t:
                    o.write("1,"  + tweet + "\n")
                for tweet in neg_t:
                    o.write("-1," + tweet + "\n")
                for tweet in obj_t:
                    o.write("0,"  + tweet + "\n")
        except IOError:
            print("Fatal Error: Unable to locate tweet json. Exiting.")
            exit()
    
    print len(pos_t), len(neg_t), len(obj_t)
    #Initialise train (X,Y) and test (x,y) data and labels, and vectorize.
    (X,Y), (x,y) = testTrainSplit(tokenize(pos_t), tokenize(neg_t), tokenize(obj_t))
    X,x,vect = getVects(X, x)
    
    #Train the linear SVC model used for sentiment analysis.
    m = trainModel(LinearSVC(loss='squared_hinge', penalty='l2', tol=1e-4), (X,Y), (x,y))

    #Pickle the model and vectorizer to disk.
    with open(CLASSIFIER, 'wb') as model_file:
        cPickle.dump((m, vect), model_file)
    

#####----------------------------  END  FILE  ----------------------------#####