import cPickle

flights = {"1144":"Dallas", "1045":"Los Angeles", "1520":"New York"}
times = ["230pm", "320pm", "420pm"]

#Create the pickle file
f = open("pickled.dat", "w")

#Create the pickler object
p = cPickle.Pickler(f)

#Pickle data to the file
p.dump(flights)
p.dump(times)
f.close()

#Display the file contents
f = open("pickled.dat", "r")
data = f.read()
print data
f.close()

