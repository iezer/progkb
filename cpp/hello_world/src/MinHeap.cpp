#include <cstring>
#include <iostream>
#include <stdexcept>

using namespace std;

#pragma once

// TODO should be a template
class HeapNode {
public:
  int priority;
  int value;

  HeapNode() {
    priority = -1;
    value = 0;
  }

  HeapNode(int p, int v) {
    priority = p;
    value = v;
  }
};

class MinHeap {
public:
  unsigned int capacity;
  unsigned int size;
  HeapNode* heap;
  int* positions;

  MinHeap(int _capacity = 4, int maxValue = 5) {
    capacity = _capacity;
    size = 0;
    heap = new HeapNode[capacity];
    positions = new int(maxValue + 1);
    for (int i = 0; i <= maxValue; i++) {
      positions[i] = -1;
    }
  }

  ~MinHeap() {
    delete[] heap;
    delete[] positions;
  }

  size_t getSize() {
    return size;
  }

  int getCapacity() {
    return capacity;
  }

  int parent(int i) {
    return (i - 1) / 2;
  }

  void swap(int i, int j) {
    HeapNode temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;

    positions[heap[i].value] = i;
    positions[heap[j].value] = j;

  }

  void increaseCapacity() {
    HeapNode* newHeap = new HeapNode[capacity * 2];
    memcpy(newHeap, heap, capacity * sizeof(HeapNode));
    delete[] heap;
    capacity = capacity * 2;
    heap = newHeap;
  }

  void decreaseCapacity() {
    if (capacity <= 2) {
      return;
    }
    capacity = capacity / 2;
    HeapNode* newHeap = new HeapNode[capacity];
    memcpy(newHeap, heap, capacity * sizeof(HeapNode));
    delete[] heap;
    heap = newHeap;
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

  void insert(int value, int priority) {
    if (size >= capacity) {
      increaseCapacity();
    }

    int i = size;
    size++;
    heap[i].value = value; heap[i].priority = priority;
    positions[value] = i;

    while (i != 0 && heap[parent(i)].priority > heap[i].priority) {
      int p = parent(i);
      swap(i, p);
      i = p;
    }
  }

  int getMin() {
    if (size == 0) {
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
    return size == 0;
  }

  void minHeapify(unsigned int i) {
    unsigned int left = this->left(i);
    unsigned int right = this->right(i);
    unsigned int smallest = i;

    if (left < size && heap[left].priority < heap[smallest].priority) {
      smallest = left;
    }

    if (right < size && heap[right].priority < heap[smallest].priority) {
      smallest = right;
    }

    if (smallest != i) {
      swap(smallest, i);
      minHeapify(smallest);

    }
  }

  int extractMin() {
    if (size == 0) {
      throw std::runtime_error("Empty heap");
    }

    int min = heap[0].value;
    size--;

    heap[0] = heap[size];

    positions[min] = -1;
    positions[heap[0].value] = 0;
    minHeapify(0);

    if (size - 1 < capacity / 4) {
      decreaseCapacity();
    }

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

    while (index > 0 && heap[parent(index)].priority < heap[index].priority) {
      int p = parent(index);
      swap(index, p);
      index = p;
    }
  }

  void print() {
    cout << "size: " << size << ", capacity: " << capacity << "; ";
    for (size_t i = 0; i < size; i++) {
      cout << heap[i].value << (i < size -1 ? ", " : "");
    }
    cout << endl;
  }
};
