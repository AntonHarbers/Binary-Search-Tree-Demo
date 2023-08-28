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
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

// exporting for testing purposes
module.exports = { Node, Tree };
