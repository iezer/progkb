import Component from '@ember/component';
import Graph, { shortestPath } from '../utils/graph';


export default Component.extend({
  shortestPath() {
    let graph = new Graph(5);
    graph.setEdge(0, 1, 10);
    graph.setEdge(0, 4, 3);
    graph.setEdge(1, 2, 2);
    graph.setEdge(1, 4, 4);
    graph.setEdge(2, 3, 9);
    graph.setEdge(3, 2, 7);
    graph.setEdge(4, 1, 1);
    graph.setEdge(4, 2, 8);
    graph.setEdge(4, 3, 2);
    shortestPath(graph, 0, 2);
  },

  didInsertElement() {
    this._super(...arguments);
    this.shortestPath();
  }
});
