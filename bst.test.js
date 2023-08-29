const { Node } = require('./bst');
const { Tree } = require('./bst');

// testing the tree class
describe('Tree', () => {
  describe('#buildTree', () => {
    test('should build a balanced binary search tree and return the correct root value', () => {
      const inputArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
      // Middle value after sorting
      const expectedRootValue = 8;

      const tree = new Tree(inputArray);

      expect(tree.root.value).toBe(expectedRootValue);
    });
  });

  describe('#insert', () => {
    test('Should insert a value into the tree', () => {
      const tree = new Tree([]);
      tree.insert(3);
      tree.insert(5);
      tree.insert(4);
      tree.insert(20);
      tree.insert(1);

      expect(tree.root.value).toBe(3);
      expect(tree.root.right.value).toBe(5);
      expect(tree.root.right.left.value).toBe(4);
      expect(tree.root.right.right.value).toBe(20);
      expect(tree.root.left.value).toBe(1);
    });
  });

  describe('#delete', () => {
    test('Should delete a given value from the tree', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      tree.delete(4);
      tree.delete(10);
      tree.delete(20);
      // after deleting 4, 3 should be the new value of the left node and there should not be a right node
      expect(tree.root.value).toBe(5);
      expect(tree.root.left.value).toBe(3);
      expect(tree.root.right).toBe(null);
    });
  });

  describe('#findMinNode', () => {
    test('Should return the node with the smallest value', () => {
      const tree = new Tree([10, 22, 1, 4, 5]);
      const minNode = tree.findMinNode(tree.root);
      // smallest value in the given array should be 1
      expect(minNode.value).toBe(1);
    });
  });

  describe('#deleteNode', () => {
    test('Should delete a given node from the tree', () => {
      const tree = new Tree([3, 5, 1, 2, 4]);
      // node to delete should be 2 in this case as its left from 3
      const nodeToDelete = tree.root.left;
      tree.deleteNode(tree.root, nodeToDelete.value);
      // new left node would be 1 after deletion
      expect(tree.root.left.value).toBe(1);
    });
  });

  describe('#find', () => {
    test('Should return the node with the given value', () => {
      const tree = new Tree([3, 5, 1, 2, 4]);
      expect(tree.find(2).value).toBe(2);
      expect(tree.find(4).value).toBe(4);
      expect(tree.find(20)).toBe(null);
    });
  });

  describe('#levelOrder', () => {
    test('Should perform level-order traversal on the tree using iteration', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.levelOrder((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([5, 4, 20, 3, 10]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.levelOrder();

      expect(result).toEqual([30, 20, 50, 10, 40]);
    });
  });

  describe('#levelOrderRecursive', () => {
    test('Should perform level-order traversal on the tree using recursion', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.levelOrderRecursive((value) => {
        result.push(value.value);
      });
      expect(result).toEqual([5, 4, 20, 3, 10]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.levelOrderRecursive();

      expect(result).toEqual([30, 20, 50, 10, 40]);
    });
  });

  describe('#inOrder', () => {
    test('Should perform in-order traversal on the tree using iteration', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.inOrder((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([3, 4, 5, 10, 20]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.inOrder();

      expect(result).toEqual([10, 20, 30, 40, 50]);
    });
  });

  describe('#inOrderRecursive', () => {
    test('Should perform in-order traversal on the tree using recursion', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.inOrderRecursive((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([3, 4, 5, 10, 20]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.inOrderRecursive();

      expect(result).toEqual([10, 20, 30, 40, 50]);
    });
  });

  describe('#preOrder', () => {
    test('Should perform pre-order traversal on the tree using iteration', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.preOrder((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([5, 4, 3, 20, 10]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.preOrder();

      expect(result).toEqual([30, 20, 10, 50, 40]);
    });
  });

  describe('#preOrderRecursive', () => {
    test('Should perform pre-order traversal on the tree using recursion', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.preOrderRecursive((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([5, 4, 3, 20, 10]);
    });
    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.preOrderRecursive();

      expect(result).toEqual([30, 20, 10, 50, 40]);
    });
  });

  describe('#postOrder', () => {
    test('Should perform post-order traversal on the tree using iteration', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.postOrder((value) => {
        result.push(value.value);
      });

      expect(result).toEqual([3, 4, 10, 20, 5]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.postOrder();

      expect(result).toEqual([10, 20, 40, 50, 30]);
    });
  });

  describe('#postOrderRecursive', () => {
    test('Should perform post-order traversal on the tree using recursion', () => {
      const tree = new Tree([3, 5, 4, 10, 20]);
      const result = [];
      tree.postOrderRecursive((value) => {
        result.push(value.value);
      });
      expect(result).toEqual([3, 4, 10, 20, 5]);
    });

    test('Should return an array of values if no function is provided', () => {
      const tree = new Tree([10, 20, 30, 40, 50]);
      const result = tree.postOrderRecursive();

      expect(result).toEqual([10, 20, 40, 50, 30]);
    });
  });

//   describe('#height', () => {
//     test('Should return the height of the tree', () => {
//       const tree = new Tree([10, 20, 30, 40, 50]);
//       expect(tree.height()).toBe(2);
//     });
//     test('Should return 0 if the tree is empty', () => {
//       const tree = new Tree([]);
//       expect(tree.height()).toBe(0);
//     });
//   });

//   describe('#depth', () => {
//     test('Should return the depth of the tree', () => {
//       const tree = new Tree([10, 20, 30, 40, 50, 60, 70, 80]);
//       expect(tree.depth()).toBe(3);
//     });
//     test('Should return 0 if the tree is empty', () => {
//       const tree = new Tree([]);
//       expect(tree.depth()).toBe(0);
//     });
//   });

//   describe('#isBalanced', () => {
//     test('Should return true if the tree is balanced', () => {
//       const tree = new Tree([10, 20, 30, 40, 50]);
//       expect(tree.isBalanced()).toBe(true);
//     });
//     test('Should return false if the tree is not balanced', () => {
//       const tree = new Tree([10, 20, 30, 40, 50, 60, 70, 80]);
//       expect(tree.isBalanced()).toBe(false);
//     });
//   });

//   describe('#rebalance', () => {
//     test('Should rebalance the tree', () => {
//       const tree = new Tree([10, 20, 30, 40, 50, 60, 70, 80]);
//       tree.rebalance();
//       expect(tree.isBalanced()).toBe(true);
//     });

//     test('Should not rebalance the tree if it is already balanced', () => {
//       const tree = new Tree([10, 20, 30, 40, 50]);
//       tree.rebalance();
//       expect(tree.isBalanced()).toBe(true);
//     });
//   });
});
