#include <cstring>
#include <iostream>
#include <stdexcept>
#include <vector>
#include <iterator>

using namespace std;

class ArraySort {
public:
  static void print(int* array, size_t length) {
    for (size_t i = 0; i < length; i++) {
      cout << array[i] << (i < length - 1 ? ", " : "");
    }
    cout << endl;
  }

  static void swap(int* array, size_t i, size_t j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  static size_t partition(int* array, int left, int right) {
    int p = (left + right) / 2;
    int value = array[p];

// 10
// 1, 2, 15, 16, 10, 4, 5, 10, 20, 3
// 1, 2, 3, 10, 5, 4, 10, 16, 20, 15
    while(left <= right) {
      while (array[left] < value) {
        left++;
      }

      while(array[right] > value) {
        right--;
      }

      if (left <= right) {
        swap(array, left, right);
        left++;
        right--;
      }
    }

    return left;
  }

  static void quicksort(int* array, int left, int right) {
    int index = partition(array, left, right);

    if (left < index - 1) {
      quicksort(array, left, index - 1);
    }

    if (index < right) {
      quicksort(array, index, right);
    }
  }

  static void merge(int* array, int* helper, int left, int middle, int right) {
    memcpy(helper + left, array + left, (right - left + 1) * sizeof(int));

    int helperLeft = left;
    int helperRight = middle + 1;
    int current = left;

    while (helperLeft <= middle && helperRight <= right) {
      if (helper[helperLeft] <= helper[helperRight]) {
        array[current++] = helper[helperLeft++];
      } else {
        array[current++] = helper[helperRight++];
      }
    }

    while (helperLeft <= middle) {
      array[current++] = helper[helperLeft++];
    }
  }

  static void mergesort(int* array, int* helper, int left, int right) {
    if (left < right) {
      int middle = (left + right) / 2;
      mergesort(array, helper, left, middle);
      mergesort(array, helper, middle + 1, right);
      merge(array, helper, left, middle, right);
    }
  }

  static void mergesort(int* array, size_t length) {
    int* helper = new int[length];
    mergesort(array, helper, 0, length - 1);
  }
};
