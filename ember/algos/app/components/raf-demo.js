import Component from '@ember/component';

export default Component.extend({
  actions: {
    startAnimation() {
       let el = document.querySelector('.raf-demo--box');
      let start;
      const width = 500 - 52;
      const animationTime = 2000;
      
      function step(ts) {
        if (!start) {
          start = ts;
        }
        let progress = ts - start;

        let translation = Math.min((progress / animationTime) * width, width);
        el.style.transform = `translateX(${translation}px)`;

        if (progress < animationTime) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    }
  }
});
