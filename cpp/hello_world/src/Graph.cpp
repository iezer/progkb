#include <cstring>
#include <iostream>
#include "MinHeap.cpp"

using namespace std;

const int MAX_INT = 10000;

class Graph {
public:
  size_t size;
  bool isUndirected;
  int* graph;

  Graph(size_t size, bool isUndirected = false) {
    this->size = size;
    this->isUndirected = isUndirected;
    graph = new int[size * size];
    for (size_t i = 0; i < size * size; i++) {
      graph[i] = 0;
    }
  }

  ~Graph() {
    delete[] graph;
  }

  int getEdge(size_t a, size_t b) {
    return graph[ a * size + b ];
  }

  void setEdge(size_t a, size_t b, int cost) {
    graph[ a * size + b] = cost;

    if (isUndirected) {
      graph[ b * size + a] = cost;
    }
  }

  int* shortestPath(size_t start, size_t finish) {
    int* parents = new int[size];
    int* weights = new int[size];
    MinHeap* q = new MinHeap();

    for (size_t i = 0 ; i < size; i++) {
      parents[i] = -1;
      weights[i] = MAX_INT;
    }

    weights[start] = 0;
    q->insert(start, 0);

    int currentCost = 0;
    size_t current;
    while(!q->isEmpty()) {
      current = q->extractMin();
      currentCost = weights[current];
      cout << "looping node " << current << " cost " << currentCost << endl;
      // todo use iterator
      // todo make minheap template
      for (size_t edge = 0; edge < size; edge++) {
        int edgeCost = getEdge(current, edge);
        if (edgeCost <= 0) {
          continue;
        }
        cout << "edge " << current << " -> " << edge << " (" << edgeCost << ")" << endl;

        int totalCost = edgeCost + currentCost;

        if (totalCost < weights[edge]) {
          weights[edge] = totalCost;
          parents[edge] = current;
          q->insertOrDecrease(edge, totalCost);
        }
      }
    }


    cout << " total cost " << weights[finish] << endl;

    int* path = new int[size];
    int* cost = new int[size];
    for (int i = 0; i < size; i++) {
      path[i] = -1;
      cost[i] = 0;

      cout << "parents " << i << ": " << parents[i] << endl;
      cout << "weights " << i << ": " << weights[i] << endl;
    }

    int index = 0;
    current = finish;
    while(current != start) {
      path[index] = current;
      cost[index] = weights[current];

      cout << path[index] << " (" << cost[index] << ") ->";
      index++;
      current = parents[current];
    }


    delete q;
    delete[] parents;
    delete[] weights;

    return path;
  }

  int* minimumSpanningTree() {
    int* parents = new int[size];
    bool* seen = new bool[size];
    int* weights = new int[size];
    MinHeap* q = new MinHeap();

    for (size_t i = 0; i < size; i ++) {
      parents[i] = 0;
      weights[i] = MAX_INT;
      seen[i] = false;
    }

    weights[0] = 0;
    parents[0] = -1;
    q->insert(0, 0);
    for (size_t count = 1 ; count < size; count++) {
      int minIndex = q->extractMin();

      seen[minIndex] = true;

      for(size_t i = 0; i < size; i++) {
        int edgeCost = getEdge(minIndex, i);
        if (edgeCost <= 0 || seen[i]) {
          continue;
        }

        if (edgeCost < weights[i]) {
          weights[i] = edgeCost;
          q->insertOrDecrease(i, edgeCost);
          parents[i] = minIndex;
        }
      }
    }

    for (size_t i = 1; i < size; i++) {
      cout << i << " - " << parents[i] << " (" << weights[i] << ")" << endl;
    }

    delete[] weights;
    delete[] seen;
    delete q;
    return parents;
  }
};
