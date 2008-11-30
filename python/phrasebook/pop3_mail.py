import poplib
import getpass

mServer = poplib.POP3('mail.sfcn.org')

#Login to mail server
mServer.user(getpass.getuser())
mServer.pass_(getpass.getpass())

#Get the number of mail messages
numMessages = len(mServer.list()[1])

print "You have %d messages." % (numMessages)
print "Message List:"

#List the subject line of each message
for mList in range(numMessages) :
    for msg in mServer.retr(mList+1)[1]:
        if msg.startswith('Subject'):
            print '\t' + msg
            break

mServer.quit()
