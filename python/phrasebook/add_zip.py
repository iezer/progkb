import os
import zipfile

#Create the zip file
tFile = zipfile.ZipFile("files.zip", 'w')

#Write directory contents to the zip file
files = os.listdir(".")
for f in files:
    tFile.write(f)

#List archived files
for f in tFile.namelist():
    print "Added %s" % f


tFile.close()

