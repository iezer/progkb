import urlparse

URLscheme = "http"
URLlocation = "www.python.org"
URLpath = "lib/module-urlparse.html"

modList = ("urllib", "urllib2", "httplib", "cgilib")

#Parse address into tuple
print "Parsed Google search for urlparse"
parsedTupple = urlparse.urlparse("http://www.google.com/search?hl=en&q=urlparse&btnG=Google+Search")
print parsedTupple

#Unparse list into URL
print "\nUnarsed python document page"
unparsedURL = urlparse.urlunparse((URLscheme, URLlocation, URLpath, '', '', ''))
print "\t" + unparsedURL

#Join path to new file to create new URL
print "\nAdditional python document pages using join"
for mod in modList:
    newURL = urlparse.urljoin(unparsedURL, "module-%s.html" % (mod))
    print "\t" + newURL

#Join path to subpath to create new URL
print "\nPython document pages using join of sub-path"
unparsedURL = "http://www.python.org/lib"
newURL = urlparse.urljoin(unparsedURL, "module-urllib2/request-objects.html")
print "\t" + newURL


