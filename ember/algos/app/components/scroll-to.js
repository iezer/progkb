import Component from '@ember/component';
import { later } from '@ember/runloop';

// https://medium.com/@roderickhsiao/implement-smooth-scrolling-79efb20b6535

export default Component.extend({
  scrollTo(offset) {
    let animationTime = 500;

    window.scrollTo(0, offset);
    let start;
    function step(ts) {
      if (!start) {
        start = ts;
      }
      let progress = ts - start;
      let scrollDistance = Math.min(offset, (progress / animationTime) * offset);
      window.scrollTo(0, scrollDistance);

      if(progress < animationTime) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  },

  actions: {
    scrollTo(target) {
      console.log(`scroll to ${target}`);
      const body = document.querySelector('body');
      const el = document.getElementById(target);
      const bodyRect = body.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const margin = 10;
      const offset = elRect.top - bodyRect.top - margin;

      later(() => {
        this.scrollTo(offset);
      });
    }
  }
});
