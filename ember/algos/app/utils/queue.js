const MAX_INT = 1000000;

export default class Queue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size).fill(-1);
  }

  insertOrUpdate(v, cost) {
    this.queue[v] = cost;
  }

  getMin() {
    let index = -1;
    let min = MAX_INT;
    for (let i = 0; i < this.size; i++) {
      if (this.queue[i] < min && this.queue[i] !== -1) {
        min = this.queue[i];
        index = i;
      }
    }
    return index;
  }

  isEmpty() { return this.getMin() === -1; }
  extractMin() {
    let i = this.getMin();
    this.queue[i] = -1;
    return i;
  }
}
