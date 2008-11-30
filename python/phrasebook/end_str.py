import os

for f in os.listdir('.'):
    if f.endswith('.py'):
        print "Python file: " + f
    elif f.endswith('txt'):
        print "Text file: " + f
