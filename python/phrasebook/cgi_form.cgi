#!/usr/bin/python
import cgi, sys

#Send errors to browser
sys.stderr = sys.stdout

#Parse data from form
data = cgi.FieldStorage()

#Send response to brower
print "Content-type: text/html\n"
print "<TITLE>CGI Form Response</TITLE>\n"
print "<H2>Current Quote</H2><P>"

if data.has_key('name') and data.has_key('quote'):
    print "<B>%s</B>: %s" % (data['name'].value, data['quote'].value)
