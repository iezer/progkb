from xml.dom import minidom

#Parse XML file to DOM tree
xmldoc = minidom.parse('emails.xml')

#Get nodes at root of tree
cNodes = xmldoc.childNodes

#Direct Node Access
print "DTD Node\n================="
print cNodes[0].toxml()

#Find node by name
print "\nTo Addresses\n==================="
nList = cNodes[1].getElementsByTagName("to")
for node in nList:
    eList = node.getElementsByTagName("addr")
    for e in eList:
        print e.toxml()

print "\nFrom Addresses\n==================="
nList = cNodes[1].getElementsByTagName("from")
for node in nList:
    eList = node.getElementsByTagName("addr")
    for e in eList:
        print e.toxml()

#Walk node tree
def printNodes (nList, level):
    for node in nList:
        print ("  ")*level, node.nodeName, node.nodeValue
        printNodes(node.childNodes, level+1)

print "\nNodes\n==================="
printNodes(xmldoc.childNodes, 0)

