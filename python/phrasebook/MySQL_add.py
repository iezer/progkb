import MySQLdb

cities = ["Dallas", "Los Angeles", "New York"]
flights = ["1144", "1045", "1520"]
times = ["230pm", "320pm", "420pm"]

#Connect to database
myDB = MySQLdb.connect(host="127.0.0.1", port=3306, db="schedule")

#Get cursor object
cHandler = myDB.cursor()

#Add entries to database
x = 0
for city in cities:
    sqlCommand = "INSERT INTO Arrivals \
    VALUES('%s', '%s', '%s')" % \
    (city, flights[x], times[x])
    cHandler.execute(sqlCommand)
    x += 1

#View added entries
sqlCommand = "SELECT * FROM Arrivals"
cHandler.execute(sqlCommand)
results = cHandler.fetchall()
print results

#Commit changes to database
myDB.commit()

myDB.close()

