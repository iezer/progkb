import os
import zipfile


tFile = zipfile.ZipFile("files.zip", 'r')

#List info for archived file
print tFile.getinfo("input.txt")

#Read zipped file into a buffer
buffer = tFile.read("ren_file.py")
print buffer 

#Write zipped file contents to new file
f = open("extract.txt", "w")
f.write(buffer)
f.close()

tFile.close()

