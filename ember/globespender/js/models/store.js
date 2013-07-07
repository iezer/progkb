Expenses.Store = DS.Store.extend({
  revision: 12,
  adapter: 'Expenses.LSAdapter'
});

Expenses.LSAdapter = DS.LSAdapter.extend({
  namespace: 'expenses-emberjs'
});