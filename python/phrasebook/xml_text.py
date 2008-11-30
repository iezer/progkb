import sys
import xml.sax
from xml.sax.handler import ContentHandler

xmlFile = "emails.xml"

#Define a function to eliminate whitespaces
def textParser(txt):
    parsedText = ""
    lines = txt.split("\n")
    for l in lines:
        l = l.lstrip(' ')
        if len(l):
            parsedText += "%s\n" % (l)
    return parsedText


#Define a class to parse the XML file and handle text
class textHandler(ContentHandler):
    def __init__ (self):
        self.parsedText = ""
    def characters(self, ch):
        self.parsedText += ch
    def getText(self):
        return self.parsedText

#Create a parser object
xmlparser = xml.sax.make_parser()

#Create a text handler object
tparser = textHandler()

#Attach the text handler to the parser
xmlparser.setContentHandler(tparser)

#Parse the file
xmlparser.parse(xmlFile)

#Retrieve the text from the text parser object
text = tparser.getText()
print textParser(text.encode("ascii"))

