from xml.parsers import expat

xmlFile = "emails.xml"

#Define a class that will store the character data
class xmlText(object):
    def __init__ (self):
        self.textBuff = ""
    def CharacterData(self, data):
        data = data.strip()
        if data:
            data = data.encode('ascii')
            self.textBuff += data + "\n"
            
    def Parse(self, fName):
#Create the expat parser object
        xmlParser = expat.ParserCreate()
#Override the handler methods
        xmlParser.CharacterDataHandler = self.CharacterData
#Parse the XML file
        xmlParser.Parse(open(fName).read(), 1)

#Create the text parser object
xText = xmlText()

#Invokd the text parser objects Parse method
xText.Parse(xmlFile)

#Display parsed results
print "Text from %s\n==========================" % xmlFile
print xText.textBuff

