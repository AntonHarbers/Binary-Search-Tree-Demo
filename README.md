# odin-binary-search-tree

Implemenation of a binary search tree for the odin project.

Currently working on a visualization of the different functionality.

[Live Link](https://antonharbers.github.io/Binary-Search-Tree-Demo/)

![Repo Image](/images/repoImage.png)

## Running the app or the tests

If you clone this repo and would like to run the the app just run the html file with some sort of live server.

If you want to run the unit tests then uncomment the line in /bst/bst.js so that it looks like this:

JS:

```
// exporting for testing purposes
module.exports = { Tree, prettyPrint };
```

And comment out the final line like so:

JS:

```
// exporting for visualization
// export { Tree, prettyPrint };
```

After this you can run the test suite in your terminal by running the following command in your terminal:

CMD:

```
npm run test
```

## Folder Structure

```
    /.git           -> This git repository
    /bst            -> Contains BST and Tests
        bst.js          -> Tree and Node Class, prettyPrint function
        bst.test.js     -> All the teste for the BST
        driver.js       -> Assignment for the Odin Project
    /coverage       -> Util folder for JEST tests
    /images         -> Favicon and Repo Image
    /node_modules   -> Node Dependencies
    /visualization
        script.js       -> Logic for the visualization
        style.css       -> Styling for the front end
    .gitignore      -> Git Ignore for this repository
    index.html      -> Entry point for the Visualization
    package-lock.js -> NodeJS Util
    package.json    -> NodeJS Util
    README.md       -> This readme file
```

## Key Concepts

### Binary Search Trees (BST)

A Binary Search Tree is a data structure where each node has at most two children, referred to as the left and right child. For any given node, the left subtree only contains nodes with values lesser than the node’s value, and the right subtree only nodes with greater values. This makes BSTs efficient for operations like search, insert, and delete.

Example:

JS:

```
    class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    }
```

### Recursion and Stack Overflows in BST

Recursion is a common approach in BST operations, where a function calls itself to work with nodes at different levels. However, deep recursion can cause a stack overflow if the tree becomes very unbalanced (heavily skewed to one side). This happens when the call stack size exceeds its limit due to too many nested calls.

Example:

JS:

```
    buildTree(array) {
    // Recursive method
    ...
    }
```

### Testing with JEST

Testing is key to ensure your BST works as expected. JEST is a delightful JavaScript testing framework with a focus on simplicity. You can write tests to validate BST operations like insert, delete, or finding a value.

Example Test Case:

JS:

```
    test('inserts values correctly', () => {
    const tree = new Tree();
    tree.insert(5);
    tree.insert(3);
    expect(tree.root.value).toBe(5);
    expect(tree.root.left.value).toBe(3);
    });
```

### Visualization in the Browser

In this project, I implemented an interactive and dynamic visualization of the binary search tree (BST) using SVG elements in the browser. This feature is a key part of my project, allowing users to visually engage with the BST and understand its structure and behavior. Here’s a breakdown of how I achieved this:

Interactive SVG Elements: I represented each node of the BST as a circle, with lines connecting parent and child nodes. I added interactivity to these nodes, allowing users to click on them to trigger specific actions, such as removing a node from the tree.

Dynamic Layout and Rendering: I developed a function, renderTree, to calculate and adjust the position of each node based on its depth and position in the tree. This dynamic calculation ensures that the tree remains balanced and easy to read, even as nodes are added or removed. The tree is initially populated with a set of random values, and the layout is recalculated and re-rendered in real-time with each modification.

User Interaction: The UI includes buttons for adding and rebalancing nodes. Users can add a new node with a specific value, and the tree updates to accommodate this new node. The rebalance feature is particularly useful for demonstrating how a BST can be optimized for efficiency.

Styling and Enhancements: I enhanced the user experience by implementing mouseover and mouseout events. These events highlight nodes when hovered over, improving the interactive aspect of the visualization. Additionally, I ensured that the text labels for each node are non-selectible, maintaining a clean and user-friendly interface.

Event Listeners and Functionality: I integrated event listeners for user actions such as adding or removing nodes. This not only makes the BST visualization interactive but also serves as a practical demonstration of BST operations like insertion and deletion.

Through this visualization script, I aimed to create an engaging and educational tool that makes understanding the concept of binary search trees more accessible and interactive. This feature is a testament to the power of combining data structures with visual elements to enhance learning and user experience.

## Final Notes

#### Real-World Usage of BSTs

Binary Search Trees (BSTs) are more than just an academic concept; they have practical applications in various fields. For instance, they are crucial in database systems for efficient data retrieval, modification, and management. BSTs are also used in network routing algorithms to manage and optimize data packet paths, ensuring quicker and more efficient data transfer. Understanding BSTs can provide a foundation for tackling complex problems in these real-world scenarios.

#### Future Enhancements for the Visualization App

While I'm proud of the current state of my visualization app, there's always room for improvement. Future enhancements could include:

- Responsive Design: Improving the UI to be more responsive, accommodating various screen sizes and devices.
- Advanced User Interaction: Adding more interactive features like drag-and-drop to rearrange nodes, which would give users a deeper understanding of tree balancing.
- Performance Optimization: As the tree grows, the app could be optimized for performance to handle larger data sets efficiently.
- Feature Richness: Incorporating other types of trees and algorithms, like AVL trees or Red-Black trees, would make the app more versatile and educational.

#### Educational Value of the Project

Doing a project like this offers immense learning opportunities. It allows you to dive deep into data structures and understand their underlying mechanics. The process of building and visualizing a BST from scratch helps in grasping concepts like recursion, tree balancing, and algorithm optimization. Additionally, it enhances problem-solving and coding skills, especially in JavaScript. Projects like these also foster creativity in presenting complex data structures in an understandable and interactive manner.

Overall, this project has been a journey of combining theoretical knowledge with practical application. It demonstrates the power of visual learning tools in understanding complex concepts like BSTs and serves as a stepping stone to more advanced topics in computer science.
