class HashNode {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
   constructor(size) {
     this.size = size;
     this.map = new Array(size);
   }
  checksum(key) {
    key = "" + key;
    let sum = 0;
    let mask = 0xFFFFFFFF;
    for (let i = 0; i < key.length; i++) {
      let c = key.charCodeAt(i);
      sum = ((sum & 1) << 15) + sum >>> 1;
      sum = (sum + c) & mask;
    }
    return sum;
  }
  index(key) {
    return this.checksum(key) % this.size;
  }
  get(key) {
    let i = this.index(key);
    let node = this.map[i];
    while(node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
    return null;
  }
  
  has(key) {
    return !!this.get(key);
  }
  
  set(key, value) {
    let i = this.index(key);
    this.map[i] = new HashNode(key, value, this.map[i]);
  }

  * iterator() {
    for (let i = 0; i < this.size; i++) {
      let current = this.map[i];
      while (current) {
        yield { key: current.key, value: current.value };
        current = current.next;
      }
    }
  }
}

let h = new HashMap(3);
h.set("2", "hello");
h.set("3", "world");
let it = h.getValues();
for (let {key, value} of it) {
  console.log(`${key} -> ${value}`);
}
