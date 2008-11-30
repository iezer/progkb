from xml.dom import minidom

Station1 = ['Pentium M', '512MB']
Station2 = ['Pentium Core 2', '1024MB']
Station3 = ['Pentium Core Duo', '1024MB']
StationList = [Station1, Station2, Station3]

#Create DOM object
DOMimpl = minidom.getDOMImplementation()

#Create Document
xmldoc = DOMimpl.createDocument(None, "Workstations", None)
doc_root = xmldoc.documentElement

#Add Nodes
for station in StationList:
    #Create Node
    node = xmldoc.createElement("Computer")

    element = xmldoc.createElement('Processor')
    element.appendChild(xmldoc.createTextNode(station[0]))
    node.appendChild(element)

    element = xmldoc.createElement('Memory')
    element.appendChild(xmldoc.createTextNode(station[1]))
    node.appendChild(element)

    #Add Node
    doc_root.appendChild(node)


print "\nNodes\n==================="
nodeList = doc_root.childNodes
for node in nodeList:
    print node.toprettyxml()

#Write the document
file = open("stations.xml", 'w')
file.write(xmldoc.toxml())
