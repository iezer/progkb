import Component from '@ember/component';
import { later } from '@ember/runloop';

// https://medium.com/@roderickhsiao/implement-smooth-scrolling-79efb20b6535

export default Component.extend({
  actions: {
    scrollTo(target) {
      console.log(`scroll to ${target}`);
      const body = document.querySelector('body');
      const el = document.getElementById(target);
      const bodyRect = body.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - bodyRect.top;

      later(() => {
        window.scrollTo(0, offset);
      });
    }
  }
});
