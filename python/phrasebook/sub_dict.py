year = {1:'January', 2:'February', 3:'March', 4:'April',\
        5:'May', 6:'June', 7:'July', 8:'August',\
        9:'September', 10:'October', 11:'November',\
        12:'December'}

print year

#Get list of keys
months = year.keys()

#Create subset of keys
months.sort()
halfCount = len(months)/2
half = months[0:halfCount]

#Create new dictionary from subset of keys
firstHalf = {}
for x in half:
        firstHalf[x] = year[x]

print firstHalf        





