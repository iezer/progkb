// AVL Tree
//jshint esnext: true

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
  
  getHeight(node) {
    if (!node) { return 0; }
    return node.height;
  }
  updateHeight() {
    this.height = 1 + Math.max(this.getHeight(this.left), this.getHeight(this.right));
  }
  balance() {
    return this.getHeight(this.left) - this.getHeight(this.right);
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    this.root = this.doInsert(this.root, value);
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
    root.updateHeight();
    return this.balance(root, value);
  }
  rightRotation(node) {
    let newRoot = node.left;
    let oldChild = newRoot.right;
    node.left = oldChild;
    newRoot.right = node;
    node.updateHeight();
    newRoot.updateHeight();
    return newRoot;
  }
  leftRotation(node) {
    let newRoot = node.right;
    let oldChild = newRoot.left;
    node.right = oldChild;
    newRoot.left = node;
    node.updateHeight();
    newRoot.updateHeight();
    return newRoot;
  }
  balance(root, value) {
    let nodeBalance = root.balance();
    console.log(`balance ${nodeBalance}`);

    if (nodeBalance > 1) {
      if (value < root.left.value) {
        console.log(`LEFT LEFT ${value} ${root.value}`);
        // LEFT LEFT
        return this.rightRotation(root);
      } else if (value > root.left.value) {
        console.log(`LEFT RIGHT ${value} ${root.value}`);
        // LEFT RIGHT
        root.left = this.leftRotation(root.left);
        return this.rightRotation(root);
      }
    } else if (nodeBalance < -1) {
      if (value > root.right.value) {
        console.log(`RIGHT RIGHT ${value} ${root.value}`);
        // RIGHT RIGHT
        return this.leftRotation(root);
      } else if (value < root.right.value) {
        console.log(`RIGHT LEFT ${value} ${root.value}`);
        // RIGHT LEFT
        root.right = this.rightRotation(root.right);
        return this.leftRotation(root);
      }
    }
    
    return root;
  }
  delete(value) {
    this.doDelete(this.root, value);
  }
  
  inOrderSuccessor(node) {
    // return left-most child in right subtree
    let current = node.right;
    while(current.left) {
      current = current.left;
    }
    return current;
  }
  
  doDelete(root, value) {
    if (!root) { return; }
    if (value < root.value) {
      root.left = this.doDelete(root.left, value);
    } else if (value > root.value) {
      root.right = this.doDelete(root.right, value);
    } else {
      if (!root.left && !root.right) { // leaf;
        return null;
      } else if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      } else { // two children
        let next = this.inOrderSuccessor(root);
        root.value = next.value;
        root.right = this.doDelete(root.right, next.value);
      }
    }
    
    root.updateHeight();
    return this.balance(root, value);
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

let t = new AVLTree();
[10, 5, 2,4,3,1].forEach(k => t.insert(k));
console.debug(t.preOrder(t.root));
t.delete(5);
console.debug(t.preOrder(t.root));
