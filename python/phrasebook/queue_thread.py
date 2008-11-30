import Queue
import threading
import time
import thread

doExit = 0

class newThread (threading.Thread):
    def __init__(self, threadID, name, q):
        self.threadID = threadID
        self.name = name
        self.q = q
        threading.Thread.__init__(self)
    def run(self):
        print "Starting " + self.name
        process_data(self.name, self.q)
        print "Exiting " + self.name

def process_data(tName, q):
    while not doExit:
        queueLock.acquire()
        if not workQueue.empty():
            data = q.get()
            queueLock.release()
            print "%s processing %s" % (tName, data)
        else:
            queueLock.release()
        time.sleep(1)
        

threadList = ["Thread1", "Thread2", "Thread3"]
wordList = ["One", "Two", "Three", "Four", "Five"]
queueLock = threading.Lock()
workQueue = Queue.Queue(10)
threads = []
tID = 1

#Create new threads
for tName in threadList:
    thread = newThread(tID, tName, workQueue)
    thread.start()
    threads.append(thread)
    tID += 1

#Fill the queue
queueLock.acquire()
for word in wordList:
    workQueue.put(word)
queueLock.release()

#Wait for queue to empty
while not workQueue.empty():
    pass

#Notify threads its time to exit
doExit = 1

#Wait for all threads to complete
for t in threads:
    t.join()

print "Exiting Main Thread"
