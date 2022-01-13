/* eslint-disable no-constant-condition */
/* eslint-disable wrap-iife */

(function createGrid() {
  const gridOne = document.getElementById('grid-one');
  for (let y = 0; y < 10; y++) {
    const row = document.createElement('tr');
    const rowHeader = document.createElement('th');
    rowHeader.innerText = y + 1;
    gridOne.appendChild(row).className = 'table-row';
    row.appendChild(rowHeader).className = 'table-row-header';
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('td');
      // cell.innerText = [x + 1, y + 1];
      cell.setAttribute('value', `[${x + 1}, ${y + 1}]`);
      row.appendChild(cell).className = 'table-cell';
    }
  }
})();

(function assignCoordinates() {
  const cells = document.getElementsByClassName('slide');
})();
