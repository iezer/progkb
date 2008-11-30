from socket import *

serverHost = ''
serverPort = 50008

#Open socket to listen on
sSock = socket(AF_INET, SOCK_STREAM)
sSock.bind((serverHost, serverPort))
sSock.listen(3)

#Handle connections
while 1:

#Accecpt a connection
    conn, addr = sSock.accept()
    print 'Client Connection: ', addr
    while 1:

#Receive data
        data = conn.recv(1024)
        if not data: break
        print 'Server Received: ', data
        newData = data.replace('Client', 'Processed')

#Send response
        conn.send(newData)

#Close Connection
    conn.close()


