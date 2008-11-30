import httplib

def printText(txt):
    lines = txt.split('\n')
    for line in lines:
        print line.strip()

#Connect to server
httpServ = httplib.HTTPConnection("137.65.77.28", 80)
httpServ.connect()

#Send Get html request
httpServ.request('GET', "/test.html")

#Wait for response
response = httpServ.getresponse()
if response.status == httplib.OK:
    print "Output from HTML request"
    print "==========================="
    printText (response.read())

#Send Get cgi request
httpServ.request('GET', '/cgi_form.cgi?name=Brad&quote=Testing.')

#Wait for response
response = httpServ.getresponse()
if response.status == httplib.OK:
    print "Output from CGI request"
    print "========================="
    printText (response.read())

httpServ.close()
