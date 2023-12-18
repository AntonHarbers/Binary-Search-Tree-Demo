const { Tree, prettyPrint } = require('./bst');

// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it, if you wish.
const randomArray = (length, max) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

const tree = new Tree(randomArray(10, 100));
console.log('New Tree:');
prettyPrint(tree.root);
// Confirm that the tree is balanced by calling isBalanced.
console.log(`New Tree is balanced: ${tree.isBalanced()}`);
// Print out all elements in level, pre, post, and in order.
console.log(`Level Order ${tree.levelOrder()}`);
console.log(`Pre Order ${tree.preOrder()}`);
console.log(`Post Order ${tree.postOrder()}`);
console.log(`In Order ${tree.inOrder()}`);
// Unbalance the tree by adding several numbers > 100.
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
tree.insert(106);
console.log('Unbalanced Tree:');
prettyPrint(tree.root);
// Confirm that the tree is unbalanced by calling isBalanced.
console.log(`Tree with new numbers is balanced: ${tree.isBalanced()}`);
// Balance the tree by calling rebalance.
tree.rebalance();
console.log('Balanced Tree:');
prettyPrint(tree.root);
// Confirm that the tree is balanced by calling isBalanced.
console.log(`Tree with new numbers after rebalancing: ${tree.isBalanced()}`);
// Print out all elements in level, pre, post, and in order.
console.log(`Level Order ${tree.levelOrder()}`);
console.log(`Pre Order ${tree.preOrder()}`);
console.log(`Post Order ${tree.postOrder()}`);
console.log(`In Order ${tree.inOrder()}`);
