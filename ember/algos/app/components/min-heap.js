import Component from '@ember/component';

class MinHeap {
  constructor(capacity = 20) {
    this.capacity = capacity;
    this.size = 0;
    this.q = new Array(capacity);
  }

  insert(value) {
    if (this.size >= this.capacity) {
      throw new Error('out of space'); // TODO can implement growing heap.
    }

    let i = this.size++;
    this.q[i] = value;
    this.bubbleUp(i);
    this.q.arrayContentDidChange(0, this.capacity);
  }

  popMin() {
    let min = this.q[0];
    this.q[0] = this.q[this.size - 1];
    this.q[--this.size] = null;
    this.bubbleDown(0);
    this.q.arrayContentDidChange(0, this.capacity);
    return min;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    let temp = this.q[i];
    this.q[i] = this.q[j];
    this.q[j] = temp;
  }

  bubbleUp(i) {
    if (i === 0) { return; }
    let p = this.parent(i);
    let { q } = this;
    if (q[i] > q[p]) {
      return;
    }

    this.swap(i, p);
    this.bubbleUp(p);
  }

  left(i) {
    return (i * 2) + 1;
  }

  right(i) {
    return (i * 2) + 2;
  }

  bubbleDown(i) {
    let smallest = i;
    let left = this.left(smallest);
    let right = this.right(smallest);
    let { q, size } = this;
    if (left < size && q[left] < q[smallest]) {
      smallest = left;
    }
    if (right < size && q[right] < q[smallest]) {
      smallest = right;
    }
    if (smallest === i) {
      return;
    }

    this.swap(i, smallest);
    this.bubbleDown(smallest);
  }
}

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('q', new MinHeap());
  },

  input: '10,8,7,9,4',

  actions: {
    insert(v) {
      v.split(',').map(s => {
        this.q.insert(parseInt(s));
      });
    },

    popMin() {
      this.q.popMin();
    }
  }
});
