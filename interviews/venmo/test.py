import venmo
import unittest

class TestVenmo(unittest.TestCase):

	def setUp(self):
		self.console = venmo.VenmoConsole()
		self.console.preloop()
		from StringIO import StringIO
		self.out = StringIO()
	
	def tearDown(self):
		self.console.postloop(self.out)

	def test_add_users(self):
		self.console.do_user("isaac_e-5")
		self.assertIn("isaac_e-5", self.console._users)

	def test_add_duplicate_users(self):
		self.console.do_user("isaac", self.out)
		self.assertIn("isaac", self.console._users)
		self.console.do_user("isaac", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User isaac already exists.")
		
	def test_add_user_too_small(self):
		self.console.do_user("ike", self.out)
		self.assertNotIn("ike", self.console._users)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User name ike is too short. Must be between 4 and 15 chars.")

	def test_add_user_too_large(self):
		self.console.do_user("1234567890123456", self.out)
		self.assertNotIn("ike", self.console._users)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User name 1234567890123456 is too long. Must be between 4 and 15 chars.")			

	def test_add_user_alphanum(self):
		self.console.do_user("isaac_$@", self.out)
		self.assertNotIn("ike", self.console._users)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User name isaac_$@ must only contain alphanumerals, underscores, or dashes.")			

	def test_zero_balance(self):
		self.console.do_user("isaac", self.out)
		self.console.do_balance("isaac", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "$0.00")
			
	def test_card(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.assertIn("4111111111111111", self.console._users["isaac"]["cards"])

	def test_card_fail_lun10(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 1234567890123456", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Card fails Lunh-10 checksum validation.")


	def test_card_alpha(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 123abc", self.out)
		self.assertEquals(len(self.console._users["isaac"]["cards"]), 0)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Credit card can only contain numbers.")
			
	def test_card_too_long(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 12345678901234567890", self.out)
		self.assertEquals(len(self.console._users["isaac"]["cards"]), 0)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Credit cards may be a maximum of 19 digits.")
		
	def test_two_cards(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("isaac 5454545454545454", self.out)
		self.assertIn("4111111111111111", self.console._users["isaac"]["cards"])
		self.assertIn("5454545454545454", self.console._users["isaac"]["cards"])
		self.assertEquals(len(self.console._users["isaac"]["cards"]), 2)
			
	def test_card_duplicate(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.assertIn("4111111111111111", self.console._users["isaac"]["cards"])
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Card has already been added.")

	def test_card_two_users(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("dave 5454545454545454", self.out)
		self.assertIn("4111111111111111", self.console._users["isaac"]["cards"])
		self.assertIn("5454545454545454", self.console._users["dave"]["cards"])

	def test_card_fraud(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("dave 4111111111111111", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: This card has already been added by another user, reported for fraud!")

	def test_card_no_user(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("dave 4111111111111111", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User dave does not exist in the system.")

	def test_card_no_args(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Wrong number of arguments. add user cc_number")
			
	def test_balance_error(self):
		self.console.do_balance("dave", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR:  User dave not registered.")
	
	def test_pay(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_pay("isaac dave $5.50 lunch", self.out)
		self.assertEquals(self.console._users["dave"]["balance"], 5.5)
		self.assertEquals(self.console._users["isaac"]["balance"], 0)
		self.console.do_balance("dave", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "$5.50")

	def test_pay_note_with_spaces(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_pay("isaac dave $5.50 lunch with two beers", self.out)
		self.assertEquals(self.console._users["dave"]["balance"], 5.5)
		self.assertEquals(self.console._users["isaac"]["balance"], 0)
		self.console.do_balance("dave", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "$5.50")
			
	def test_pay_no_actor(self):
		self.console.do_user("dave", self.out)
		self.console.do_pay("isaac dave $5.50 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User isaac not registered.")
			
	def test_pay_no_target(self):
		self.console.do_user("isaac", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_pay("isaac dave $5.50 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User dave not registered.")

	def test_pay_no_card(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_pay("isaac dave $5.50 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: User isaac does not have a credit card.")

	def test_pay_no_note(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_pay("isaac dave $5.50", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Wrong number of arguments. pay actor target amount note.")

	def test_pay_bad_value(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_pay("isaac dave $5.50bleh lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Invalid value! $5.50bleh")			

	def test_pay_zero(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_pay("isaac dave $0.0 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: You cannot pay a negative or 0 value.")

	def test_pay_negative(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_pay("isaac dave $-5.0 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: You cannot pay a negative or 0 value.")
			
	def test_pay_no_dollar_sign(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_pay("isaac dave 5.50 lunch beers", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "ERROR: Missing Dollar sign $")
		
	def test_feed(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("dave 5454545454545454", self.out)
		self.console.do_pay("isaac dave $5.50 lunch beers", self.out)
		self.console.do_pay("dave isaac $8.75 taxi cab", self.out)
		self.console.do_pay("isaac dave $4.50 dinner", self.out)
		self.assertEquals(self.console._users["dave"]["balance"], 10.0)
		self.assertEquals(self.console._users["isaac"]["balance"], 8.75)
		self.console.do_feed("isaac", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "-- You paid dave $5.50 for lunch beers\n-- dave paid you $8.75 for taxi cab\n-- You paid dave $4.50 for dinner")
		
	def test_feed2(self):
		self.console.do_user("isaac", self.out)
		self.console.do_user("dave", self.out)
		self.console.do_add("isaac 4111111111111111", self.out)
		self.console.do_add("dave 5555555555554444", self.out)
		self.console.do_pay("isaac dave $5.50 lunch with two beers", self.out)
		self.console.do_pay("dave isaac $8.75 taxi cab", self.out)
		self.console.do_pay("isaac dave $4.50 dinner", self.out)
		self.assertEquals(self.console._users["dave"]["balance"], 10.0)
		self.assertEquals(self.console._users["isaac"]["balance"], 8.75)
		self.console.do_feed("dave", self.out)
		output = self.out.getvalue().strip()
		self.assertEquals(output, "-- isaac paid you $5.50 for lunch with two beers\n-- You paid isaac $8.75 for taxi cab\n-- isaac paid you $4.50 for dinner")
		
if __name__ == '__main__':
    unittest.main()