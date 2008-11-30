from xml.dom import minidom

#Parse XML file to DOM tree
xmldoc = minidom.parse('stations.xml')
doc_root = xmldoc.documentElement

print "\nNodes\n==================="
nodeList = xmldoc.childNodes
for node in nodeList:
    print node.toprettyxml()


#Delete first node
doc_root.removeChild(doc_root.childNodes[0])


print "\nNodes\n==================="
nodeList = xmldoc.childNodes
for node in nodeList:
    print node.toprettyxml()

