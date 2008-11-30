filePath = "input.txt"

lineCount = len(open(filePath, 'rU').readlines())
print "File %s has %d lines." % (filePath, lineCount)
