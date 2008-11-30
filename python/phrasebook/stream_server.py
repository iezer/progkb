import SocketServer
import socket
import string

class myTCPServer(SocketServer.StreamRequestHandler):
    def handle (self):
        while 1:
            peer = self.connection.getpeername()[0]
            line = self.rfile.readline()
            print "%s wrote: %s" % (peer, line)
            sck = self.connection.getsockname()[0]
            self.wfile.write("%s: %d bytes successfuly received." % (sck, len(line)))

#Create SocketServer object
serv= SocketServer.TCPServer(("",50008),myTCPServer)

#Activate the server to handle clients 
serv.serve_forever()
