from xml.dom import minidom

#Parse XML file to DOM tree
xmldoc = minidom.parse('emails.xml')

#Get nodes at root of tree
cNodes = xmldoc.childNodes

#Find attributes by name
print "\nTo Addresses\n==================="
nList = cNodes[1].getElementsByTagName("to")
for node in nList:
    eList = node.getElementsByTagName("addr")
    for e in eList:
        if e.hasAttribute("type"):
            if e.getAttribute("type") == "TO":
                print e.toxml()

print "\nCC Addresses\n==================="
nList = cNodes[1].getElementsByTagName("to")
for node in nList:
    eList = node.getElementsByTagName("addr")
    for e in eList:
        if e.hasAttribute("type"):
            if e.getAttribute("type") == "CC":
                print e.toxml()

print "\nBC Addresses\n==================="
nList = cNodes[1].getElementsByTagName("to")
for node in nList:
    eList = node.getElementsByTagName("addr")
    for e in eList:
        if e.hasAttribute("type"):
            if e.getAttribute("type") == "BC":
                print e.toxml()


