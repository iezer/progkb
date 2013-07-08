Expenses.ExpensesController = Ember.ArrayController.extend({
	
  createExpense: function () {
    // Create the new Todo model
    var expense = Expenses.Expense.createRecord({
      amount: 0.0,
      ccy: 'USD',
			date: new Date(),
			is_editing: true,
			fxrate: 1.0,
			category: "lunch",
			place: "New York"
    });

    // Save the new model
		//expense.beginPropertyChanges();
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
		// Clear the map, we'll put new circles on with the new weights
		Expenses.markersDisplayed.forEach( function(marker) {
			marker.setMap(null);
		});
		
		places = this.mapProperty('place').uniq();
		var retval = places.map(function (p) {
			expenses_from_place = this.filter(function(item) {
				if (item.get('place') == p) { return true; }
			});
			
			number_of_days = expenses_from_place.mapProperty('dateString').uniq().get('length');
			total_spent = expenses_from_place.reduce(function (prevVal, item) {
				return prevVal + Number(item.get('amount')) * Number(item.get('fxrate'));
			}, 0.0);
			retPlace = { 	"place": p,
								"number_of_days": number_of_days,
								"total_spent": total_spent,
								"average": (total_spent/number_of_days).toFixed(2) };

			infoBox = "<div><b>" + retPlace.place +"</b><br>" +
								"You spent " + retPlace.number_of_days + " days here<br>" +
								"and averaged $" + retPlace.average + " per day.</div";
								
			Expenses.codeAddress(retPlace, infoBox);
			return retPlace;
		}, this);
		
		return retval;
	}.property('@each.place', '@each.date').cacheable(),
	
	categoryStats: function () {
		total_number_of_days = this.mapProperty('dateString').uniq().get('length');
		categories = this.mapProperty('category').uniq();

		var retval = categories.map(function (c) {
			expenses_for_category = this.filter(function(item) {
				if (item.get('category') == c) { return true; }
			});

			total_spent = expenses_for_category.reduce(function (prevVal, item) {
				return prevVal + Number(item.get('amount')) * Number(item.get('fxrate'));
			}, 0.0);
			return { 	"name": c,
								"total_number_of_days": total_number_of_days,
								"total_spent": total_spent,
								"monthly_average": (total_spent/total_number_of_days * 30).toFixed(2) };
		}, this);
		
		return {	"total_number_of_days": total_number_of_days,
							"categories_list": retval};
	}.property('@each.category', '@each.date').cacheable(),

});