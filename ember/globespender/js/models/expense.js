Expenses.Expense = DS.Model.extend({
  category: DS.attr('string'),
	amount: DS.attr('number'),
  currency: DS.attr('string'),
	date: DS.attr('date'),
  note: DS.attr('string'),
	place: DS.attr('string'),
	destination: DS.attr('string'),
	fxrate: DS.attr('number'),
	is_editing: DS.attr('boolean')
});

Expenses.Expense.FIXTURES = [
	{
		id: 1,
   	category: 'lunch',
		amount: 20.25,
   	currency: 'USD',
		date: new Date('2013-07-01'),
		note: 'delicious',
		place: 'New York',
		destination: '',
		fxrate: 1.00
	},
	{
		id: 2,
   	category: 'lunch',
		amount: 15.50,
   	currency: 'USD',
		date: new Date('2013-07-02'),
		note: 'delicious',
		place: 'New York',
		destination: '',
		fxrate: 1.00
	}
];
