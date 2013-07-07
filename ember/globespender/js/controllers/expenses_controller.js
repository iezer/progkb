Expenses.ExpensesController = Ember.ArrayController.extend({
  createExpense: function () {
    // Create the new Todo model
    var expense = Expenses.Expense.createRecord({
      amount: 0.0,
      ccy: 'USD',
			date: new Date(),
			is_editing: true
    });

    // Save the new model
    expense.save();
  }
});