import os

emptyDirs = []
path = "/trash/deleted_files"

def deleteFiles(dirList, dirPath):
    for file in dirList:
        print "Deleting " + file
        os.remove(dirPath + "/" + file)

def removeDirectory(dirEntry):
    print "Deleting files in " + dirEntry[0]
    deleteFiles(dirEntry[2], dirEntry[0])
    emptyDirs.insert(0, dirEntry[0])

#Enumerate the entries in the tree
tree = os.walk(path)
for directory in tree:
    removeDirectory(directory)

#Remove the empty directories
for dir in emptyDirs:
    print "Removing " + dir
    os.rmdir(dir)



