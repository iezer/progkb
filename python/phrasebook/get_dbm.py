import anydbm

#Open DBM file for reading
cityDB = anydbm.open("city.dbm", 'r')
timeDB = anydbm.open("time.dbm", 'r')

#Get keys
flights = cityDB.keys()

#Use keys to get values
print "Arrivals"
print "============================================="
for flight in flights:
    print ("Flight %s arrives from %s at %s" % (flight, cityDB[flight], timeDB[flight]))

#Close DMB file
cityDB.close()
timeDB.close()


