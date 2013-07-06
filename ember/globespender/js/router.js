Expenses.Router.map(function () {
  this.resource('expenses', { path: '/' });
});

Expenses.ExpensesRoute = Ember.Route.extend({
  model: function () {
    return Expenses.Expense.find();
  }
});