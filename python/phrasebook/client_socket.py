import sys
from socket import *

serverHost = 'localhost'
serverPort = 50008

message = ['Client Message1', 'Client Message2']

if len(sys.argv) > 1:
    serverHost = sys.argv[1]

#Create a socket
sSock = socket(AF_INET, SOCK_STREAM)

#Connect to server
sSock.connect((serverHost, serverPort))

#Send messages
for item in message:
    sSock.send(item)
    data = sSock.recv(1024)
    print 'Client received: ', `data`

sSock.close()

