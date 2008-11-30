import time

print ("Module\n=================")
print time.__dict__

print ("\nClass\n=================")
class tClass(object):
    def __init__(self, x):
        self.x = x
    def double(self):
        self.x += self.x
t = tClass(5)
print t.x
t.double()
print t.x
print t.__dict__
print tClass.__dict__


x = 1
def fun(a):
    b=3
    x=4
    def sub(c):
        d=b
        global x
        x = 7
        print ("\nNested Function\n=================")
        print locals()
        
    sub(5)
    print ("\nFunction\n=================")
    print locals()
    print locals()["x"]
    print globals()["x"]

print ("\nGlobals\n=================")
print globals()
print locals()

fun(2)



