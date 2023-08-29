class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // sort the array and remove and duplicate values first
    const sortedAndUniqueArray = [...new Set(array.sort((a, b) => a - b))];
    // then build the tree and set the root node
    this.root = this.buildTree(sortedAndUniqueArray);
  }

  // method to recursively build the tree based on the middle value of the array, and the values of the left and right subarrays
  buildTree(array) {
    if (array.length === 0) return null;

    const middleIndex = Math.floor(array.length / 2);
    const rootValue = array[middleIndex];
    const rootNode = new Node(rootValue);

    const leftSubarray = array.slice(0, middleIndex);
    const rightSubarray = array.slice(middleIndex + 1);

    rootNode.left = this.buildTree(leftSubarray);
    rootNode.right = this.buildTree(rightSubarray);

    return rootNode;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = new Node(value);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Node to be deleted found
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      const minNode = this.findMinNode(root.right);
      root.value = minNode.value;
      root.right = this.deleteNode(root.right, minNode.value);
    }

    return root;
  }

  findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  levelOrder(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.value);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  }

  levelOrderRecursive(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];

    const traverse = () => {
      if (queue.length === 0) {
        return;
      }

      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.value);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }

      traverse();
    };

    traverse();

    return result;
  }

  inOrder(callback = null){

  }

  inOrderRecursive(callback = null){
  }

  preOrder(callback = null){
  }

  preOrderRecursive(callback = null){
  }

  postOrder(callback = null){
  }

  postOrderRecursive(callback = null){
  }

  height(node = this.root){
  }
  
  depth(node = this.root){
  }

  isBalanced(){

  }

  rebalance(){

  }
}

// helper function to print the tree in the console, taken from the odin project assignment
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// example usage
const tree = new Tree([10, 20, 30, 40, 50, 60, 70, 80]);
prettyPrint(tree.root);
tree.levelOrder((x) => console.log(x.value));
//console.log("Hello")
//tree.levelOrderRecursive((x) => console.log(x.value));

// exporting for testing purposes
module.exports = { Node, Tree };
