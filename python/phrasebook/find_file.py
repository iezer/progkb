import os
path = "/books/python"
pattern = "*.py;*.doc"

#Print files that match to file extensions
def printFiles(dirList, spaceCount, typeList):
    for file in dirList:
        for ext in typeList:
            if file.endswith(ext):
                print "/".rjust(spaceCount+1) + file
                break

#Print each sub-directory
def printDirectory(dirEntry, typeList):
    print dirEntry[0] + "/"
    printFiles(dirEntry[2], len(dirEntry[0]), typeList)

#Convert pattern string to list of file extensions
extList = [] 
for ext in pattern.split(";"):
    extList.append(ext.lstrip("*"))

#Walk the tree to print files
for directory in os.walk(path):
    printDirectory(directory, extList)

