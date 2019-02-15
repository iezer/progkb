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

  ~AVLTree() {
    destroyNode(root);
  }

  void destroyNode(TreeNode* node) {
    if (node == NULL) { return; }

    destroyNode(node->left);
    destroyNode(node->right);

    delete node;
  }

  int height(TreeNode* node) {
    if (node == NULL) { return 0; }
    return node->height;
  }

  int max(int a, int b) {
    return a > b ? a : b;
  }

  int getBalance(TreeNode* node) {
    return height(node->left) - height(node->right);
  };

  TreeNode* insert(int key) {
    TreeNode* node = insert(root, key);

    if (root == NULL){
      root = node;
    }

    return node;
  }

  void updateHeight(TreeNode* node) {
    node->height = 1 + max(height(node->left),
                           height(node->right));
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
    updateHeight(node);

    int balance = getBalance(node);

    // 4 cases
    if (balance > 1) {
      // LEFT LEFT
      if (key < node->left->key) {
        // in left subtree of left node
        return rightRotation(node);
      }

      // LEFT RIGHT
      if (key > node->left->key) {
        // in right subtree of left node
        node->left = leftRotation(node->left);
        return rightRotation(node);
      }
    }

    if (balance < -1) {
      // RIGHT RIGHT
      if (key > node->right->key) {
        return leftRotation(node);
      }

      // RIGHT LEFT
      if (key > node->left->key) {
        node->right = rightRotation(node->right);
        return leftRotation(node);
      }
    }

    return node;
  }

  void preOrderPrint() {
    preOrderPrint(root);
  }

  void inOrderPrint() {
    inOrderPrint(root);
  }

  void printNode(TreeNode* node) {
    cout << node->key << "(" << getBalance(node) << ") ";
  }

  void preOrderPrint(TreeNode* node) {
    if (node == NULL) {
      cout << "X ";
      return;
    }

    if (node->left == NULL && node->right == NULL) {
      printNode(node);
      cout << " | ";
      return;
    }

    printNode(node);
    preOrderPrint(node->left);
    preOrderPrint(node->right);
  }

  void inOrderPrint(TreeNode* node) {
    if (node == NULL) {
      cout << "X ";
      return;
    }

    if (node->left == NULL && node->right == NULL) {
      printNode(node);
      cout << " | ";
      return;
    }

    inOrderPrint(node->left);
    printNode(node);
    inOrderPrint(node->right);
  }

  TreeNode* rightRotation(TreeNode* node) {
    cout << "rightRotation ";
    TreeNode* newRoot = node->left;
    TreeNode* child = newRoot->right;

    newRoot->right = node;
    node->left = child;

    updateHeight(node);
    updateHeight(newRoot);

    return newRoot;
  }

  TreeNode* leftRotation(TreeNode* node) {
    cout << "leftRotation " << node->key << endl;
    TreeNode* newRoot = node->right;
    TreeNode* child = newRoot->left;
    newRoot->left = node;
    node->right = child;

    updateHeight(node);
    updateHeight(newRoot);

    return newRoot;
  }
};
