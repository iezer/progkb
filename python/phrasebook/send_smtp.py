import smtplib
import time

From = "bwdayley@sfcn.org"
To = ["bwdayley@novell.com"]
Date = time.ctime(time.time())
Subject = "New message from Brad Dayley."
Text = "Message Text"

#Format mail message
mMessage = ('From: %s\nTo: %s\nDate: %s\nSubject: %s\n%s\n' %
            (From, To, Date, Subject, Text))

print 'Connecting to Server'
s = smtplib.SMTP('mail.novell.com')

#Send mail
rCode = s.sendmail(From, To, mMessage)
s.quit()

if rCode:
    print 'Error Sending Message'
else:
    print 'Message Sent Successfully'
