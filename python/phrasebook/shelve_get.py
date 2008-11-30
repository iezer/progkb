import shelve

#Open shelve file
db = shelve.open("shelved.dat", "r")

#Get the keys from the shelve
for k in db.keys():
    obj = db[k]
    print "%s: %s" % (k, obj) 

#Use keys to get values
flightDB = db['flights']
flights = flightDB.keys()
cities = flightDB.values()
times = db['times']

print "\nDepartures"
print "============================================="
x = 0
for flight in flights:
    print ("Flight %s leaves for %s at %s" % (flight, cities[x],  times[x]))
    x+=1

db.close()


