class testClass(object):
    print "Creating New Class\n=================="
    number=5
    def __init__(self, string):
        self.string = string
    def printClass(self):
        print "Number = %d"% self.number
        print "String = %s"% self.string

tc = testClass("Five")
tc.printClass()
tc.number = 10
tc.string = "Ten"
tc.printClass()
