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
});
