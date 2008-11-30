import anydbm

cities = ["Dallas", "Los Angeles", "New York"]
flights = ["1144", "1045", "1520"]
times = ["230pm", "320pm", "420pm"]

#Create DBM file
cityDB = anydbm.open("city.dbm", 'n')
timeDB = anydbm.open("time.dbm", 'n')

#Add entries
i = 0
for flight in flights:
    cityDB[flight] = cities[i]
    i += 1  
i = 0
for flight in flights:
    timeDB[flight] = times[i]
    i += 1

print cityDB.items()
print timeDB.items()

#Close DBM file
cityDB.close()
timeDB.close()


