validkeys = (1,2,3)
keyGenDict = {'keys':[1,2,3], 1:'blue', 2:'fast', 3:'test', 'key':2}

def show_key (key):
    if(key in validkeys):
        keyVal = (keyGenDict["keys"])[key-1]
        print "Key = " + keyGenDict[keyVal]
    else:
        print("Invalid key")

#Retrieving dictionary key list
print keyGenDict.keys()

#Retrieving dictionary value list
print keyGenDict.values()

#Retrieving dictionary key and value list
print keyGenDict.items()

#Retrieve value from key
val = keyGenDict["key"]
show_key(val)

keyGenDict["key"] = 1
val = keyGenDict["key"]
show_key(val)


    


