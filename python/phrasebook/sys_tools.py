import os, sys, time, platform

#os
#print os.path.abspath(".")
#print os.path.abspath("..")
#print os.path.exists("/books/python/ch1")
#print os.path.isdir("/books/python/ch1")
#print os.path.isfile("/books/python/ch1/ch1.doc")
#os.chdir("/books/python/ch1/code")
#print os.path.abspath(".")
#print os.environ['PATH']
#os.system("dir")
#os.execvp("update.exe", ["-verbose"])


#sys
#print sys.argv
#print sys.version
#text = sys.stdin.readline()
#print text
#sOUT = sys.stdout
#sERR = sys.stderr
#sys.stdout = open("ouput.txt", "w")
#sys.stderr = sys.stdout
#sys.stdout = sOUT
#sys.stderr = sERR

#time
print time.time()
print time.localtime()
print time.ctime()
print time.clock()
#time.sleep(1)

#platform
print platform.architecture()
print platform.python_version()
print platform.uname()


