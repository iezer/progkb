wordList = ["Red", "Blue", "Green"]
filePath = "output.txt"

#Write a list to a file
file = open(filePath, 'wU')
file.writelines(wordList)

#Write a string to a file
file.write("\n\nFormatted text:\n")

#Print directly to a file
for word in wordList:
    print >>file,"\t%s Color Adjust" % word

file.close()





