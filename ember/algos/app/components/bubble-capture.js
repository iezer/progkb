import Component from '@ember/component';

// experiment with {{action}} vs onclick={{action}} vs
// basic js onclick

export default Component.extend({
  didInsertElement() {
    this._super(...arguments); 

    let capture = function(event) {
      console.log(`capture ${this.id}`);
    };

    let bubble = function(event) {
      console.log(`bubble ${this.id}`);
    };
    
    let one = document.getElementById('one');
    let two = document.getElementById('two');
    let three = document.getElementById('three');

    [one,two,three].forEach(el => {
      el.addEventListener('click', capture, true);
      el.addEventListener('click', bubble);
    });
  },

  actions: {
    clicked(id) {
      console.log(`click action ${id}`);
    }
  }
});
