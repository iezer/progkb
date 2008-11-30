import os
import urllib2
import cookielib
from urllib2 import urlopen, Request

cookieFile = "cookies.dat"
testURL = 'http://maps.google.com/'

#Create instance of cookie jar
cJar = cookielib.LWPCookieJar()

#Create HTTPCookieProcessor opener object
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cJar))

#Install the HTTPCookieProcessor opener
urllib2.install_opener(opener)

#Create a Request object
r = Request(testURL)

#Open the HTML file
h = urlopen(r)
print "Page Header\n======================"
print h.info()

print "Page Cookies\n======================"
for ind, cookie in enumerate(cJar):
    print "%d - %s" % (ind, cookie)

#Save the cookies
cJar.save(cookieFile)


