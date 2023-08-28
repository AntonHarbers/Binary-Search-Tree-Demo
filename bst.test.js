const {Node} = require('./bst');
const {Tree} = require('./bst');

describe('BST', () => {
    test('should print a value', () => { 
        const node = new Node(1);
        expect(node.print(1)).toBe(1);
     })
});