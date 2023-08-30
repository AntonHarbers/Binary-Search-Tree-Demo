import { Tree, prettyPrint } from "../bst.js";

const svgElement = document.querySelector("#tree-svg");
const addButton = document.querySelector("#add-button");
const rebalanceButton = document.querySelector("#rebalance-button");
const numberInput = document.querySelector("#number-input");

let tree = new Tree([]);

function renderTree(rootNode, svgElement) {
  svgElement.innerHTML = ""; // Clear the SVG content

  const nodeRadius = 20;
  const horizontalSpacing = 40;
  const verticalSpacing = 60;

  const drawNode = (node, x, y, level, dx) => {
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
      const leftX = x - dx;
      const leftY = y + verticalSpacing;
      svgElement.appendChild(drawLine(x, y + nodeRadius, leftX, leftY - nodeRadius));
      drawNode(node.left, leftX, leftY, level + 1, dx / 2);
    }
  
    if (node.right) {
      const rightX = x + dx;
      const rightY = y + verticalSpacing;
      svgElement.appendChild(drawLine(x, y + nodeRadius, rightX, rightY - nodeRadius));
      drawNode(node.right, rightX, rightY, level + 1, dx / 2);
    }
  };
  

  const drawLine = (x1, y1, x2, y2) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    return line;
  };

  if (rootNode) {
    const svgWidth = svgElement.clientWidth;
    const centerX = svgWidth / 2;
    drawNode(rootNode, centerX, nodeRadius, 0, svgWidth / 4);
  }
  
}

function drawTree() {
  const values = randomArray(10, 100);
  tree = new Tree(values)
  prettyPrint(tree.root);
  renderTree(tree.root, svgElement);
}

function rebalanceTree() {
  const values = tree.inOrder();
  tree.root = null;

  tree.root = tree.buildTree(values);
  updateTree();
}

function updateTree() {
  renderTree(tree.root, svgElement);
}

function addValue() {
  const newValue = parseInt(numberInput.value);
  if (!isNaN(newValue)) {
    tree.insert(newValue);
    updateTree();
    numberInput.value = "";
  }
}

addButton.addEventListener("click", addValue);
rebalanceButton.addEventListener("click", rebalanceTree);

// Random array generator
function randomArray(length, max) {
  return [...new Array(length)].map(() => Math.round(Math.random() * max));
}

drawTree();
