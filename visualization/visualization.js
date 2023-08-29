function renderTree(rootNode, svgElement) {
  svgElement.innerHTML = ''; 
  if (!rootNode) {
    return;
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const nodeRadius = 20;
  const nodeGapX = 40;
  const nodeGapY = 60;
  let x = 0;

  const traverseAndRender = (node, depth) => {
    if (!node) {
      return;
    }

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', depth * nodeGapY + nodeGapY);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('fill', 'lightblue');
    svgElement.appendChild(circle);

    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', depth * nodeGapY + nodeGapY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '14px');
    text.textContent = node.value;
    svgElement.appendChild(text);

    if (node.left) {
      const lineLeft = document.createElementNS(svgNS, 'line');
      lineLeft.setAttribute('x1', x);
      lineLeft.setAttribute('y1', depth * nodeGapY + nodeGapY + nodeRadius);
      lineLeft.setAttribute('x2', x - nodeGapX / 2);
      lineLeft.setAttribute('y2', (depth + 1) * nodeGapY);
      lineLeft.setAttribute('stroke', 'black');
      svgElement.appendChild(lineLeft);

      traverseAndRender(node.left, depth + 1);
    }

    if (node.right) {
      const lineRight = document.createElementNS(svgNS, 'line');
      lineRight.setAttribute('x1', x);
      lineRight.setAttribute('y1', depth * nodeGapY + nodeGapY + nodeRadius);
      lineRight.setAttribute('x2', x + nodeGapX / 2);
      lineRight.setAttribute('y2', (depth + 1) * nodeGapY);
      lineRight.setAttribute('stroke', 'black');
      svgElement.appendChild(lineRight);

      traverseAndRender(node.right, depth + 1);
    }

    x += nodeGapX;
  };

  traverseAndRender(rootNode, 0);
}

export { renderTree };
