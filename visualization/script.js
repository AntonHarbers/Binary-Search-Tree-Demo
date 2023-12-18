import { Tree } from '../bst/bst.js';

const svgElement = document.querySelector('#tree-svg');
const addButton = document.querySelector('#add-button');
const rebalanceButton = document.querySelector('#rebalance-button');
const nodeRadius = 20;
const initialSpacing = 3;
const verticalSpacing = 130;
const maxDepth = 6;

let tree = new Tree([]);

function renderTree(rootNode, svgElement) {
  svgElement.innerHTML = ''; // Clear the SVG content

  const drawNode = (node, x, y, level = 0) => {
    if (!node) return;

    const spacing = Math.pow(2, maxDepth - level) * initialSpacing;
    const circle = CreateCircle(x, y, node);
    const text = CreateText(x, y, node);

    svgElement.appendChild(circle);
    svgElement.appendChild(text);

    if (node.left) {
      const leftX = x - spacing;
      const leftY = y + verticalSpacing;
      svgElement.appendChild(
        drawLine(x, y + nodeRadius, leftX, leftY - nodeRadius)
      );
      drawNode(node.left, leftX, leftY, level + 1);
    }

    if (node.right) {
      const rightX = x + spacing;
      const rightY = y + verticalSpacing;
      svgElement.appendChild(
        drawLine(x, y + nodeRadius, rightX, rightY - nodeRadius)
      );
      drawNode(node.right, rightX, rightY, level + 1);
    }
  };

  const drawLine = (x1, y1, x2, y2) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');

    return line;
  };

  if (rootNode) {
    drawNode(rootNode, svgElement.clientWidth / 2, nodeRadius, 0);
  }
}

// Event Listeners
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  addValue();
});

rebalanceButton.addEventListener('click', rebalanceTree);

function addValue() {
  const value = document.querySelector('#add-value').value;
  if (!value) return;
  if (value < 0 || value > 1000)
    return alert('Value must be between 0 and 1000');
  if (isNaN(value)) return alert('Value must be a number');
  tree.insert(value);
  renderTree(tree.root, svgElement);
  document.querySelector('#add-value').value = '';
}

function removeValue(value) {
  tree.delete(value);
  renderTree(tree.root, svgElement);
}

function rebalanceTree() {
  tree.rebalance();
  renderTree(tree.root, svgElement);
}

// Initialization
function initTree() {
  const values = RandomArray(3, 100);
  tree.root = tree.buildTree([...new Set(values)]);
  renderTree(tree.root, svgElement);
}
initTree();

// Helper Functions
function RandomArray(length, max) {
  return [...new Array(length)].map(() => Math.round(Math.random() * max));
}

function CreateCircle(x, y, node) {
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', nodeRadius);

  // add on click event listener to circle to remove node
  circle.addEventListener('click', () => removeValue(node.value));

  // make circle high light on hover
  circle.addEventListener('mouseover', () => {
    circle.setAttribute('stroke', 'red');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('cursor', 'pointer');
  });

  // make circle normal on mouse out
  circle.addEventListener('mouseout', () => {
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '1');
  });

  // make circle high z index
  circle.setAttribute('style', 'z-index: 1000');

  return circle;
}

function CreateText(x, y, node) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', x);
  text.setAttribute('y', y);
  text.setAttribute('dy', '0.3em');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('class', 'text');
  text.textContent = node.value;
  // set text as non selectable or interactive
  text.setAttribute('pointer-events', 'none');

  return text;
}
