filePath = "input.txt"
wordList = []
wordCount = 0

#Read lines into a list
file = open(filePath, 'rU')
for line in file:
    for word in line.split():
        wordList.append(word)
        wordCount += 1
print wordList
print "Total words = %d" % wordCount
