numList = [2000, 2003, 2005, 2006]
stringList = ["Essential", "Python", "Code"]
mixedList = [1, 2, "three", 4]
subList = ["Python", "Phrasebook", ["Copyright", 2006]]
listList = [numList, stringList, mixedList, subList]


#All items
for x in numList:
    print x+1

#Specific items
print stringList[0] + ' ' + stringList[1] + ' ' + \
    stringList[2]

#Negative indicies
print stringList[-2]

#Accessing items in sublists
if isinstance(subList, list):
    print subList[2][0]
