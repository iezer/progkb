import threading
import time

class newThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        self.threadID = threadID
        self.name = name
        self.counter = counter
        threading.Thread.__init__(self)
    def run(self):
        print "Starting " + self.name
#Get lock to synchronize threads
        threadLock.acquire()
        print_time(self.name, self.counter, 3)
#Free lock to release next thread
        threadLock.release()

def print_time(threadName, delay, counter):
    while counter:
        time.sleep(delay)
        print "%s: %s" % (threadName, time.ctime(time.time()))
        counter -= 1

threadLock = threading.Lock()
threads = []

#Create new threads
thread1 = newThread(1, "Thread01", 1)
thread2 = newThread(2, "Thread02", 2)

#Start new Threads
thread1.start()
thread2.start()

#Add threads to thread list
threads.append(thread1)
threads.append(thread2)

#Wait for all threads to complete
for t in threads:
    t.join()

print "Exiting Main Thread"

