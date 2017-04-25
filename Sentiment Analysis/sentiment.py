#!/usr/bin/env python
# coding: utf-8 

# ----------------------------------------- #
# COMP90024: Cluster and Cloud Computing    # 
# Assignment 2: Sentiment Analysis Module 	#
#                                           #
# Last Modified: 25/04/2017                 #
# ----------------------------------------- #

import re
import json
import numpy as np

from textblob import TextBlob
from string import punctuation
from nltk.corpus import stopwords
from nltk.corpus import twitter_samples
from nltk.sentiment.util import mark_negation
from nltk.sentiment.vader import SentimentIntensityAnalyzer

from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB, BernoulliNB
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

polarityThreshold = 0.5 	# Minimum polarity for positive tweets
subjectivityThreshold = 0.2 # Maximum subjectivity for objective tweets

# Load english stopwords
stopWords = set(stopwords.words('english'))

# Polarity csv
polarity_csv = "tweet_polarity_noRT_nltk.csv"

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# makeNGrams 													#
# Arg arr 	- array of items to be split into n-grams 			#
# Arg n 	- size of n-gram 									#
# Returns: array of length n arrays (n-grams)  					#
def makeNGrams(arr, n = 2):
	i = 0
	ngrams = []
	while i < len(arr) - (n - 1):
		ngrams.append(arr[i : i+n])
		i += 1

	return ngrams

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# cleanTweets 													#
# Pre-processes tweets by removing punctuation, converting to 	#
# lower-case, and optionally removing stopwords, usernames, and #
# emoji.
# Arg s 				- string to be cleaned 					#
# Arg removeStopwords 	- removes stopwords if True 			#
# Arg removeUsernames	- removes Twitter handles if True		#
# Arg removeEmoji 		- removes emoji if True 				#
# Arg removeURLs 		- removes URLs if True 					#
# Returns: cleaned string 										#
def cleanTweet(s, removeStopwords = False, removeUsernames = True, removeEmoji = True, removeURLs = True):
	# Remove twitter usernames
	if removeUsernames:
		s = " ".join([w for w in s.split() if w[0] != '@'])

	# Remove URLs from the tweet
	if removeURLs:
		urlPattern = re.compile(r"(?:https?:\/\/)?[\n\S]+\.\S+(?:\s…)?")
		s = urlPattern.sub(r'', s)

	if removeEmoji:
		# Remove all unicode
		s = s.decode('unicode_escape').encode('ascii','ignore')
		
	# Strip punctuation and change all to lower case
	punctPattern = re.compile('[%s]' % re.escape(punctuation))
	s = punctPattern.sub('', s).lower()

	# Remove english stop words
	if removeStopwords:
		s = " ".join([w for w in s.split() if w not in stopWords])

	# Remove any extra whitespace
	s = ' '.join(s.split())

	return s

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# tokenize 														#
# Tokenizes a list of tweets.									#
# Arg tweets			- list of tweets 						#
# Arg markNegation 		- marks negation if True 				#
# Returns: list of tokenized tweets 							#
def tokenize(tweets, markNegation = False):
	if markNegation:
		return [ mark_negation(cleanTweet(t)) for t in tweets ]

	return [ (cleanTweet(t)) for t in tweets ]

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# testTrainSplit 												#
# Splits a positive and negative array into a training and test #
# set.															#
# Arg pos		- list of positive strings 						#
# Arg neg 		- list of negative strings 						#
# Arg neg 		- list of neutral strings 						#
# Arg split 	- Proportion of strings to use in the train set #
# Returns: 														#
#				training tweets 		 						#
#				testing tweets 			 						#
#				training labels 		 						#
#				testing labels 			 						#
def testTrainSplit(pos, neg, neut, split=0.8):
	# Split the positive and negative sets up at the split mark
	posTrain, posTest = pos[:int(len(pos) * split)], pos[int(len(pos) * split):]
	negTrain, negTest = neg[:int(len(neg) * split)], neg[int(len(neg) * split):]
	neutTrain, neutTest = neut[:int(len(neut) * split)], neut[int(len(neut) * split):]

	# Can (hackily) put own test sentences here
	# negTest = tokenize(["I don't like you.", "Today sucks."])
	# posTest = tokenize(["I like you.", "Life is a beautiful thing."])
	
	# Combine the positive and negative splits to be complete train/test sets
	train_tweets =  posTrain + negTrain	+ neutTrain
	test_tweets = posTest + negTest + neutTest

	# Create arrays of of sentiment labels such that
	# x_labels[i] is the sentiment label of x_tweets[i]
	train_labels = [1 for i in posTrain] + [-1 for i in negTrain] + [0 for i in neutTrain] 
	test_lables = [1 for i in posTest] + [-1 for i in negTest] + [0 for i in neutTest]

	train = (train_tweets, train_labels)
	test = (test_tweets, test_lables)

	return (train, test)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# trainModel 													#
