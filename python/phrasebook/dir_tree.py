import os
path = "/books/python"

def printFiles(dirList, spaceCount):
    for file in dirList:
        print "/".rjust(spaceCount+1) + file

def printDirectory(dirEntry):
    print dirEntry[0] + "/"
    printFiles(dirEntry[2], len(dirEntry[0]))

tree = os.walk(path)
for directory in tree:
    printDirectory(directory)

