#include <iostream>
#include "LinkedList.cpp"
#include "MinHeap.cpp"
#include "ArraySort.cpp"
#include "AVLTree.cpp"

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


  int a[]= {10, 2, 20, 5, 25, 11};
  size_t length = sizeof(a) / sizeof(*a);
  for (size_t i = 0; i < length; i++) {
    tree->insert(a[i]);
  }

  cout << "preorder: ";
  tree->preOrderPrint();
  cout << endl << "in order: ";
  tree->inOrderPrint();
  cout << endl;
}

int main() {
  testAVL();
  return 0;
}
