/* eslint-disable no-constant-condition */
/* eslint-disable wrap-iife */
const { p1, CPU } = require('./battleship');

function drawGrids() {
  const alphabet = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const gridOne = document.getElementById('grid-one');
  const gridTwo = document.getElementById('grid-two');
  while (gridOne.hasChildNodes()) {
    gridOne.removeChild(gridOne.lastChild);
  }
  while (gridTwo.hasChildNodes()) {
    gridTwo.removeChild(gridTwo.lastChild);
  }
  for (let i = 0; i < alphabet.length; i++) {
    const rowHeader = document.createElement('th');
    const rowHeader2 = document.createElement('th');
    rowHeader.textContent = alphabet[i];
    rowHeader2.textContent = alphabet[i];
    gridOne.appendChild(rowHeader);
    gridTwo.appendChild(rowHeader2);
  }
  for (let y = 0; y < 10; y++) {
    const row = document.createElement('tr');
    const row2 = document.createElement('tr');
    const rowHeader = document.createElement('th');
    const rowHeader2 = document.createElement('th');
    rowHeader.textContent = y + 1;
    rowHeader2.textContent = y + 1;
    gridOne.appendChild(row).className = 'table-row';
    gridTwo.appendChild(row2).className = 'table-row';
    row.appendChild(rowHeader).className = 'table-row-header';
    row2.appendChild(rowHeader2).className = 'table-row-header';
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('td');
      const cell2 = document.createElement('td');
      cell.setAttribute('value', `${x + 1}, ${y + 1}`);
      cell2.setAttribute('value', `${x + 1}, ${y + 1}`);
      row.appendChild(cell).className = 'gridOne-table-cell';
      row2.appendChild(cell2).className = 'gridTwo-table-cell';
    }
  }
}

function splitter(arr) {
  const array = arr.split(', ');
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(Number(array[i]));
  }
  return newArray;
}

const arrayEquals = (a, b) => a.every((val, index) => val === b[index]);

function renderHitsAndMisses(cell) {
  const coords = splitter(cell.attributes.value.value);
  let hit = false;
  for (let i = 0; i < CPU.fleet.length; i++) {
    for (let j = 0; j < Object.keys(CPU.fleet[i].positions).length; j++) {
      if (arrayEquals(CPU.fleet[i].positions[j], coords)) {
        cell.style.background = 'rgba(255, 0, 0, 0.5)';
        hit = true;
      }
    }
  }
  if (hit === false) {
    cell.style.background = 'rgba(192, 192, 192, 0.75)';
  }
}

function addGridListeners() {
  const cells = document.querySelectorAll('.gridTwo-table-cell');
  const status = document.getElementById('status');
  const gameboard = document.getElementById('gameboards');
  for (let i = 0; i < cells.length; i++) {
    const x = splitter(cells[i].attributes.value.value)[0];
    const y = splitter(cells[i].attributes.value.value)[1];
    cells[i].addEventListener('click', function () {
      renderHitsAndMisses(this);
      CPU.receiveAttack(x, y);
      console.log(CPU);
      cells[i].className += ' inactive';
    });
    cells[i].addEventListener('click', () => {
      gameboard.className += ' inactive';
      setTimeout(() => {
        p1.receiveRandomAttack();
        console.log(p1);
        gameboard.className -= ' inactive';
      }, 2000);
    });
  }
}

drawGrids();
addGridListeners();

const button = document.getElementById('new-game-button');
button.addEventListener('click', () => {
  // Needs to restore player ships
  drawGrids();
  addGridListeners();
});
