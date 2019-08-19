import Component from '@ember/component';
const X = "X";
const O = "0";

class Board {
  constructor(size) {
    this.size = size;
    this.board = new Array(size * size);
  }

  get(x, y) {
    return this.getIndex(y * this.size + x);
  }

  getIndex(index) {
    return this.board[index];
  }

  setIndex(index, val) {
    this.board[index] = val;
    this.board.arrayContentDidChange(index);
  }

  isVerticalWinner(value) {
    for (let x = 0; x < this.size; x++) {
      let count = 0;
      for (let y = 0; y < this.size; y++) {
        if (this.get(x, y) === value) {
          count++;
        }
      }
      if (count === this.size) {
        return true;
      }
    }
  }

  isHorizontalWinner(value) {
    for (let y = 0; y < this.size; y++) {
      let count = 0;
      for (let x = 0; x < this.size; x++) {
        if (this.get(x, y) === value) {
          count++;
        }
      }
      if (count === this.size) {
        return true;
      }
    }
  }

  isWinner(value) {
    return this.isVerticalWinner(value) || this.isHorizontalWinner(value);
  }
}

export default Component.extend({
  tagName: '',
  size: 3,
  init() {
    this._super(...arguments);
    this.reset();
  },

  reset() {
    this.set('board', new Board(3));
    this.set('player', X);
  },

  togglePlayer() {
    this.set('player', this.player === X ? O : X);
  },

  actions: {
    play(index, player) {
      let { board } = this;
      if (board.getIndex(index)) {
        return;
      }

      board.setIndex(index, player);
      if (board.isWinner(player)) {
        alert(`player ${player} won!`);
      } else {
        this.togglePlayer();
      }
    },

    reset() {
      this.reset();
    }
  }
});
