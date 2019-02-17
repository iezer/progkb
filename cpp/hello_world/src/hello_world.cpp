#include <iostream>
#include "LinkedList.cpp"
#include "MinHeap.cpp"
#include "ArraySort.cpp"
#include "AVLTree.cpp"
#include "Graph.cpp"

using namespace std;

void testList() {
  LinkedList* a = new LinkedList();
  a->insert(1);
  a->insert(3);

  LinkedList* b = new LinkedList();
  b->insert(7);
  b->insert(8);
  b->insert(9);

  a->print();
  b->print();

  a->concat(*b);
  a->print();
}

void testHeap() {
  MinHeap* q = new MinHeap();
  try {
    q->getMin();
  } catch(const std::exception& e) {
    cout << "caught error: " << e.what() << endl;
  }
  q->insert(10);
  q->insert(8);
  q->insert(7);

  q->print();
  q->insert(9);
  q->insert(4);
  q->print();

  cout << "min: " << q->extractMin() << ", capacity " << q->capacity << ", size " << q->size << endl;
  q->print();
  cout << "min: " << q->extractMin() << ", capacity " << q->capacity << ", size " << q->size << endl;
  cout << "min: " << q->extractMin() << ", capacity " << q->capacity << ", size " << q->size << endl;
  cout << "min: " << q->extractMin() << ", capacity " << q->capacity << ", size " << q->size << endl;
  cout << "min: " << q->extractMin() << ", capacity " << q->capacity << ", size " << q->size << endl;
}

void testQuicksort() {
  int a[] = {8, 8,8,8,8, 10, 2, 9, 3, 8, 4, 7, 10};
  size_t length = sizeof(a) / sizeof(*a);
  ArraySort::print(a, length);
  ArraySort::quicksort(a, 0, length - 1);
  ArraySort::print(a, length);
}

void testMergesort() {
  int a[] = {8, 8, 8, 8, 8, 10, 2, 9, 3, 8, 4, 7, 10};
  size_t length = sizeof(a) / sizeof(*a);

  ArraySort::print(a, length);
  ArraySort::mergesort(a, length - 1);
  ArraySort::print(a, length);
}

void testAVL() {
  AVLTree* tree = new AVLTree();

  int a[]= {10, 2, 20, 5, 25, 15, 12, 18, 16 };
  size_t length = sizeof(a) / sizeof(*a);
  for (size_t i = 0; i < length; i++) {
    cout << " insert " << i << " " << a[i] << endl;
    tree->insert(a[i]);
  }

  cout << "preorder: ";
  tree->preOrderPrint();
  // cout << endl << "in order: ";
  // tree->inOrderPrint();
  cout << endl;

  //tree->root->right = tree->rightRotation(tree->root->right);

  cout << "preorder: ";
  tree->preOrderPrint();
  // cout << endl << "in order: ";
  // tree->inOrderPrint();
  cout << endl;

  delete tree;
}

void testShortestPath() {
  Graph* graph = new Graph(5);
  graph->setEdge(0, 1, 10);
  graph->setEdge(0, 4, 3);
  graph->setEdge(1, 2, 2);
  graph->setEdge(1, 4, 4);
  graph->setEdge(2, 3, 9);
  graph->setEdge(3, 2, 7);
  graph->setEdge(4, 1, 1);
  graph->setEdge(4, 2, 8);
  graph->setEdge(4, 3, 2);

  graph->shortestPath(0, 2);
}

void testMST() {
  Graph* graph = new Graph(5, true);

  //                   {0, 2, 0, 6, 0},
  //                   {2, 0, 3, 8, 5},
  //                   {0, 3, 0, 0, 7},
  //                   {6, 8, 0, 0, 9},
  //                   {0, 5, 7, 9, 0}};


  graph->setEdge(0, 1, 2);
  graph->setEdge(0, 3, 6);
  graph->setEdge(1, 2, 3);
  graph->setEdge(1, 3, 8);
  graph->setEdge(1, 4, 5);
  graph->setEdge(2, 4, 7);
  graph->setEdge(3, 4, 9);

  graph->minimumSpanningTree();
}

int main() {
  testMST();
  return 0;
}
