cmpStr = "abc"
upperStr = "ABC"
lowerStr = "abc"

print "Case Sensitive Compare"
if cmpStr == lowerStr:
    print lowerStr + " Matches " + cmpStr

if cmpStr == upperStr:
    print upperStr + " Matches " + cmpStr

print "\nCase In-Sensitive Compare"
if cmpStr.upper() == lowerStr.upper():
    print lowerStr + " Matches " + cmpStr

if cmpStr.upper() == upperStr.upper():
    print upperStr + " Matches " + cmpStr


