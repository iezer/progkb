#!/usr/bin/python

#Send header to browser
print "Content-type: text/html\n"
print "<TITLE>CGI Text</TITLE>\n"

webText = """
<H1>Useful Python Links</H1>
<li><a href="http://www.python.org">Python Web Site</a></li>
<li><a href="http://docs.python.org">Python Documentation</a></li>
<li><a href="http://cheeseshop.python.org">Cheeseshop (Python Packages Library)</a></li>
"""

#Send page content to browser
print webText