# Fits the training set to the specified classifier and 		#
# evaluates it against the training set. 						#
# Note: expects the training and testing X to be a vector 		#
# (see getVects)												#
# Arg clf		- A scikit learn classifier 					#
# Arg train 	- training set in the format (X, Y) 			#
# Arg test 	 	- testing set in the format (X, Y) 				#
# Returns: 		the classifier									#
def trainModel(clf, train, test, evaluate = True):
	# Unpack args
	X, Y = train
	X_test, Y_test = test

	# Fit to model
	model = clf.fit(X, Y)

	# Predict classes for the test set
	pred = model.predict(X_test)

	if evaluate:
		# Output results
		print(clf)
		print("Accuracy: %.3f" % (metrics.accuracy_score(Y_test, pred) * 100))
		print(metrics.classification_report(Y_test, pred))

	return model

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# trainModel 													#
# Fits the training set to the specified classifier and 		#
# evaluates it against the training set. 						#
# Note: expects the training and testing X to be a vector 		#
# (see getVects)												#
# Arg X			- A list of training instances 					#
# Arg test_X	- A list of testing instances 					#
# Arg mode		- What kind of vector to create:  				#
# 					{"Binary", "Counter", "TFIDF"} 				#
#					(default: binary)							#
# Arg nGramMin 	- smallest n-grams to include 					#
# Arg nGramMax 	- largest n-grams to include 					#
# Arg maxFeats 	- limit to the top maxFeat most common ngrams 	#
# Returns: 		train and test vectors							#
def getVects(X, test_X, mode="Binary", nGramMin = 1, nGramMax = 2, maxFeats = None):
	# Select mode
	if mode == "TFIDF":
		# Initialize a TF-IDF n-gram vectorizer
		vect = TfidfVectorizer(analyzer="word", ngram_range=(nGramMin, nGramMax), max_features=maxFeats, sublinear_tf = True)   
	else:
		binaryCount = True
		if mode == "Counter":
			binaryCount = False

		# Initialize a count vectorizer using binary / total counts
		# Default: mode == "Binary"
		vect = CountVectorizer(analyzer="word", ngram_range=(nGramMin, nGramMax), max_features=maxFeats, binary=binaryCount)

	# Fit/transform the training data to a vector
	train_vect = vect.fit_transform(X)

	# Transform the testing data to match the format of the training data
	test_vect = vect.transform(test_X)

	return (train_vect, test_vect)

# Load the positive, negative tweet datasets  
# positive_tweets = twitter_samples.strings('positive_tweets.json')
# negative_tweets = twitter_samples.strings('negative_tweets.json')

positive_tweets = []
negative_tweets = []
neutral_tweets = []

# Attempt to load the tweet polarity set from local file
try:
	with open(polarity_csv, "r") as inf:
		for line in inf:
			# CSV: split on commas
			l = line.split(",")

			# Grab the polarity
			polarity = l.pop(0)

			# Remainder of line is the tweet
			tweet = ",".join(l)

			# Sort tweet into polarity groups
			if polarity == "1":
				positive_tweets.append(tweet)
			elif polarity == "0":
				neutral_tweets.append(tweet)
			elif polarity == "-1":
				negative_tweets.append(tweet)

except IOError:
	print("Error: Unable to locate file '%s'." % polarity_csv)
	print("Attempting to rebuild csv...")

	try:
		cap = 24000
		# Rebuild tweet polarity csv using (line-separated) tweet JSON and textblob
		with open("/Users/tglennan/Documents/Uni/2017/Cloud/fixed_tweets_melb1000000.json") as f:
			sid = SentimentIntensityAnalyzer()

			for line in f:
				try:
					# Extract text field
					t = re.search(r"\"text\":\s\"(.*?)\",\s\"is_quote_status\"", line).group(1)

					if t[:2] == "RT":
						continue

					# Use NLTK for ground truth labelling
					ss = sid.polarity_scores(t)

					# Sort tweet into positive/neutral/negative
					if ss["pos"] >= polarityThreshold and len(positive_tweets) < cap:
						positive_tweets.append(t)
					elif ss["neg"] >= polarityThreshold and len(negative_tweets) < cap:
						negative_tweets.append(t)
					elif ss["neu"] >= polarityThreshold and len(neutral_tweets) < cap:
						neutral_tweets.append(t)

					# # Use TextBlob for ground truth labelling
					# sent = TextBlob(t).sentiment

					# # Sort tweet into positive/neutral/negative
					# if sent.polarity >= polarityThreshold and len(positive_tweets) < cap:
					# 	positive_tweets.append(t)
					# elif sent.polarity <= (-1.0 * polarityThreshold) and len(negative_tweets) < cap:
					# 	negative_tweets.append(t)
					# elif sent.polarity == 0 and sent.subjectivity < subjectivityThreshold and len(neutral_tweets) < cap:
					# 	neutral_tweets.append(t)

					# Stop when each group of tweets is full
					if len(positive_tweets) >= cap and len(negative_tweets) >= cap and len(neutral_tweets) >= cap:
						break 

				except AttributeError:
					pass
		# Output to file
		with open(polarity_csv, "w") as o:
			for tweet in positive_tweets:
				o.write("1," + tweet + "\n")
			for tweet in negative_tweets:
				o.write("-1," + tweet + "\n")
			for tweet in neutral_tweets:
				o.write("0," + tweet + "\n")
	except IOError:
		print("Fatal Error: Unable to locate tweet json. Exiting.")
		exit()

# Generate train/test split for each kind of tweet
train, test = testTrainSplit(tokenize(positive_tweets), tokenize(negative_tweets), tokenize(neutral_tweets))

# Unpack train/test into data (Xs) and target classes (Ys)
X, Y = train
X_test, Y_test = test

# Convert Xs to vectors
X, X_test = getVects(X, X_test, mode="Counter")

print "Number of features:", X.shape[1]

# Train whatever models you want
models = 	[	
			MultinomialNB(alpha=0.01), \
			BernoulliNB(alpha=0.01), \
			LinearSVC(loss='squared_hinge', penalty='l2', tol=1e-4)
			]

for m in models:
	trainModel(m, (X, Y), (X_test, Y_test))