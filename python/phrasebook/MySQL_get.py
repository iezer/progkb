import MySQLdb

#Connect to database
myDB = MySQLdb.connect(host="127.0.0.1", port=3306, db="schedule")

#Get cursor object
cHandler = myDB.cursor()

#Send select request for specific entries
sqlCommand = "SELECT * FROM Arrivals WHERE city = 'Dallas'"
cHandler.execute(sqlCommand)

#View results
results = cHandler.fetchall()
print results

#Send select request for all entries
sqlCommand = "SELECT * FROM Arrivals"
cHandler.execute(sqlCommand)

#View results
results = cHandler.fetchall()
print results

#Process rows into lists
cityList = []
flightList = []
timeList = []
for row in results:
    cityList.append(row[0])
    flightList.append(row[1])
    timeList.append(row[2])

print "\nArrivals"
print "============================================="
x = 0
for flight in flightList:
    print ("Flight %s arrives from %s at %s" % (flight, cityList[x],  timeList[x]))
    x+=1

myDB.close()

