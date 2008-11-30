numbers = ('1','2','3','4','5','6','7','8','9','0')
letters = ('a','b','c','d','e','f')
punct = ('.', '!', '?')
charSetDict = {numbers:[], letters:[], punct:[]}

def display_cset (cset):
    print
    for x in cset.items():
        if x[0] == numbers:
            print "Numbers:"
        elif x[0] == letters:
            print "Letters:"
        elif x[0] == punct:
            print "Puctuation:"
        else:
            print "Unknown:"
        print x[1]


#Add new values to keys
cSet = raw_input("Insert characters: ")
for c in cSet:
    for x in charSetDict.keys():
        if c in x:
            charSetDict[x].append(c)
            break;

display_cset(charSetDict)


#Add new key and value
charSetDict["Special"] = ['%', '$', '#']
display_cset(charSetDict)

#Change value for existing key
charSetDict["Special"] = '><'
display_cset(charSetDict)


