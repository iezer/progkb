myDictionary = {'color':'blue', 'speed':['fast'], 'number':1, 5:'number'}

print myDictionary

#New key and value
myDictionary["new key"] = "new value"

#Old key but new value
myDictionary["number"] = 2

if "speed" in myDictionary:
    myDictionary["speed"].append("slow")

print myDictionary


