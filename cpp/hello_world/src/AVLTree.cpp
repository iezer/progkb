#include <cstring>
#include <iostream>
using namespace std;

class TreeNode {
public:
  int key;
  TreeNode* left;
  TreeNode* right;
  int height;

  TreeNode(int data) {
    key = data;
    left = NULL;
    right = NULL;
    height = 1;
  }
};

class AVLTree {
public:
  TreeNode* root;

  AVLTree() {
    root = NULL;
  }

  // TODO destroy

  int height(TreeNode* node) {
    if (node == NULL) { return 0; }
    return node->height;
  }

  int max(int a, int b) {
    return a > b ? a : b;
  }

  int balance(TreeNode* node) {
    return height(node->left) - height(node->right);
  };

  TreeNode* insert(int key) {
    TreeNode* node = insert(root, key);

    if (root == NULL){
      root = node;
    }

    return node;
  }

  TreeNode* insert(TreeNode* node, int key) {
    if (node == NULL) {
      return new TreeNode(key);
    }

    if (key < node->key) {
      node->left = insert(node->left, key);
    } else if (key > node->key) {
      node->right = insert(node->right, key);
    } else {
      // Cannot have duplicates
      return node;
    }

    /* 2. Update height of this ancestor node */
    node->height = 1 + max(height(node->left),
                           height(node->right));

    return node;
  }

  void preOrderPrint() {
    preOrderPrint(root);
  }

  void inOrderPrint() {
    inOrderPrint(root);
  }

  void preOrderPrint(TreeNode* node) {
    if (node == NULL) {
      cout << "X ";
      return;
    }

    if (node->left == NULL && node->right == NULL) {
      cout << node->key << "(" << node->height << ") ";
      return;
    }

    cout << node->key << "(" << node->height << ") ";
    preOrderPrint(node->left);
    preOrderPrint(node->right);
  }

  void inOrderPrint(TreeNode* node) {
    if (node == NULL) {
      cout << "X ";
      return;
    }

    if (node->left == NULL && node->right == NULL) {
      cout << node->key << "(" << node->height << ") ";
      return;
    }

    inOrderPrint(node->left);
    cout << node->key << "(" << node->height << ") ";
    inOrderPrint(node->right);
  }
};
