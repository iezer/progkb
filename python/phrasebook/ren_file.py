import os

oldFileName = "/books/python/CH4/code/output.txt"
newFileName = "/books/python/CH4/code/output.old"

#Old Listing
for file in os.listdir("/books/python/CH4/code/"):
    if file.startswith("output"):
        print file

#Remove file if the new name already exists
if os.access(newFileName, os.X_OK):
    print "Removing " + newFileName
    os.remove(newFileName)

#Rename the file
os.rename(oldFileName, newFileName)

#New Listing
for file in os.listdir("/books/python/CH4/code/"):
    if file.startswith("output"):
        print file

