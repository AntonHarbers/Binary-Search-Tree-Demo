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
    console.log(sortedAndUniqueArray);
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

  inOrder(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const stack = [];
    let currentNode = this.root;

    while (stack.length > 0 || currentNode) {
      if (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = stack.pop();
        if (callback) {
          callback(currentNode);
        } else {
          result.push(currentNode.value);
        }
        currentNode = currentNode.right;
      }
    }

    return result;
  }

  inOrderRecursive(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }
      if (callback) {
        callback(node);
      } else {
        result.push(node.value);
      }
      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return result;
  }

  preOrder(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const stack = [this.root];

    while (stack.length > 0) {
      const currentNode = stack.pop();
      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.value);
      }
      if (currentNode.right) {
        stack.push(currentNode.right);
      }
      if (currentNode.left) {
        stack.push(currentNode.left);
      }
    }

    return result;
  }

  preOrderRecursive(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const traverse = (node) => {
      if (callback) {
        callback(node);
      } else {
        result.push(node.value);
      }
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return result;
  }

  postOrder(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const stack = [this.root];
    const visited = new Set();

    while (stack.length > 0) {
      const currentNode = stack[stack.length - 1];

      if (
        (!currentNode.left && !currentNode.right) || // Leaf node
        (currentNode.left && visited.has(currentNode.left)) || // Left child visited
        (currentNode.right && visited.has(currentNode.right)) // Right child visited
      ) {
        stack.pop();
        if (callback) {
          callback(currentNode);
        } else {
          result.push(currentNode.value);
        }
        visited.add(currentNode);
      } else {
        if (currentNode.right) {
          stack.push(currentNode.right);
        }
        if (currentNode.left) {
          stack.push(currentNode.left);
        }
      }
    }

    return result;
  }

  postOrderRecursive(callback = null) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      if (callback) {
        callback(node);
      } else {
        result.push(node.value);
      }
    };

    traverse(this.root);

    return result;
  }

  height(node = this.root) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root) {
    if (!node) {
      return 0;
    }

    const leftDepth = this.depth(node.left);
    const rightDepth = this.depth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  //Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
  isBalanced(node = this.root) {
    if (!node) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildBalancedTree(values, 0, values.length - 1);
  }

  buildBalancedTree(values, start, end) {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);
    const node = new Node(values[middleIndex]);

    node.left = this.buildBalancedTree(values, start, middleIndex - 1);
    node.right = this.buildBalancedTree(values, middleIndex + 1, end);

    return node;
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

// exporting for testing purposes
// module.exports = { Tree, prettyPrint };

// exporting for visualization
export { Tree, prettyPrint };
