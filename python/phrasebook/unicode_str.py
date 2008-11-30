import string

locStr = "El "
uniStr = u"Ni\u00F1o"

print uniStr.encode('utf-8')
print uniStr.encode('utf-16')
print uniStr.encode('iso-8859-1')

#Combine local and unicode results in new unicode string
newStr = locStr+uniStr
print newStr.encode('iso-8859-1')


#ascii will error because character '\xF1' is out of range
asciiStr = newStr.encode('iso-8859-1')
asciiStr = asciiStr.translate(string.maketrans('\xF1','n'), '')
print asciiStr.encode('ascii')
print newStr.encode('ascii')





