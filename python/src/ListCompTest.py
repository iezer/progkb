from ListComp import *
import unittest

class TestSequenceFunctions(unittest.TestCase):
    
    def setUp(self):
        self.ike = ListComp()

    def testchoice(self):
        l = self.ike.sqr()
        self.assert_(l == [1,4,9])


if __name__ == '__main__':
    unittest.main()
