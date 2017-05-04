import sys, json

SEP = "^^^&$&$&^^^"

#Read data from stdin
def runLanguageModel(line):
    return line.upper() + "!"

def main():
    line = ' '

    # Wait for stdin forever
    while line:

        # Get next line (blocks until a newline)
        line = sys.stdin.readline().rstrip('\n')

        # Grab the tweet (split keySEPtweet)
        tweet = line.split(SEP)[0] 

        # Output JSON in {key: input line, "res": results of computation}
        print json.dumps({"key": line, "res": runLanguageModel(tweet)})

        # Flush stdout
        sys.stdout.flush()
    
    return

# Start process
if __name__ == '__main__':
    main()