Expenses.ExpenseController = Ember.ObjectController.extend({

  edit: function() {
    this.set('isEditing', true);
		this.get('model').set('is_editing', true);
  },

  doneEditing: function() {		
		//TODO Throw on Date Parsing error and do not commit
		try {
			this.set('isEditing', false);
			this.get('model').set('is_editing', false);
			new_date_string = this.get('model').get('date');
			new_date = new Date(new_date_string);
			if (new_date.toDateString() == "Invalid Date") {
				throw "Invalid Date";
			}
			this.get('model').set('date', new_date);
    	this.get('store').commit();
		} catch (err) {
			alert (err + "Invalid Date " + this.get('model').get('date'));
		}
  },

	removeExpense: function () {
	  var expense = this.get('model');
	  expense.deleteRecord();
	  expense.save();
	}
});