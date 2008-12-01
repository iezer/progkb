class ListComp(object):
    def __init__(self):
        self.a = 5
        self.l = [1,2,3,4,5]
        
    def sqr(self):
        s = [a*a for a in self.l if a<4]
        return s

        