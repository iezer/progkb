#!/usr/bin/python
import cgi, os, sys, string
import posixpath, macpath

saveDir = "/upload"

#Send errors to browser
sys.stderr = sys.stdout

#Parse data from form
data = cgi.FieldStorage()

#Save the file to server directory
def saveFile(uFile):
    fPath = "%s/%s" % (saveDir, uFile.filename)
    buf = uFile.file.read()
    sFile = open(fPath, 'wb')
    sFile.write(buf)
    sFile.close()
    

#Send response to brower
webText = """Content-type: text/html\n"
<TITLE>CGI Upload Form</TITLE>\n
<H2>Upload File</H2><P>"""
print webText

if data.has_key('uFile'):
    saveFile(data['uFile'])
    print "<B>%s</B> uploaded." % (data['uFile'].filename)
