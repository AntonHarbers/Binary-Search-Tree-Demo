const {Node} = require('./bst');
const {Tree} = require('./bst');

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
});