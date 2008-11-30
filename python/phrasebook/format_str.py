chapters = {1:5, 2:46, 3:52, 4:87, 5:90}
hexStr = "3f8"

#Right justify
print "Hex String: " + hexStr.upper().rjust(8,'0')
print
for x in chapters:
    print "Chapter " + str(x) + str(chapters[x]).rjust(15,'.')


#Left justify
print "\nHex String: " + hexStr.upper().ljust(8,'0')

#String format
print
for x in chapters:
    print "Chapter %d %15s" % (x,str(chapters[x]))

