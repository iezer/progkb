Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    // additional child routes    
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return Todos.Todo.find();
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function () {
    return Todos.Todo.find();
  }
});

Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    // additional child routes    
    this.route('active');
  });
});

// ... additional lines truncated for brevity ...

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return Todos.Todo.filter(function (todo) {
      if (!todo.get('isCompleted')) { return true; }
    });
  },
  renderTemplate: function(controller){
    this.render('todos/index', {controller: controller});
  }
});