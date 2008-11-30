keyList = ['a', 'c', 'b', 'y', 'z', 'x']
letterList = ['b', 'c', 'a', 'z', 'y', 'x']
caseList = ['d', 'B', 'F', 'A', 'E', 'c']

#Custom sort procedure
def keySort (x, y):
    xIndex = keyList.index(x)
    yIndex = keyList.index(y)
    return cmp(xIndex, yIndex)

print letterList

#Sort the list
letterList.sort()
print letterList

#Custom sort
letterList.sort(lambda x, y: keySort(x, y))
print letterList

#Key sort
print caseList
caseList.sort()
print caseList
caseList.sort(key=str.lower)
print caseList

#Reverse list
letterList.reverse()
print letterList

#Reverse sort
letterList.sort(reverse=1)
print letterList

