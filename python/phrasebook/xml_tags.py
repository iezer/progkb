import xml.sax

xmlFile = "emails.xml"
xmlTag = "email"

#Define content handler to scan XML file and parse tags
class tagHandler(xml.sax.handler.ContentHandler):
    def __init__(self):
        self.tags = {}
    def startElement(self,name, attr):
        name = name.encode('ascii')
        self.tags[name] = self.tags.get(name, 0) + 1
        print "Tag %s = %d" % (name, self.tags.get(name))


#Create a parser object
xmlparser = xml.sax.make_parser()

#Create a content handler object
tHandler = tagHandler()

#Attach the content handler to the parser
xmlparser.setContentHandler(tHandler)

#Parse the XML file
xmlparser.parse(xmlFile)
tags = tHandler.tags
if tags.has_key(xmlTag):                                        
    print "%s has %d <%s> nodes." % (xmlFile, tags[xmlTag], xmlTag)
