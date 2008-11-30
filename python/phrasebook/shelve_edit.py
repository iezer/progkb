import shelve

newtimes = ["110pm", "220pm", "300pm", "445pm"]

#Open shelve file
db = shelve.open("shelved.dat", "w", writeback=1)

#Get the keys
for k in db.keys():
    obj = db[k]
    print "%s: %s" % (k, obj) 
print "\n\n"

#Use keys to get values
flights = db['flights']
times = db['times']

#Update contents of old object
del flights['1144']
flights['1145'] = "Dallas"
flights['1709'] = "Orlando"

#Replace old object with a new object
db['times'] = newtimes

#Add a new object
db['oldtimes'] = times

#Flush data to disk
db.sync()

for k in db.keys():
    obj = db[k]
    print "%s: %s" % (k, obj) 

db.close()


