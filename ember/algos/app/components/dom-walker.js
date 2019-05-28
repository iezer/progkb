import Component from '@ember/component';

// https://www.javascriptcookbook.com/article/traversing-dom-subtrees-with-a-recursive-walk-the-dom-function/y
function walk(node, cb) {
  cb(node);
  node = node.firstChild;
  while(node) {
    walk(node, cb);
    node = node.nextSibling;
  }
}

export default Component.extend({
  tagName: '',

  didInsertElement() {
    this._super(...arguments);

    let el = document.querySelector('.dom-walker');
    let textNodes = [];

    walk(el, function(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue.trim();
        if (text) {
          textNodes.push(text);
        }
      }      
    });
    
    console.log(textNodes.join(' '));
    // compare to el.textContent or el.innerText
  }
});
