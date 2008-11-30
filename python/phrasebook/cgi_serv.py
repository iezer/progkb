import os
import BaseHTTPServer, CGIHTTPServer

serverAddr = ("", 80)

#Set root directory
os.chdir("/myTest")

#Create server object
serv = BaseHTTPServer.HTTPServer(serverAddr, CGIHTTPServer.CGIHTTPRequestHandler)

#Start server
serv.serve_forever()
