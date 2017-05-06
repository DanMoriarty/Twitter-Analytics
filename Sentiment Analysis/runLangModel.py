import sys, json

SEP = "^^^&$&$&^^^"

def runLanguageModel(line):
    return line.upper() + "!"

def main():
    # Wait for stdin forever
    while True:
        # Get next line (blocks until a newline)
        line = sys.stdin.readline().rstrip('\n')

        # Grab the tweet (split keySEPtweet)
        tweet = line.split(SEP)[0] 

        # Output JSON in {key: input line, "res": results of computation}
        print json.dumps({"key": line, "res": runLanguageModel(tweet)})

        # Flush stdout
        sys.stdout.flush()
    
# Start process
if __name__ == '__main__':
    main()