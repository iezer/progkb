cards = ['Ace', 'King', 'Queen', 'Jack']
codeStr = "for card in cards: print \"Card = \" + card"
areaStr = "pi*(radius*radius)"

#Execute string
exec(codeStr)

#Evaluate string
print "\nArea = " + str(eval(areaStr, {"pi":3.14}, {"radius":5}))
