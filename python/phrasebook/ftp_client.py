import ftplib

#Open ftp connection
ftp = ftplib.FTP('ftp.novell.com', 'anonymous', 'bwdayley@novell.com')

#List the files in the current directory
print "File List:"
#ftp.retrlines('LIST')
files = ftp.dir()
print files


#Get the readme file
gFile = open("readme.txt", "wb")
ftp.retrbinary('RETR Readme', gFile.write)
gFile.close()
ftp.quit()

#Print the readme file contents
print "\nReadme File Output:"
gFile = open("readme.txt", "r")
buff = gFile.read()
print buff
gFile.close()

