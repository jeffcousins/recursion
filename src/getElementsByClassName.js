// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var result = [];
  var nextNode = (function nextNode(node) {
    if (node.classList) {
      if (node.classList.contains(className)) {
        result.push(node);
      }
    }
    
    for (var i = 0; i < node.childNodes.length; i++) {
      nextNode(node.childNodes[i]);
    }
  })(document.body);

  return result;
};
