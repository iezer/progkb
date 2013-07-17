import os
import cmd
import readline
import re
import sys

def price (value):
	return "${0:.2f}".format(value)

# Lunh-10 taken from http://code.activestate.com/recipes/172845-python-luhn-checksum-for-credit-card-validation/
def cardLuhnChecksumIsValid(card_number):
	""" checks to make sure that the card passes a luhn mod-10 checksum """
	sum = 0
	num_digits = len(card_number)
	oddeven = num_digits & 1

	for count in range(0, num_digits):
		digit = int(card_number[count])

		if not (( count & 1 ) ^ oddeven ):
			digit = digit * 2
		if digit > 9:
			digit = digit - 9

		sum = sum + digit

	return ( (sum % 10) == 0 )
	
class PaymentsConsole(cmd.Cmd):

  def __init__(self):
    cmd.Cmd.__init__(self)
    self.prompt = "=>> "
    self.intro  = "Welcome to Payments!"  ## defaults to None

  def do_user(self, arg, out=sys.stdout):
	if arg in self._users:
	  out.write("ERROR: User " + arg + " already exists.\n")
	elif len(arg) < 4:
	  out.write("ERROR: User name " + arg + " is too short. Must be between 4 and 15 chars.\n")
	elif len(arg) > 15:
	  out.write("ERROR: User name " + arg + " is too long. Must be between 4 and 15 chars.\n")
	elif not re.match("[\w-]+$", arg):
	  out.write("ERROR: User name " + arg + " must only contain alphanumerals, underscores, or dashes.\n")
	else:
		self._users[arg] = {'cards': [], 'balance': 0.0}

  def do_add(self, args, out=sys.stdout):
	args_list = args.split()
	if len(args_list) != 2:
	  out.write("ERROR: Wrong number of arguments. add user cc_number\n")
	  return
	
	user = args_list[0]
	card = args_list[1]
	
	if not user in self._users:
	  out.write("ERROR: User " + user + " does not exist in the system.\n")
	  return
	
	if not re.match("\d+$", card):
	  out.write("ERROR: Credit card can only contain numbers.\n")
	  return

	if len(card) > 19:
	  out.write("ERROR: Credit cards may be a maximum of 19 digits.\n")
	  return
	
	if card in self._users[user]['cards']:
	  out.write("ERROR: Card has already been added.\n")
	  return
	
	if card in self._creditcards:
	  out.write("ERROR: This card has already been added by another user, reported for fraud!\n")
	
	if not cardLuhnChecksumIsValid(card):
	  out.write("ERROR: Card fails Lunh-10 checksum validation.\n")		
	self._users[user]['cards'] += [card]
	self._creditcards += [card]

  def do_pay(self, args, out=sys.stdout):
	args_list = args.split(" ", 3)
	if len(args_list) < 4:
	  out.write("ERROR: Wrong number of arguments. pay actor target amount note.\n")
	  return
	
	actor = args_list[0]
	target = args_list[1]

	if args_list[2][0] != "$":
	  out.write("ERROR: Missing Dollar sign $\n")
	  return
		
	try:
	  amount = float(args_list[2][1:])
	except ValueError:
	  out.write("ERROR: Invalid value! " + args_list[2] + "\n")
	  return
	
	if amount <= 0:
		out.write("ERROR: You cannot pay a negative or 0 value.\n")
	note = args_list[3]
	
	if not actor in self._users:
	  out.write("ERROR: User " + actor + " not registered.\n")
	  return
	
	if not target in self._users:
	  out.write("ERROR: User " + target + " not registered.\n")
	  return
	
	if len(self._users[actor]['cards']) == 0:
	  out.write("ERROR: User " + actor + " does not have a credit card.\n")
	  return
	
	self._users[target]['balance'] += amount
	self._transactions += [(actor, target, amount, note)]
	
  def do_feed(self, args, out=sys.stdout):
	actor = args
	payments = [x for x in self._transactions if x[0] == actor or x[1] == actor]
	for x in payments:
	  if x[0] == actor:
		out.write("-- You paid " + x[1] + " " + price(x[2]) + " for " + x[3] + "\n")
	  else: #if x[1] == actor:
		out.write("-- " + x[0] + " paid you " + price(x[2]) + " for " + x[3] + "\n")

  def do_balance(self, args, out=sys.stdout):
	actor = args
	if not actor in self._users:
	  out.write("ERROR:  User " + actor + " not registered.\n")
	  return
	
	balance = self._users[actor]['balance']
	out.write(price(balance))
	
  def do_exit(self, args, out=sys.stdout):
	out.write("Thank you for using Payments.\n")
	exit()
	
  ## Override methods in Cmd object ##
  def preloop(self):
    """Initialization before prompting user for commands.
       Despite the claims in the Cmd documentaion, Cmd.preloop() is not a stub.
    """
    cmd.Cmd.preloop(self)   ## sets up command completion
    self._users    = {}
    self._transactions  = []
    self._creditcards = [] #store a reverse index of credit cards for easy validation

  def postloop(self, out=sys.stdout):
    """Take care of any unfinished business.
       Despite the claims in the Cmd documentaion, Cmd.postloop() is not a stub.
    """
    cmd.Cmd.postloop(self)   ## Clean up command completion
    out.write("Exiting...\n")

  def emptyline(self):  
    """Do nothing on empty input line"""
    pass

if __name__ == '__main__':
  console = PaymentsConsole()
  console . cmdloop()
