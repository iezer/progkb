import SimpleXMLRPCServer

servAddr = ("localhost", 8080)

def areaSquare(length):
    return length*length

def areaRectangle(length, width):
    return length*width

def areaCircle(radius):
    return 3.14*(radius*radius)

serv = SimpleXMLRPCServer.SimpleXMLRPCServer(servAddr)

#Register RPC functions
serv.register_function(areaSquare)
serv.register_function(areaRectangle)
serv.register_function(areaCircle)

#Register Introspective functions
serv.register_introspection_functions()

#Handle Requests
serv.serve_forever()

