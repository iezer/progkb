import os, sys
import BaseHTTPServer, cgi

servAddr = ('',80)

#Define the HTTP handler that overrides do_GET
class httpServHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.find('?') != -1:
            self.path, self.query_string = self.path.split('?', 1)
        else:
            self.query_string = ''
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

#Setup Global Environment
        self.globals = dict(cgi.parse_qsl(self.query_string))
#Redirect output to browser
        sys.stdout = self.wfile

#Execute the script remotely
        self.wfile.write("<H2>Handle Get</H2><P>")
        self.wfile.write("<LI>Executing <B>%s</B>" % (self.path))
        self.wfile.write("<LI>WIth Globals<B>%s</B><HR>" % (self.globals))
        execfile(self.path, self.globals)

#Set the root directory
os.chdir('/myTest')

#Create server object
serv = BaseHTTPServer.HTTPServer(servAddr, httpServHandler)

#Start Server
serv.serve_forever()

