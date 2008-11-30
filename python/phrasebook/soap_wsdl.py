from SOAPpy import WSDL

searchStr = 'python'
key = 'INSERT_YOUR_KEY_HERE'

#Create WSDL server object
wServer = WSDL.Proxy('http://api.google.com/GoogleSearch.wsdl')

#Display methods
print "\nAvailable Methods\n======================"
print wServer.methods.keys()

#Display method arguments
print "\ndoGoogleSearch Args\n===================="
methodData = wServer.methods['doGoogleSearch']
for p in methodData.inparams:
    print "  %s %s" % (p.name.ljust(12), p.type[1])

#Call method
hits = wServer.doGoogleSearch(key, searchStr, 0, 10, False, "", False, "", "utf-8", "utf-8")

#Print results
print "\nResults\n==============================="
print len(hits.resultElements), "Hits . . ."
for hit in hits.resultElements:
    print "\nURL:", hit.URL
    print "Title:", hit.title
    print "Desc:", hit.snippet

