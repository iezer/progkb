word1 = "A"
word2 = "few"
word3 = "good"
word4 = "words"
wordList = ["A", "few", "more", "good", "words"]

#simple Join
print "Words:" + word1 + word2 + word3 + word4
print "List: " + ' '.join(wordList)

#Formatted String
sentence = ("First: %s %s %s %s." % (word1, word2, word3, word4))
print sentence

#Joining a list of words
sentence = "Second:"
for word in wordList:
    sentence += " " + word
sentence += "."
print sentence


