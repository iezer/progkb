inPath = "input.txt"
outPath = "output.txt"

#Open a file for reading
file = open(inPath, 'rU')
if file:
    file.close()
else:
    print "Error Opening File."

#Open a file for writing
file = open(outPath, 'wb')
if file:
    file.close()
else:
    print "Error Opening File."
