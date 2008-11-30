import sys
from xml.sax.handler import ContentHandler
import xml.sax

fileList = ["emails.xml", "bad.xml"]

#Create a parser object
xmlparser = xml.sax.make_parser()

#Attache a generic content handler to parser
xmlparser.setContentHandler(ContentHandler())

#Parse the files and handle exceptions on bad-formed XML files
for fName in fileList:
    try:
        xmlparser.parse(fName)
        print "%s is a well-formed file." % fName
    except Exception, err:
        print "ERROR %s:\n\t %s is not a well-formed file." % (err, fName)
