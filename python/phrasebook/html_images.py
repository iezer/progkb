import HTMLParser
import urllib
import sys

urlString = "http://www.python.org"

#Save image file to disk
def getImage(addr):
    u = urllib.urlopen(addr)
    data = u.read()

    splitPath = addr.split('/')
    fName = splitPath.pop()
    print "Saving %s" % fName

    f = open(fName, 'wb')
    f.write(data)
    f.close()

#Define HTML parser
class parseImages(HTMLParser.HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            for name,value in attrs:
                if name == 'src':
                    getImage(urlString + "/" + value)

#Create instance of HTML parser
lParser = parseImages()

#Open the HTML file
u = urllib.urlopen(urlString)
print "Opening URL\n===================="
print u.info()

#Feed HTML file into parser
lParser.feed(u.read())

lParser.close()

