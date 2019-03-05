// Red-Black Tree
// jshint esnext: true

// the root is black, all (null) leaves are black
// every red node has two black children
// every path from node to leaves has the same number of black children

// insert - always replace a null/black leaf with a red node
// possible violations: 
// red violation (red node with red child)
// black violation one path has more black nodes than another
// always starts with possible red violation


// Red violation N & P are red, G must be black, U can be red or black
//
//         G
//     P       U
// N 
// * cases here: U can be either red or black and N and U 
//         can both either be right or left children
// If U is red, easy, make G red, P and U black
// Then go up, might have another violation with G being red.
// If U is black, might need some rotations
//  if N and P are both LEFT children, LEFT LEFT:
// do a right rotation so P is the root, make P black, N and G red, children black.
// IF LEFT RIGHT, Make N the root (black), P and G children (red)
// Always the middle node (closest to center) becomes the root. 
// LEFT RIGHT is a left rotation on N followed by a right rotation on G,
// X becomes root, black with red children.

const RED = "red";
const BLACK = "black";

// QUEUE for level order (BFS) traversal
class LinkedListNode {
  constructor(node, next) {
    this.node = node;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.start = null;
    this.end = null;
  }
  
  insert(n) {
    let newNode = new LinkedListNode(n);
    if (!this.start) {
      this.start = this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = this.end.next;
    }
  }
  
  pop() {
    let current = this.start;
    this.start = this.start.next;
    return current.node;
  }
  
  isEmpty() {
    return !this.start;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.color = null;
    this.setRed();
  }
  
  isBlack() { return this.color === BLACK; }
  isRed() { return this.color === RED; }
  setBlack() { this.color = BLACK; }
  setRed() { this.color = RED; }
  toString() { return `${this.key} (${this.isBlack() ? "B" : "R"})`; }
  static blackHeight(node) {
    if (!node) { return 1; }
    let current = node.isBlack() ? 1 : 0;
    return current + Math.max(this.blackHeight(node.left), this.blackHeight(node.right));
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  rotateRight(node) {
    let newRoot = node.left;
    let oldChild = newRoot.right;
    
    let parent = node.parent;
    
    newRoot.right = node; 
    node.parent = newRoot;
    
    node.left = oldChild; 
    if (oldChild) {
      oldChild.parent = node;
    }
    
    if (this.root === node) {
      this.root = newRoot;
    } else {
      let isLeftChild = (parent.left === node);
      if (isLeftChild) {
        parent.left = newRoot;
        newRoot.parent = parent;
      } else {
        parent.right = newRoot;
        newRoot.parent = parent;
     }
    }
  }
  
  rotateLeft(node) {
    let newRoot = node.right;
    let oldChild = newRoot.left;
    
    let parent = node.parent;
    
    newRoot.left = node; 
    node.parent = newRoot;
    
    node.right = oldChild; 
    
    if (oldChild) {
      oldChild.parent = node;
    }
    
    if (node === this.root) {
      this.root = newRoot;
    } else {
      let isLeftChild = (parent.left === node);
      if (isLeftChild) {
        parent.left = newRoot;
        newRoot.parent = parent;
      } else {
        parent.right = newRoot;
        newRoot.parent = parent;
      }
    }
  }
  
  bstInsert(root, newNode) {
    if (!root) { return newNode; }

    if (newNode.key < root.key) { 
      root.left = this.bstInsert(root.left, newNode); 
      root.left.parent = root;
    } else if (newNode.key > root.key) {
      root.right = this.bstInsert(root.right, newNode);
      root.right.parent = root;
    }
    return root;
  }
  
  insert(k) {
    console.log(`inserting ${k}`);
    let newNode = new Node(k);
    this.root = this.bstInsert(this.root, newNode);
    this.fixViolation(newNode);
  }
  
  fixViolation(node) {
    const { root } = this;
    
    while (root !== node && node.isRed() && node.parent && node.parent.isRed()) {
      let P = node.parent;
      let G = P.parent;
      let isLeftChild = node === P.left;
      let isRightChild = !isLeftChild;
      
      if (!G) { 
        P.setBlack();
        continue;
      }
      
      let U = (G.left === P) ? G.right : G.left;
      
      if (U && U.isRed()) {
        G.setRed();
        U.setBlack();
        P.setBlack();
        node = G;
        continue;
      } else {
        if (P === G.left && isLeftChild) { // LEFT LEFT
          this.rotateRight(G);
          G.setRed();
          P.setBlack();
        } else if (P === G.left && isRightChild) { // LEFT RIGHT
          this.rotateLeft(node);
          this.rotateRight(node);
          node.setBlack();
          P.setRed();
          G.setRed();
        } else if (P === G.right && isRightChild) { // RIGHT RIGHT
          this.rotateLeft(G);
          G.setRed();
          P.setBlack();
        } else if (P === G.right && isLeftChild) { // RIGHT LEFT
          this.rotateRight(node);
          this.rotateLeft(node);
          node.setBlack();
          P.setRed();
          G.setRed();
        }
      }
    }
    
    this.root.setBlack();
  }
  
  preOrder(root, result = []) {
    if (!root) { return result; }
    result.push(root.toString());
    if (!root.left && !root.right) { result.push("X"); return; }
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);
    return result;
  }
  
  inOrder(root, result = []) {
    if (!root) { return result; }
    this.inOrder(root.left, result);
    result.push(root.toString());
    this.inOrder(root.right, result);
    return result;
  }
  
  levelOrder() {
    if (!this.root) { return; }
    let q = new Queue();
    q.insert(this.root);
    let result = [];
    while (!q.isEmpty()) {
      let current = q.pop();
      result.push(current.toString());
      if (current.left) { q.insert(current.left); }
      if (current.right) { q.insert(current.right); }
    }
    return result;
  }
  
  isBalanced(node) {
    if (!node) { return true; }
    if (Node.blackHeight(node.left) !== Node.blackHeight(node.right)) { return false; }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
}

let tree = new RedBlackTree();
[7, 6, 5, 4, 3, 2, 1].forEach(k => tree.insert(k));
console.log(`preorder: ${tree.preOrder(tree.root)}`);
console.log(`level order: ${tree.levelOrder()}`); // expected 6 (B),4 (R),7 (B),2 (B),5 (B),1 (R),3 (R)
console.log(`in order: ${tree.inOrder(tree.root)}`);
console.log(`isBalanced? ${tree.isBalanced()}`);
