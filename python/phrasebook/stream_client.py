import sys
from socket import *

serverHost = 'localhost'
serverPort = 50008

if len(sys.argv) > 1:
    serverHost = sys.argv[1]

#Create socket
sSock = socket(AF_INET, SOCK_STREAM)

#Connect to server
sSock.connect((serverHost, serverPort))

#Stream data to server.
line = ""
while line != 'bye':
    line = raw_input("Send to %s: " % (serverHost))
    sSock.send(line+'\n')
    data = sSock.recv(1024)
    print `data`

sSock.shutdown(0)
sSock.close()

