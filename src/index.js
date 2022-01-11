/* eslint-disable no-constant-condition */
/* eslint-disable wrap-iife */
const grid = document.getElementById('grid-one');

(function createGrid() {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const rowCount = 1;
  for (let i = 0; i < 121; i++) {
    const cell = document.createElement('div');
    cell.innerText = i + 1;
    grid.appendChild(cell).className = 'cell';
  }
})();
