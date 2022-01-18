/* eslint-disable no-constant-condition */
/* eslint-disable wrap-iife */
const { p1, CPU } = require('./battleship');

(function drawGrids() {
  const gridOne = document.getElementById('grid-one');
  const gridTwo = document.getElementById('grid-two');
  for (let y = 0; y < 10; y++) {
    const row = document.createElement('tr');
    const rowHeader = document.createElement('th');
    rowHeader.innerText = y + 1;
    gridOne.appendChild(row).className = 'table-row';
    row.appendChild(rowHeader).className = 'table-row-header';
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('value', `${x + 1}, ${y + 1}`);
      row.appendChild(cell).className = 'gridOne-table-cell';
    }
  }
  for (let y = 0; y < 10; y++) {
    const row = document.createElement('tr');
    const rowHeader = document.createElement('th');
    rowHeader.innerText = y + 1;
    gridTwo.appendChild(row).className = 'table-row';
    row.appendChild(rowHeader).className = 'table-row-header';
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('value', `${x + 1}, ${y + 1}`);
      row.appendChild(cell).className = 'gridTwo-table-cell';
    }
  }
})();

function splitter(arr) {
  const array = arr.split(', ');
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(Number(array[i]));
  }
  return newArray;
}

// const renderShips = () => {
//   const cells = querySelectorAll('.gridOne-table-cell');
//   for (let i = 0; i < cells.length; i++) {

//   }
// };

(function addListeners() {
  const cells = document.querySelectorAll('.gridTwo-table-cell');
  for (let i = 0; i < cells.length; i++) {
    const x = splitter(cells[i].attributes.value.value)[0];
    const y = splitter(cells[i].attributes.value.value)[1];
    cells[i].addEventListener('click', function () {
      renderHitsAndMisses(this);
    });
    cells[i].addEventListener('click', () => {
      CPU.receiveAttack(x, y);
    });
    cells[i].addEventListener('click', () => {
      console.log(CPU);
    });
  }
})();

const arrayEquals = (a, b) => a.every((val, index) => val === b[index]);

function renderHitsAndMisses(cell) {
  const coords = splitter(cell.attributes.value.value);
  let hit = false;
  for (let i = 0; i < CPU.fleet.length; i++) {
    for (let j = 0; j < Object.keys(CPU.fleet[i].positions).length; j++) {
      if (arrayEquals(CPU.fleet[i].positions[j], coords)) {
        cell.innerHTML = 'X';
        hit = true;
      }
    }
  }
  if (hit === false) {
    cell.innerHTML = 'O';
  }
}
