import cPickle

#Open the pickle file
f = open("pickled.dat", "r")

#Create the unpickler object
p = cPickle.Unpickler(f)

#Unpickle an object from the file
data = p.load()
print "Flight Dictionary:"
print data

#Unpickle an object from the file
data = p.load()
print "\nTime List:"
print data

f.close()
