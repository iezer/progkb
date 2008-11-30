import MySQLdb

#Connect to MySQL Server
myDB = MySQLdb.connect(host="127.0.0.1", port=3306)

#Get the cursor object
cHandler = myDB.cursor()

#Create database
#cHandler.execute("CREATE DATABASE schedule")

#Select database
cHandler.execute("USE schedule")

#Create table
#cHandler.execute("CREATE TABLE Arrivals (city TEXT, flight TEXT, time TEXT)")

#Show created table
cHandler.execute("SHOW TABLES")
results = cHandler.fetchall()
print results

#Describe the table
cHandler.execute("DESCRIBE Arrivals")
results = cHandler.fetchall()
print results

myDB.close()


