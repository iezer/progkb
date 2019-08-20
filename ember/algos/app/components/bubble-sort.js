import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  step: false,

  createLines() {
    let { a } = this;
    let container = document.querySelector('.bubble-sort');
    for (let i = 0; i < a.length; i++) {
      let line = document.createElement('div');
      line.classList = ['line'];
      line.id = `line-${i}`;
      line.style.width = `${a[i] * 10}%`;
      container.appendChild(line);
    }
    schedule('afterRender', this, 'bubbleSort');
  },

  bubbleSort: async function() {
    let { a: lines } = this;

    for (let i = 0; i < lines.length; i++) {
      for (let j = i; j < lines.length; j++) {
        if (lines[i] > lines[j]) {
          let temp = lines[j];
          lines[j] = lines[i];
          lines[i] = temp;
          this.updateLines(lines);

          await new Promise(resolve => {
            let checkStep = () => {
              setTimeout(() => {
                if (this.step) {
                  resolve();
                } else {
                  checkStep();
                }
              }, 400);
            };

            checkStep();
          });
        }
      }
    }
  },

  syncBubbleSort() { // without async/await
    let { a: lines } = this;
    let promise = Promise.resolve();
    for (let i = 0; i < lines.length; i++) {
      for (let j = i; j < lines.length; j++) {

        let doSwap = (lines, i, j) => {
          promise = promise.then(() => {
            return new Promise(resolve => {
              setTimeout(() => {
                if (lines[i] > lines[j]) {
                  let temp = lines[j];
                  lines[j] = lines[i];
                  lines[i] = temp;
                  this.updateLines(lines);
                }
                resolve();
              }, 100);
            });
          });
        };

        doSwap(lines, i, j);
      }
    }
  },

  updateLines() {
    let { a } = this;
    a.forEach((value, index) => {
      let line = document.querySelector(`#line-${index}`);
      line.style.width = `${value * 10}%`;
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this.a = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    schedule('afterRender', this, 'createLines');
  },

  actions: {
    step() {
      this.toggleProperty('step');
    }
  }
});
