#include <iostream>
using namespace std;

class Node {
public:
  int data;
  Node* next;

  Node(int d) {
    data = d;
    next = NULL;
  }
};

class LinkedList {
  Node* head;
  Node* tail;
  int length;

public:
  int getLength() {
    return length;
  }

  void concat(LinkedList& list) {
    tail->next = list.head;
    length = length + list.length;
  }

  Node* insert(int data) {
    Node* node = new Node(data);
    if (head == NULL) {
      head = node;
      tail = node;
    } else {
      tail->next = node;
      tail = node;
    }

    length++;
    return node;
  }

  void print() {
    Node* current = head;
    cout << "Length: " << length << " ";

    while (current) {
      cout << current->data;
      if (current->next != NULL) {
        cout << " -> ";
      }
      current = current->next;
    }
    cout << endl;
  }
};
