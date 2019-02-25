// Splay Tree
//jshint esnext: true

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class SplayTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    this.root = this.doInsert(this.root, value);
    this.root = this.splay(this.root, value);
  }
  doInsert(root, value) {
    if (!root) {
      return new Node(value);
    }
    if (root.value === value) { return root; } // no duplicates
    if (value < root.value) {
      root.left = this.doInsert(root.left, value);
    }
    if (value > root.value) {
      root.right = this.doInsert(root.right, value);
    }
    return root;
  }
  
  splay(root, k) {
    if (!root || root.value === k) { return root; }
    
    if (k < root.value) {
      if (!root.left) { return root; }
      
      if (k < root.left.value) { // Zig Zig (Left Left)
        root.left.left = this.splay(root.left.left, k);
        root = this.rightRotation(root);
      } else if (k > root.left.value) { // (Zig Zag Left Right)
        root.left.right = this.splay(root.left.right, k);
        if (root.left.right) {
          root.left = this.leftRotation(root.left);
        }
      }
      
      if (root.left) {
        root = this.rightRotation(root);
      }        
    } else if (k > root.value) {
      if (!root.right) { return root; }
      
      if (k > root.right.value) { // Zig Zig (Right Right)
        root.right.right = this.splay(root.right.right, k);
        root = this.leftRotation(root);
      } else if (k < root.right.value) { // Zig Zag (Right Left)
        root.right.left = this.splay(root.right.left, k);
        if (root.right.left) {
          root.right = this.rightRotation(root.right);
        }
      }
      
      if (root.right) {
        root = this.leftRotation(root);
      }
    }
   
    return root;
  }
  
  rightRotation(node) {
    let newRoot = node.left;
    let oldChild = newRoot.right;
    node.left = oldChild;
    newRoot.right = node;
    return newRoot;
  }
  leftRotation(node) {
    let newRoot = node.right;
    let oldChild = newRoot.left;
    node.right = oldChild;
    newRoot.left = node;
    return newRoot;
  }
  
  find(k) {
    this.root = this.splay(this.root, k);
    return this.root.value === k ? this.root : null;
  }

  preOrder(root, result = []) {
    if (!root) { return; }
    result.push(root.value);
    if (!root.left && !root.right) { result.push("X"); return; }
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);
    return result;
  }
  inOrder(root, result = []) {
    if (!root) { return; }
    this.inOrder(root.left, result);
    result.push(root.value);
    this.inOrder(root.right, result);
    return result;
  }
}

let t = new SplayTree();
[0, 1, 2, 3, 4, 5, 6].forEach(k => t.insert(k));
console.debug(t.preOrder(t.root));
console.debug(`has 0? ${!!t.find(0)}`);
console.debug(t.preOrder(t.root));
console.debug(`has 6? ${!!t.find(6)}`);
console.debug(t.preOrder(t.root));
