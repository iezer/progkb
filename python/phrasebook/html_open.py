import urllib

webURL = "http://www.python.org"
localURL = "/books/python/CH8/code/test.html"

#Open web based URL
u = urllib.urlopen(webURL)
buffer = u.read()
print u.info()
print "Web-Based URL\nRead %d bytes from %s." % (len(buffer), u.geturl())

#Open local based URL
u = urllib.urlopen(localURL)
buffer = u.read()
print u.info()
print "\nLocal-Based URL\nRead %d bytes from %s." % (len(buffer), u.geturl())
