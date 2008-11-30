import anydbm

flights = []
cancelled = ["1520", "1544"]
deleted = ["1144"]

def displayArrivals(header):
    print header
    print "============================================="
    for flight in flights:
        print ("Flight %s from %s arrives at %s" %
            (flight, cityDB[flight], timeDB[flight]))

#Open DBM file for reading
cityDB = anydbm.open("city.dbm", 'w')
timeDB = anydbm.open("time.dbm", 'w')

#Get keys
flights = timeDB.keys()

#Display arrivals
displayArrivals("Arrivals")

#Update DBM
for flight in flights:
    for c in cancelled:
        if c == flight:
            timeDB[flight] = "CANCELLLED"
            break
    for d in deleted:
        if d == flight:
            del timeDB[flight]
            del cityDB[flight]
            break


#Display updataed arrivals
flights = timeDB.keys()
displayArrivals("Updated Arrivals")

#Close DMB file
cityDB.close()
timeDB.close()


