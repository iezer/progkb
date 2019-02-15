#include <cstring>
#include <iostream>
#include <stdexcept>

using namespace std;

class MinHeap {
public:
  unsigned int capacity;
  unsigned int size;
  int* heap;

  MinHeap(int _capacity = 4) {
    capacity = _capacity;
    size = 0;
    heap = new int[capacity];
  }

  int parent(int i) {
    return (i - 1) / 2;
  }

  void swap(int i, int j) {
    int temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  void increaseCapacity() {
    int* newHeap = new int[capacity * 2];
    memcpy(newHeap, heap, capacity * sizeof(int));
    delete[] heap;
    capacity = capacity * 2;
    heap = newHeap;
  }

  void decreaseCapacity() {
    if (capacity <= 2) {
      return;
    }
    capacity = capacity / 2;
    int* newHeap = new int[capacity];
    memcpy(newHeap, heap, capacity * sizeof(int));
    delete[] heap;
    heap = newHeap;
  }

  void insert(int value) {
    if (size >= capacity) {
      increaseCapacity();
    }

    int i = size;
    size++;
    heap[i] = value;

    while (i != 0 && heap[parent(i)] > heap[i]) {
      int p = parent(i);
      swap(i, p);
      i = p;
    }
  }

  int getMin() {
    if (size == 0) {
      throw std::runtime_error("Empty heap");
    }

    return heap[0];
  }

  unsigned int left(int i) {
    return (i * 2) + 1;
  }

  unsigned int right(int i) {
    return (i * 2) + 2;
  }

  void minHeapify(unsigned int i) {
    unsigned int left = this->left(i);
    unsigned int right = this->right(i);
    unsigned int smallest = i;

    if (left < size && heap[left] < heap[smallest]) {
      smallest = left;
    }

    if (right < size && heap[right] < heap[smallest]){
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

    int min = heap[0];

    size--;

    heap[0] = heap[size];
    minHeapify(0);

    if (size - 1 < capacity / 4) {
      decreaseCapacity();
    }

    return min;
  };

  void print() {
    cout << "size: " << size << ", capacity: " << capacity << "; ";
    for (size_t i = 0; i < size; i++) {
      cout << heap[i] << (i < size -1 ? ", " : "");
    }
    cout << endl;
  }
};
