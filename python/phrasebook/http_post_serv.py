import os, sys
import BaseHTTPServer, cgi

servAddr = ('',80)

#Define the HTTP handler that overrides do_POST
class httpServHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_POST(self):
#Get arguments from query string
        self.query_string = self.rfile.read(int(self.headers['Content-Length']))
        self.args = dict(cgi.parse_qsl(self.query_string))
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

#Redirect output to browser
        sys.stdout = self.wfile

#Handle the post
        self.wfile.write("<H2>Handling Post</H2><P>")
        self.wfile.write("<LI>Location: <B>%s</B>"%(self.path))
        self.wfile.write("<LI>Arguments: <B>%s</B><HR>"%(self.args))

#Execute the script remotely
        execfile(self.path, self.args)

#Set the root directory
os.chdir('/myTest')

#Create server object
serv = BaseHTTPServer.HTTPServer(servAddr, httpServHandler)

#Start Server
serv.serve_forever()

