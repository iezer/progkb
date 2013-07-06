import sys

def character_cost(character):
	cost = 0
	for c in character['code']:
		if c == '.':
			cost += 1
		elif c == '-':
			cost += 3
	
	#add spaces between original_characters
	cost += len(character['code']) - 1
	return cost

# create a list of original morse code, calculate cost,
# then sort the list. I've hardcoded the output below to save time
def initialize( print_out = False ):
	morse_code = []
	morse_code.append({ 'original_char' : 'A', 'code' :	['.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'B', 'code' :	['-', '.', '.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'C', 'code' :	['-', '.', '-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'D', 'code' :	['-', '.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'E', 'code' :	['.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'F', 'code' :	['.', '.', '-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'G', 'code' :	['-', '-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'H', 'code' :	['.', '.', '.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'I', 'code' :	['.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'J', 'code' :	['.', '-', '-', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'K', 'code' :	['-', '.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'L', 'code' :	['.', '-', '.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'M', 'code' :	['-', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'N', 'code' :	['-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'O', 'code' :	['-', '-', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'P', 'code' :	['.', '-', '-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'Q', 'code' :	['-', '-', '.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'R', 'code' :	['.', '-', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'S', 'code' :	['.', '.', '.'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'T', 'code' :	['-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'U', 'code' :	['.', '.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'V', 'code' :	['.', '.', '.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'W', 'code' :	['.', '-', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'X', 'code' :	['-', '.', '.', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'Y', 'code' :	['-', '.', '-', '-'], 'cost' : 0})
	morse_code.append({ 'original_char' : 'Z', 'code' :	['-', '-', '.', '.'], 'cost' : 0})
	
	for i in range(0, len(morse_code)):
		morse_code[i]['cost'] = character_cost(morse_code[i])

	morse_code.sort(key=lambda x:x['cost'])
	
	if print_out:
		import pprint
		pp = pprint.PrettyPrinter(indent=4)
		pp.pprint(morse_code)
	
	return morse_code

#sorted_morse_code = initialize ( print_out = True )
sorted_morse_code = [
    {   'code': ['.'], 'cost': 1, 'original_char': 'E'},
    {   'code': ['.', '.'], 'cost': 3, 'original_char': 'I'},
    {   'code': ['-'], 'cost': 3, 'original_char': 'T'},
    {   'code': ['.', '-'], 'cost': 5, 'original_char': 'A'},
    {   'code': ['-', '.'], 'cost': 5, 'original_char': 'N'},
    {   'code': ['.', '.', '.'], 'cost': 5, 'original_char': 'S'},
    {   'code': ['-', '.', '.'], 'cost': 7, 'original_char': 'D'},
    {   'code': ['.', '.', '.', '.'], 'cost': 7, 'original_char': 'H'},
    {   'code': ['-', '-'], 'cost': 7, 'original_char': 'M'},
    {   'code': ['.', '-', '.'], 'cost': 7, 'original_char': 'R'},
    {   'code': ['.', '.', '-'], 'cost': 7, 'original_char': 'U'},
    {   'code': ['-', '.', '.', '.'], 'cost': 9, 'original_char': 'B'},
    {   'code': ['.', '.', '-', '.'], 'cost': 9, 'original_char': 'F'},
    {   'code': ['-', '-', '.'], 'cost': 9, 'original_char': 'G'},
    {   'code': ['-', '.', '-'], 'cost': 9, 'original_char': 'K'},
    {   'code': ['.', '-', '.', '.'], 'cost': 9, 'original_char': 'L'},
    {   'code': ['.', '.', '.', '-'], 'cost': 9, 'original_char': 'V'},
    {   'code': ['.', '-', '-'], 'cost': 9, 'original_char': 'W'},
    {   'code': ['-', '.', '-', '.'], 'cost': 11, 'original_char': 'C'},
    {   'code': ['-', '-', '-'], 'cost': 11, 'original_char': 'O'},
    {   'code': ['.', '-', '-', '.'], 'cost': 11, 'original_char': 'P'},
    {   'code': ['-', '.', '.', '-'], 'cost': 11, 'original_char': 'X'},
    {   'code': ['-', '-', '.', '.'], 'cost': 11, 'original_char': 'Z'},
    {   'code': ['.', '-', '-', '-'], 'cost': 13, 'original_char': 'J'},
    {   'code': ['-', '-', '.', '-'], 'cost': 13, 'original_char': 'Q'},
    {   'code': ['-', '.', '-', '-'], 'cost': 13, 'original_char': 'Y'}]

def process(line, debug = False):
	
	#create a dictionary mapping characters to the number of times they appear
	char_freq = {}
	for c in line:
		try:
			char_freq[c] += 1
		except KeyError:
			char_freq[c] = 1
	
	#convert the dictionary to a list which we can later sort by number of appearances
	freq_list = []
	spaces_count = 0
	for char, count in char_freq.iteritems():
		if char == " ": #leave spaces out of the list as these are always 7 dots
			spaces_count = count
		else:
			freq_list.append((char, count))
	freq_list.sort(key=lambda x:-x[1]) #negative so it sorts descending
	
	if debug:
		print line
		print "spaces: " + str(spaces_count)
		
	cost = 0
	# iterate through the list of possible morse_codes, sorted with lowest cost first
	# and letters in the message, sorted by highest frequency, at the same time
	# so that the higher frequency letters get paired up with lower cost codes
	for i in range (0, len(freq_list)):
		cost += sorted_morse_code[i]['cost'] * freq_list[i][1]
		if debug:
			print str(freq_list[i]) + " " + str(sorted_morse_code[i]['code']) + " " + str(sorted_morse_code[i]['cost'])
	
	#add the cost of spaces, which is always 7 dots
	cost = cost + (spaces_count * 7)
	
	#calculate number of dots separating letters in a word
	#there will be a dot after every character EXCEPT 
	#both a space and the letter preceeding a space,
	#and the final character
	#example (Each dot is actually 3 dots)
	#
	#    ..  ...
	# "a big step"
	cost = cost + ( len(line) - 1 - 2 * spaces_count ) * 3
	return cost
	
if __name__ =='__main__':
	while(1):
		try:
			print process(raw_input(), debug=False)
		except EOFError:
			exit()
