import shelve

flights = {"1144":"Dallas", "1045":"Los Angeles", "1520":"New York"}
times = ["230pm", "320pm", "420pm"]

#Create shelve
db = shelve.open("shelved.dat", "n")

#Store objects in shelve
db['flights'] = flights
db['times'] = times

#Displey added keys
print db.keys()

db.close()

#Display the file contents
f = open("shelved.dat", "r")
data = f.read()
print data
f.close()



