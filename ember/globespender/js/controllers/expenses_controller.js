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
  },

	uniqueCategories: function () {
	  return this.mapProperty('category').uniq();
	}.property('@each.category'),
	
	uniquePlaces: function () {
	  return this.mapProperty('place').uniq();
	}.property('@each.place'),
	
	daysInAPlace: function (p) {
		return this.filterProperty('place', p).mapProperty('dateString').uniq().count();
	}.property('@each.place'),
	
	placeStats: function () {
		places = this.mapProperty('place').uniq();

		var retval = places.map(function (p) {
			expenses_from_place = this.filter(function(item) {
				if (item.get('place') == p) { return true; }
			});
			return [p, expenses_from_place.mapProperty('dateString').uniq().get('length')];
		}, this);
		
		return retval;
	}.property('@each.place', '@each.date').cacheable()
	
});