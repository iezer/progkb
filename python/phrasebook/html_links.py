import HTMLParser
import urllib
import sys

#Define HTML Parser
class parseLinks(HTMLParser.HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for name,value in attrs:
                if name == 'href':
                    print value
                    print self.get_starttag_text()

#Create instance of HTML parser
lParser = parseLinks()

#Open the HTML file
lParser.feed(urllib.urlopen("http://www.python.org/index.html").read())

lParser.close()

