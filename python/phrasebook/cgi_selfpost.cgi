#!/usr/bin/python
import cgi, os, sys

#Send errors to browser
sys.stderr = sys.stdout

#Parse data from form
data = cgi.FieldStorage()

#Send form to brower 
formText = """Content-type: text/html\n
<TITLE>CGI Self-Post Form</TITLE>\n
<H2>Enter Quote</H2><P>
<FORM METHOD="POST" ACTION="cgi_selfpost.cgi">
    Name <INPUT TYPE="TEXT" NAME=name>
    <P>
    Quote <INPUT TYPE="TEXT" NAME=quote SIZE=80>
    <P>
    <INPUT TYPE="SUBMIT" VALUE="send">
</FORM>
<HR>
<H2>Received Quotes</H2><P>"""
print formText

#Retrieve field from form and store data
if data.has_key('name') and data.has_key('quote'):
    f = open("quotes.dat", 'a')
    f.write("<LI><B>%s:</B> %s</LI>\n" % \
            (data['name'].value, data['quote'].value))
    f.close()

#Send stored data to browser
f=open("quotes.dat", 'r')
if f:
    print f.read()
    f.close()
