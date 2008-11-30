import HTMLParser
import urllib

urlText = []

#Define HTML Parser
class parseText(HTMLParser.HTMLParser):
    def handle_data(self, data):
        if data != '\n':
            urlText.append(data)
    

#Create instance of HTML parser
lParser = parseText()

#Feed HTML file into parser
lParser.feed(urllib.urlopen("http://docs.python.org/lib/module-HTMLParser.html").read())
lParser.close()
for item in urlText:
    print item

