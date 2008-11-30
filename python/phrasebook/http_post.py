import httplib

def printText(txt):
    lines = txt.split('\n')
    for line in lines:
        print line.strip()

#Connect to server
httpServ = httplib.HTTPConnection("137.65.77.28", 80)
httpServ.connect()

#Send Get cgi request
quote = "Use a Python script to post to the CGI Script."
httpServ.request('POST', '/cgi_form.cgi', 'name=Brad&quote=%s' % quote)

#Wait for response
response = httpServ.getresponse()
if response.status == httplib.OK:
    print "Output from CGI request"
    print "========================="
    printText (response.read())


httpServ.close()
