Expenses.ExpenseController = Ember.ObjectController.extend({

  edit: function() {
    this.set('isEditing', true);
		this.get('model').set('is_editing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
		this.get('model').set('is_editing', false);
    this.get('store').commit();
  },

	removeExpense: function () {
	  var expense = this.get('model');
	  expense.deleteRecord();
	  expense.save();
	}
});