Expenses.ExpenseController = Ember.ObjectController.extend({

  edit: function() {	
		if( !Expenses.getPropertyLock() ) {
			console.log("You can only edit one expense at a time.");
			return;
		}
		
    this.set('isEditing', true);
		this.get('model').set('is_editing', true);
		this.get('model').beginPropertyChanges();
		console.log ("controller.edit beginPropertychanges");
  },

  doneEditing: function() {		
		//TODO Throw on Date Parsing error and do not commit
		try {

			new_date_string = this.get('model').get('date');
			new_date = new Date(new_date_string);
			if (new_date.toDateString() == "Invalid Date") {
				throw "Invalid Date";
			}
			this.get('model').set('date', new_date);
			
			this.set('isEditing', false);
			this.get('model').set('is_editing', false);		
    	this.get('store').commit();
		} catch (err) {
			alert (err + "Invalid Date " + this.get('model').get('date'));
		}
		
		this.get('model').endPropertyChanges();
		console.log ("controller.done_editing endPropertychanges");
		Expenses.releasePropertyLock();
  },

	removeExpense: function () {
	  var expense = this.get('model');
		expense.endPropertyChanges();
		Expenses.releasePropertyLock();
		console.log ("controller.remove endPropertychanges");
	  expense.deleteRecord();
	  expense.save();
	}
});