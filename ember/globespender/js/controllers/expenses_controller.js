Expenses.ExpensesController = Ember.ArrayController.extend({
	sortProperties: ['spent_at'],
	sortAscending: false,
	
  createExpense: function () {

    // Create the new model
    var expense = Expenses.Expense.createRecord({
      amount: 0.0,
      currency: 'USD',
			spent_at: new Date(),
			fxrate: 1.0,
			category: "lunch",
			place: "New York"
    });

		expense.set('is_editing', false);		
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

			days = retPlace.number_of_days == 1 ? "day" : "days";
			infoBox = "<div><b>" + retPlace.place +"</b><br>" +
								"You spent " + retPlace.number_of_days + " " + days + " here<br>" +
								"and averaged $" + retPlace.average + " per day.</div";
								
			Expenses.codeAddress(retPlace, infoBox);
			return retPlace;
		}, this);
		
		return retval;
	}.property('@each.place', '@each.date', '@each.amount', '@each.fxrate').cacheable(),
	
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
	}.property('@each.category', '@each.date', '@each.amount', '@each.fxrate').cacheable(),

	deleteAll: function () {
		if( !Expenses.getPropertyLock() ) {
			console.log("Please finish editing before creating a new expense.");
			return;
		}
		
		// For some reason only deleting half the expenses each time.
		while(this.get('length') > 0) {
			this.forEach( function(expense) {
				try {
					expense.deleteRecord();	
					expense.save();

				} catch (err) {
				}
			});
		}
		this.get('store').commit();
		Expenses.releasePropertyLock();
	},
	
	import: function() {
		var l = [
		{category: 'Dinner', amount: 169.16, currency: 'CAD', spent_at: new Date('2012-11-26'), note: '', place: 'Vancouver', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 55.8, currency: 'CAD', spent_at: new Date('2012-11-27'), note: '', place: 'Vancouver', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 30.59, currency: 'CAD', spent_at: new Date('2012-11-30'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 1.8, currency: 'CAD', spent_at: new Date('2012-12-06'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 18.2, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Tokens', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 4.2, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Moonbean', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 9, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Big fat burrito', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Toiletries', amount: 7.89, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Shampoo and q-tips', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Toiletries', amount: 2.25, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Chapstick', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Cell Phone', amount: 775, currency: 'CAD', spent_at: new Date('2012-12-06'), note: 'Tokyo phone Softbank', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 12, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5.08, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 5, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Live music cover', amount: 10, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 4.25, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'General', amount: 2.25, currency: 'CAD', spent_at: new Date('2012-12-07'), note: 'Lighter', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 19, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 15, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 5, currency: 'CAD', spent_at: new Date('2012-12-07'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Travel', amount: 133, currency: 'CAD', spent_at: new Date('2012-12-08'), note: 'Train tickets via Toronto to Montreal', place: 'Toronto', destination: 'Montreal', fxrate: 1.00},
		{category: 'Recorded Music', amount: 10.2, currency: 'CAD', spent_at: new Date('2012-12-08'), note: 'Ron davis album mp3', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Sports', amount: 128, currency: 'CAD', spent_at: new Date('2012-12-08'), note: 'Skiing in jasper', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 167.03, currency: 'CAD', spent_at: new Date('2012-12-08'), note: 'Tuxedo rental Martin wedding', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 7.35, currency: 'CAD', spent_at: new Date('2012-12-08'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 297.42, currency: 'CAD', spent_at: new Date('2012-12-08'), note: 'Winter jacket cm', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 80, currency: 'CAD', spent_at: new Date('2012-12-08'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Taxi', amount: 21, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Taxi', amount: 16, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 12, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 4.25, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 1.95, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 2, currency: 'CAD', spent_at: new Date('2012-12-09'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 4.19, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 2.88, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Taxi', amount: 16, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 24, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 3, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 6, currency: 'CAD', spent_at: new Date('2012-12-10'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 16, currency: 'CAD', spent_at: new Date('2012-12-10'), note: 'Tea camella', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'General', amount: 12, currency: 'CAD', spent_at: new Date('2012-12-10'), note: 'Museum art gallery in Montreal', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Software', amount: 2.95, currency: 'CAD', spent_at: new Date('2012-12-11'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 3.88, currency: 'CAD', spent_at: new Date('2012-12-11'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 46, currency: 'CAD', spent_at: new Date('2012-12-11'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Cell phone', amount: 28.5, currency: 'CAD', spent_at: new Date('2012-12-11'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 60, currency: 'CAD', spent_at: new Date('2012-12-12'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 1, currency: 'CAD', spent_at: new Date('2012-12-12'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 58.65, currency: 'CAD', spent_at: new Date('2012-12-12'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5.9, currency: 'CAD', spent_at: new Date('2012-12-13'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 5.65, currency: 'CAD', spent_at: new Date('2012-12-13'), note: 'Bixi', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 10.45, currency: 'CAD', spent_at: new Date('2012-12-13'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 4.5, currency: 'CAD', spent_at: new Date('2012-12-13'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 30, currency: 'CAD', spent_at: new Date('2012-12-13'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Live music cover', amount: 10, currency: 'CAD', spent_at: new Date('2012-12-13'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 85, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 3.25, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 18.2, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5.25, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 45, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 3, currency: 'CAD', spent_at: new Date('2012-12-14'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 9.5, currency: 'CAD', spent_at: new Date('2012-12-16'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Sports', amount: 50, currency: 'CAD', spent_at: new Date('2012-12-16'), note: 'Personal trainer Tajh', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 7.25, currency: 'CAD', spent_at: new Date('2012-12-16'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dry cleaning', amount: 23.4, currency: 'CAD', spent_at: new Date('2012-12-16'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Software', amount: 12, currency: 'CAD', spent_at: new Date('2012-12-16'), note: 'Github', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5.75, currency: 'CAD', spent_at: new Date('2012-12-17'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Gambling', amount: -145, currency: 'CAD', spent_at: new Date('2012-12-18'), note: 'Poker', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 30, currency: 'CAD', spent_at: new Date('2012-12-18'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 4.06, currency: 'CAD', spent_at: new Date('2012-12-18'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 6.95, currency: 'CAD', spent_at: new Date('2012-12-18'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'General', amount: 10.95, currency: 'CAD', spent_at: new Date('2012-12-18'), note: 'Padlock', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 10, currency: 'CAD', spent_at: new Date('2012-12-18'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 50, currency: 'CAD', spent_at: new Date('2012-12-19'), note: 'Wine at lcbo', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 42, currency: 'CAD', spent_at: new Date('2012-12-19'), note: 'undershirts at Winners', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 50.17, currency: 'CAD', spent_at: new Date('2012-12-19'), note: 'Sweater banana republic', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 50.85, currency: 'CAD', spent_at: new Date('2012-12-19'), note: 'Bow tie', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Haircut', amount: 98.14, currency: 'CAD', spent_at: new Date('2012-12-19'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Cell phone', amount: 29.25, currency: 'CAD', spent_at: new Date('2012-12-20'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Cell phone', amount: 28.25, currency: 'CAD', spent_at: new Date('2012-12-20'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 10.5, currency: 'CAD', spent_at: new Date('2012-12-20'), note: 'Ttc day pass', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 5.54, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Live music cover', amount: 15, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 10, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 5, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 5.92, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 13, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 18.2, currency: 'CAD', spent_at: new Date('2012-12-21'), note: 'Tokens', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 16, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Bank fee', amount: 1.5, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5, currency: 'CAD', spent_at: new Date('2012-12-21'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 152.55, currency: 'CAD', spent_at: new Date('2012-12-21'), note: 'pants at Toms Place', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 50.85, currency: 'CAD', spent_at: new Date('2012-12-21'), note: 'accessories at Toms Place', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Recorded Music', amount: 17.66, currency: 'CAD', spent_at: new Date('2012-12-22'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Travel', amount: 71, currency: 'CAD', spent_at: new Date('2012-12-22'), note: 'Train Amtrak New York - Boston', place: 'New York', destination: 'Boston', fxrate: 1.00},
		{category: 'Cell phone', amount: 28.25, currency: 'CAD', spent_at: new Date('2012-12-22'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 9.5, currency: 'CAD', spent_at: new Date('2012-12-22'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Clothes', amount: 3, currency: 'CAD', spent_at: new Date('2012-12-22'), note: 'price adjustment at Winners', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 12.1, currency: 'CAD', spent_at: new Date('2012-12-22'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 2, currency: 'CAD', spent_at: new Date('2012-12-23'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 2, currency: 'CAD', spent_at: new Date('2012-12-23'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Charity', amount: 2.5, currency: 'CAD', spent_at: new Date('2012-12-23'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 5, currency: 'CAD', spent_at: new Date('2012-12-23'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Software', amount: 1, currency: 'CAD', spent_at: new Date('2012-12-23'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'General', amount: 6.07, currency: 'CAD', spent_at: new Date('2012-12-25'), note: 'Superglue', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 1.99, currency: 'CAD', spent_at: new Date('2012-12-25'), note: '', place: 'Montreal', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 123.05, currency: 'CAD', spent_at: new Date('2012-12-27'), note: '', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Travel', amount: 84, currency: 'CAD', spent_at: new Date('2012-12-27'), note: 'Greyhound bus montreal to New York', place: 'Montreal', destination: 'New York', fxrate: 1.00},
		{category: 'Theatre tickets', amount: 142, currency: 'CAD', spent_at: new Date('2012-12-29'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 7.5, currency: 'CAD', spent_at: new Date('2012-12-29'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 102, currency: 'CAD', spent_at: new Date('2012-12-29'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 26, currency: 'CAD', spent_at: new Date('2012-12-29'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Live music cover', amount: 250, currency: 'CAD', spent_at: new Date('2012-12-30'), note: 'Wynton jalc', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 90.75, currency: 'CAD', spent_at: new Date('2012-12-30'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 38, currency: 'CAD', spent_at: new Date('2012-12-30'), note: 'Katz deli w Jono', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 90, currency: 'CAD', spent_at: new Date('2012-12-30'), note: 'New Years dinner at tamarind', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 16, currency: 'CAD', spent_at: new Date('2012-12-30'), note: 'Drinks for Monicas friends New Years party', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 12, currency: 'CAD', spent_at: new Date('2012-12-30'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 24, currency: 'CAD', spent_at: new Date('2012-12-31'), note: 'Swing 46 w mom', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 7, currency: 'CAD', spent_at: new Date('2013-01-01'), note: 'W Ali Afsari', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Drinks', amount: 19, currency: 'CAD', spent_at: new Date('2013-01-01'), note: 'W Ali Afsari', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 50, currency: 'CAD', spent_at: new Date('2013-01-01'), note: 'Heartland brewery with adam lee', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Breakfast', amount: 7, currency: 'CAD', spent_at: new Date('2013-01-01'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Breakfast', amount: 7, currency: 'CAD', spent_at: new Date('2013-01-01'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5.74, currency: 'CAD', spent_at: new Date('2013-01-01'), note: '', place: 'New York', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 10, currency: 'CAD', spent_at: new Date('2013-01-02'), note: 'Parking', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 54.03, currency: 'CAD', spent_at: new Date('2013-01-02'), note: 'With Shawn pre-Louis CK', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 6.62, currency: 'CAD', spent_at: new Date('2013-01-02'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 25, currency: 'CAD', spent_at: new Date('2013-01-03'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Swing dance', amount: 15, currency: 'CAD', spent_at: new Date('2013-01-03'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 20, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 5, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Museum', amount: 6, currency: 'CAD', spent_at: new Date('2013-01-04'), note: 'Mapparium', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Coffee', amount: 10, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Snack', amount: 2.75, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 26, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 15, currency: 'CAD', spent_at: new Date('2013-01-04'), note: 'Boston metro', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Transit', amount: 13.5, currency: 'CAD', spent_at: new Date('2013-01-04'), note: 'Boston commuter train', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 8, currency: 'CAD', spent_at: new Date('2013-01-04'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Dinner', amount: 18, currency: 'CAD', spent_at: new Date('2013-01-05'), note: 'groceries with Shawn', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Software', amount: 11.2, currency: 'CAD', spent_at: new Date('2013-01-06'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Recorded Music', amount: 15, currency: 'CAD', spent_at: new Date('2013-01-06'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Recorded Music', amount: 51, currency: 'CAD', spent_at: new Date('2013-01-06'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Software', amount: 2.5, currency: 'CAD', spent_at: new Date('2013-01-06'), note: '', place: 'Boston', destination: '', fxrate: 1.00},
		{category: 'Travel', amount: 81.06, currency: 'CAD', spent_at: new Date('2013-01-06'), note: 'Flight Boston to Toronto on porter', place: 'Boston', destination: 'Toronto', fxrate: 1.00},
		{category: 'Cell Phone', amount: 146.24, currency: 'CAD', spent_at: new Date('2013-01-06'), note: 'Tokyo phone Softbank', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Lunch', amount: 10, currency: 'CAD', spent_at: new Date('2013-01-06'), note: 'with Shawn and Sachiko before flight', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Bowtie sales', amount: -180, currency: 'CAD', spent_at: new Date('2013-01-07'), note: 'In montreal, 2 for Suzanne, 1 for Alex, and one for MCs BF', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Sewing', amount: 9, currency: 'CAD', spent_at: new Date('2013-01-07'), note: 'Notions for bowties, plastic buttons and clasps for adjustable', place: 'Toronto', destination: '', fxrate: 1.00},
		{category: 'Sewing', amount: 22.58, currency: 'CAD', spent_at: new Date('2013-01-07'), note: 'Fabric for baby bowtie', place: 'Toronto', destination: '', fxrate: 1.00}
		];
		
		if( !Expenses.getPropertyLock() ) {
			console.log("Please finish editing before creating a new expense.");
			return;
		}
				
		l.forEach( function(item) {

			var expense = Expenses.Expense.createRecord(item);
			expense.save();
		});
		Expenses.releasePropertyLock();
	}
});