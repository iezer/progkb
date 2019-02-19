// jshint esnext: true

class AStar {
  // Grid has 1 where valid and 0 where blocked.
  constructor(grid) {
    this._grid = grid;
  }
  
  clearGrid() {
    const { _grid } = this;
    const grid = new Array(_grid.length);
    for (let x = 0; x < _grid.length; x++) {
      grid[x] = new Array(_grid[x].length);
      for (let y = 0; y < _grid[x].length; y++) {
        grid[x][y] = {
          f: 0,
          g: 0,
          h: 0,
          parent: null,
          x: x,
          y: y,
          value: _grid[x][y]
        };
      }
    }
    this.grid = grid;
    return grid;
  }
  
  manhattanHeuristic(a, b) {
    var d1 = Math.abs(b.x - a.x);
    var d2 = Math.abs(b.y - a.y);
    return d1 + d2;
  }
  
  neighbors(pos) {
    const { grid } = this;
    let ret = [];
    let { x, y} = pos;
    if (x > 0 && grid[x-1][y].value) { ret.push(grid[x-1][y]); }
    if (x < grid.length - 1 && grid[x+1][y].value) { ret.push(grid[x+1][y]); }
    if (y > 0 && grid[x][y-1].value) { ret.push(grid[x][y - 1 ]); }
    if (y < grid[x].length - 1 && grid[x][y+1].value) { ret.push(grid[x][y + 1 ]); }
    return ret;
  }
  
  search(startCoordinates, finishCoordinates) {
    this.clearGrid();
    const { grid } = this;

    let openList = [];
    let closedList = [];
    let start = grid[startCoordinates[0]][startCoordinates[1]];
    let finish = grid[finishCoordinates[0]][finishCoordinates[1]];
    openList.push(start);
    console.debug(start);
    while(openList.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i< openList.length; i++) {
        if (openList[i].f < openList[lowestIndex].f) { 
          lowestIndex = i; 
        }
      }
      let currentNode = openList[lowestIndex];

      openList.splice(lowestIndex, 1);
      closedList.push(currentNode);
      
      // base case, found end
      if (currentNode.x === finish.x && currentNode.y === finish.y) {
        return currentNode;
      }
      
      let neighbors = this.neighbors(currentNode);
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        if (closedList.includes(neighbor)) {
          continue;
        }
        
        let gScore = currentNode.g + 1;
        let foundIt = false;
        
        if (!openList.includes(neighbor)) {
          neighbor.h = this.manhattanHeuristic(neighbor, finish);
          openList.push(neighbor);
          foundIt = true;
        } else if (gScore < neighbor.g) {
          foundIt = true;
        }

        if (foundIt) {
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }

      }

    }
  }
}

const size = 10;
let grid = new Array(size);
for (let x = 0; x < size; x++) {
  grid[x] = new Array(size).fill(1);
}

// block out squares
[
  [2, 1], [3, 2], [4, 3], [4, 4], [4, 5], [3, 6]
].forEach(([x, y]) => grid[x][y] = 0);

const start = [3, 4];
const finish = [9, 4];

let graph = new AStar(grid);
graph.search(start, finish)

let current = graph.grid[9][4];
let beginning = graph.grid[3][4];

let result = [];
while (current !== beginning) {
  result.push([current.x, current.y]);
  current = current.parent;
}

result.reverse();
