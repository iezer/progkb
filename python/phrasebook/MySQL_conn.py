import MySQLdb

#Connect to MySQL Server
myDB = MySQLdb.connect(host="127.0.0.1", port=3306)
cHandler = myDB.cursor()

#Display available databases
cHandler.execute("SHOW DATABASES")
results = cHandler.fetchall()
print"Databases\n====================="
for item in results:
    print item[0]

#Display current database
cHandler.execute("select database()")
results = cHandler.fetchall()
print "\nCurrent Database\n======================="
for item in results:
    print item[0]

#Select database
cHandler.execute("USE schedule")

#Display current database
cHandler.execute("select database()")
results = cHandler.fetchall()
print "\nCurrent Database\n======================="
for item in results:
    print item[0]

myDB.close()
