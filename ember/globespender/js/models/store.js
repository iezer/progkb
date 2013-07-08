/*
// Use Fixtures
Expenses.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});
*/

// Use LocalStorage
Expenses.Store = DS.Store.extend({
  revision: 12,
  adapter: 'Expenses.LSAdapter'
});

Expenses.LSAdapter = DS.LSAdapter.extend({
  namespace: 'expenses-emberj5'
});


