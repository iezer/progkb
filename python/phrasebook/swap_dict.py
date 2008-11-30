myDictionary = {'color':'blue', 'speed':'fast', 'number':1, 5:'number'}

print myDictionary

#Swap keys for values
swapDictionary = {}
for key, val in myDictionary.iteritems():
    swapDictionary[val] = key

print swapDictionary



