import threading
import thread
import time

doExit = 0

class newThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        self.threadID = threadID
        self.name = name
        self.counter = counter
        threading.Thread.__init__(self)
    def run(self):
        print "Starting " + self.name
        print_time(self.name, self.counter, 5)
        print "Exiting " + self.name

def print_time(threadName, delay, counter):
    while counter:
        if doExit:
            thread.exit()
        time.sleep(delay)
        print "%s: %s" % (threadName, time.ctime(time.time()))
        counter -= 1

#Create new threads
thread1 = newThread(1, "Thread01", 1)
thread2 = newThread(2, "Thread02", 2)

#Start new Threads
thread1.start()
thread2.run()


while thread2.isAlive():
    if not thread1.isAlive():
        doExit = 1
        
    pass

print "Exiting Main Thread"
