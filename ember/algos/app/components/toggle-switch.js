import Component from '@ember/component';
import { later } from '@ember/runloop';

// https://www.w3schools.com/howto/howto_css_switch.asp
export default Component.extend({
  isSelected: false,

  actions: {
    toggle() {
      this.toggleProperty('isSelected');

      later(() => {
        const el = document.querySelector('.switch input[type=checkbox]');
        console.log(`is checked? ${el.checked}`);
      });
    }
  }
});
