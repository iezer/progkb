#include <cstring>
#include <iostream>
#include <stdexcept>
#include <vector>
#include "MinHeap.cpp"

using namespace std;

#pragma once

class MinHeapVector {
public:
  vector<HeapNode> heap;
  vector<int> positions;

  MinHeapVector(int maxValue = 20) {
    heap = vector<HeapNode>(0);
    positions = vector<int>(maxValue + 1);

    for (int i = 0; i <= maxValue; i++) {
      positions[i] = -1;
    }
  }

  int parent(int i) {
    return (i <= 0) ? 0 : (i - 1) / 2;
  }

  void swap(int i, int j) {
    HeapNode temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;

    positions[heap[i].value] = i;
    positions[heap[j].value] = j;

  }

  void insert(int value) {
    insert(value, value);
  }

  void insertOrDecrease(int value, int priority) {
    if (positions[value] != -1) {
      decreaseKey(value, priority);
    } else {
      insert(value, priority);
    }
  }

  size_t getSize() {
    return heap.size();
  }

  int getCapacity() {
    return heap.capacity();
  }

  void insert(int value, int priority) {
    size_t i = getSize();
    heap.push_back(HeapNode(value, priority));

    positions[value] = i;
    bubbleUp(i);
  }

  void bubbleUp(size_t i) {
    while (i != 0 && heap[parent(i)].priority > heap[i].priority) {
      int p = parent(i);
      swap(i, p);
      i = p;
    }
  }

  int getMin() {
    if (heap.empty()) {
      throw std::runtime_error("Empty heap");
    }

    return heap[0].value;
  }

  unsigned int left(int i) {
    return (i * 2) + 1;
  }

  unsigned int right(int i) {
    return (i * 2) + 2;
  }

  bool isEmpty() {
    return heap.empty();
  }

  void bubbleDown(unsigned int i) {
    unsigned int left = this->left(i);
    unsigned int right = this->right(i);
    unsigned int smallest = i;
    size_t size = getSize();

    if (left < size && heap[left].priority < heap[smallest].priority) {
      smallest = left;
    }

    if (right < size && heap[right].priority < heap[smallest].priority) {
      smallest = right;
    }

    if (smallest != i) {
      swap(smallest, i);
      bubbleDown(smallest);

    }
  }

  int extractMin() {
    if (isEmpty()) {
      throw std::runtime_error("Empty heap");
    }

    int min = heap[0].value;
    size_t size = getSize();

    heap[0] = heap[size - 1];
    heap.pop_back();

    positions[min] = -1;
    positions[heap[0].value] = 0;
    bubbleDown(0);

    return min;
  };

  void decreaseKey(int value, int priority) {
    int index = positions[value];
    if (index == -1) {
      return;
    }

    if (priority > heap[index].priority) {
      // error
    }

    bubbleUp(index);
  }

  void print() {
    int size = getSize();
    cout << "size: " << size << ", capacity: " << getCapacity() << "; ";
    for (size_t i = 0; i < size; i++) {
      cout << heap[i].value << (i < size -1 ? ", " : "");
    }
    cout << endl;
  }
};
