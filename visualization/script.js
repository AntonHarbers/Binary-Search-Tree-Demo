import { Tree } from '../bst.js';

const svgElement = document.querySelector('#tree-svg');
const addButton = document.querySelector('#add-button');
const rebalanceButton = document.querySelector('#rebalance-button');

const tree = new Tree([]);

function renderTree(rootNode, svgElement) {
    svgElement.innerHTML = ''; // Clear the SVG content
  
    const nodeRadius = 20;
    const horizontalSpacing = 40;
    const verticalSpacing = 60;
  
    const drawNode = (node, x, y) => {
      if (!node) return;
  
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', nodeRadius);
      svgElement.appendChild(circle);
  
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('dy', '0.3em');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = node.value;
      svgElement.appendChild(text);
  
      if (node.left) {
        const leftX = x - horizontalSpacing;
        const leftY = y + verticalSpacing;
        svgElement.appendChild(drawLine(x, y + nodeRadius, leftX, leftY - nodeRadius));
        drawNode(node.left, leftX, leftY);
      }
  
      if (node.right) {
        const rightX = x + horizontalSpacing;
        const rightY = y + verticalSpacing;
        svgElement.appendChild(drawLine(x, y + nodeRadius, rightX, rightY - nodeRadius));
        drawNode(node.right, rightX, rightY);
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
      drawNode(rootNode, svgElement.clientWidth / 2, nodeRadius);
    }
  }
  

function updateTree() {
  const values = randomArray(10, 100);
  tree.root = tree.buildTree([...new Set(values)]);
  renderTree(tree.root, svgElement);
}

function rebalanceTree() {
  tree.root = tree.rebalance();
  renderTree(tree.root, svgElement);
}

addButton.addEventListener('click', updateTree);
rebalanceButton.addEventListener('click', rebalanceTree);

// Random array generator
function randomArray(length, max) {
  return [...new Array(length)].map(() => Math.round(Math.random() * max));
}
