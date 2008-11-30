#python regular expressions regex regep expression

import re

#turn f:\PriceEngine\blah.cpp@@tky_integration\2
#int fo_fid_PriceEngine\PriceEngine\blah.cpp[\t]2

#2*@, anything, then a backslash

r = r"@@\w+\\"

rBig = r"([a-zA-Z]:\\)([\w\\.]+)(@@\w+\\)(\d)"

s = r"f:\PriceEngine\RiskEngine\blah.cpp@@tky_integration\2"

# Nth Group matches Nth parenthesis!!!

#m = re.search(rBig, s)
#instead can compile

matcher = re.compile(rBig)
m = matcher.search (s)
if m:
    print "yes"
    print "fo_fid_price\\ " + m.group(2) + "\t" + m.group(4)
else:
    print "no"

# from GVWilson software carpentry
# use findall

lines = [
    'This has several Title Case words',
    'on Each Line (Some in parentheses).'
]
pattern = re.compile(r'\b([A-Z][a-z]*)\b')
for line in lines:
    print line
    for word in pattern.findall(line):
        print '\t', word
