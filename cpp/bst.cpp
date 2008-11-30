
#include <iostream>

class Node {
public:
	Node (int i);
	~Node();
	int value;
	Node* left;
	Node* right;
};

class BST {
public:
	BST();
	BST(int i);
	~BST();
	void insert(int a);
	void print();

private:
	Node* root;
	void insert(int a, Node* current);
	void print(Node* current);
	void empty(Node* current);
};

Node::Node(int i) {
	this.value = i;
	this.left = NULL;
	this.right = NULL;
}

Node::~Node() {
	delete this.left;
	delete this.right;

BST::BST() {
	root = NULL;
}

BST::BST(int i) {
	root = new Node(i);
}

BST::~BST() {
	empty(root);
	delete(root);
}

void BST::insert (int a) {
	if (root == NULL) {
		root = new Node (a);
	} else {
		insert (a, root);
	}
}

void BST::empty(Node* current) {
	if (current->left != NULL) {
		empty (current->left);
		delete current->left;
	}

	if (current->right != NULL) {
		empty (current->right);
		delete current->right;
	}
}

void BST::insert (int a, Node* current) {
	// Assumes current not NULL
	// Does nothing if a is already in the tree.
	
	if (current->value < a) {
		if (current->left == NULL) {
			current->left = new Node(a);
		} else {
			insert (a, current->left);
		}
	} else if (current-> > a) {
		if (current->right == NULL) {
			current->right = new Node (a);
		} else {
			insert (a, current->right);
		}
	}
}

void BST::print(){
	print (root);
}

void BST::print(Node* current) {
	if (current != NULL) {
		cout << current->value;
		cout << "  ";
		print (current->left);
		print (current->right);
	}
}
