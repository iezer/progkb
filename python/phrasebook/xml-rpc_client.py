import xmlrpclib

servAddr = "http://localhost:8080"

#Attach to XML-RPC server
s = xmlrpclib.ServerProxy(servAddr)

#List Methods
print "Methods\n==============="
methods = s.system.listMethods()
for m in methods:
    print m

#Call Methods
print "\nArea\n================"
print "5 in. Square =", s.areaSquare(5)
print "4x5 in. Rectangle =", s.areaRectangle(4,5)
print "10 in. Circle =", s.areaCircle(5)

