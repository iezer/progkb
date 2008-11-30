from xml.parsers import expat

searchStringList = ["dayley@sfcn.org", "also"]
searchElement = "email"
xmlFile = "emails.xml"

#Define a search class that will handle elements and search character data
class xmlSearch(object):
    def __init__ (self, cStr, nodeName):
        self.nodeName = nodeName
        self.curNode = 0
        self.nodeActive = 0
        self.hits = []
        self.cStr = cStr
    def StartElement(self, name, attributes):
        if name == self.nodeName:
            self.nodeActive = 1
            self.curNode += 1
    def EndElement(self, name):
        if name == self.nodeName:
            self.nodeActive = 0
    def CharacterData(self, data):
        if data.strip():
            data = data.encode('ascii')
            if self.nodeActive:
                if data.find(self.cStr) != -1:
                    if not self.hits.count(self.curNode):
                        self.hits.append(self.curNode)
                        print "\tFound %s..." % self.cStr
    def Parse(self, fName):
#Create the expat parser object
        xmlParser = expat.ParserCreate()
#Override the handler methods
        xmlParser.StartElementHandler = self.StartElement
        xmlParser.EndElementHandler = self.EndElement
        xmlParser.CharacterDataHandler = self.CharacterData
#Parse the XML file
        xmlParser.Parse(open(fName).read(), 1)

for searchString in searchStringList:
#Create search class
    search = xmlSearch(searchString, searchElement)

#Invokd the search objects Parse method
    print "\nSearching <%s> nodes . . ." % searchElement
    search.Parse(xmlFile)

#Display parsed results
    print "Found '%s' in the following nodes:" % searchString
    print search.hits

