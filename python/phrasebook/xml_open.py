from xml.dom import minidom

#Open XML document using minidom parser
DOMTree = minidom.parse('emails.xml')

#Print XML contents
print DOMTree.toxml()


