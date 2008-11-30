import string
badSentence = "\t\tThis sentence has problems.   "

badParagraph = "\t\tThis paragraph \nhas even more \nproblems.!?   "

#Strip trailing spaces
print "Lenght = " + str(len(badSentence))
print "Without trailing spaces = " + str(len(badSentence.rstrip(' ')))

#Strip tabs
print "\nBad:\n" + badSentence
print "\nFixed:\n" + badSentence.lstrip('\t')

#Strip leading and trailing characters 
print "\nBad:\n" + badParagraph
print "\nFixed:\n" + badParagraph.strip((' ?!\t'))


