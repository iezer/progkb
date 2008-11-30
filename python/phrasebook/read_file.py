filePath = "input.txt"

#Read entire file into a buffer
buffer = "Read buffer:\n"
buffer += open(filePath, 'rU').read()
print buffer

#Read lines into a buffer
buffer = "Readline buffer:\n"
inList = open(filePath, 'rU').readlines()
print inList
for line in inList:
    buffer += line
print buffer

#Read bytes into a buffer
buffer = "Read buffer:\n"
file = open(filePath, 'rU')
while(1):
    bytes = file.read(5)
    if bytes:
        buffer += bytes
    else:
        break

print buffer





