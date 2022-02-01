/* eslint-disable no-constant-condition */
/* eslint-disable wrap-iife */
const { p1, CPU, randomizeShips } = require('./battleship');

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

function renderCPUattacks() {
  const misses = p1.missedEnemyAttacks;
  const cells = document.querySelectorAll('.gridOne-table-cell');
  for (let i = 0; i < misses.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      if (arrayEquals(misses[i], splitter(cells[j].attributes.value.value))) {
        cells[j].style.background = 'rgb(109, 109, 109)';
      }
    }
  }
  for (let k = 0; k < p1.fleet.length; k++) {
    for (let l = 0; l < Object.keys(p1.fleet[k].hitPositions).length; l++) {
      for (let m = 0; m < cells.length; m++) {
        if (
          arrayEquals(
            p1.fleet[k].hitPositions[l],
            splitter(cells[m].attributes.value.value)
          )
        ) {
          cells[m].style.background = 'rgba(255, 0, 0, 1)';
        }
      }
    }
  }
}
function renderPlayerAttacks(cell) {
  const coords = splitter(cell.attributes.value.value);
  let hit = false;
  for (let i = 0; i < CPU.fleet.length; i++) {
    for (let j = 0; j < Object.keys(CPU.fleet[i].positions).length; j++) {
      if (arrayEquals(CPU.fleet[i].positions[j], coords)) {
        cell.style.background = 'rgba(38, 0, 255, 0.8)';
        hit = true;
      }
    }
  }
  if (hit === false) {
    cell.style.background = 'rgb(109, 109, 109)';
  }
}

function renderPlayerShips() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  for (let i = 0; i < p1.fleet.length; i++) {
    for (let j = 0; j < p1.fleet[i].positions.length; j++) {
      for (let k = 0; k < cells.length; k++) {
        if (
          arrayEquals(
            p1.fleet[i].positions[j],
            splitter(cells[k].attributes.value.value)
          )
        ) {
          cells[k].style.background = 'rgba(38, 0, 255, 0.8)';
        }
      }
    }
  }
}

function addGridListeners() {
  const cells = document.querySelectorAll('.gridTwo-table-cell');
  const gameboard = document.getElementById('gameboards');
  for (let i = 0; i < cells.length; i++) {
    const x = splitter(cells[i].attributes.value.value)[0];
    const y = splitter(cells[i].attributes.value.value)[1];
    cells[i].addEventListener('click', function () {
      if (!p1.checkForLoss() && !CPU.checkForLoss()) {
        renderPlayerAttacks(this);
        CPU.receiveAttack(x, y);
        console.log(CPU);
        cells[i].className += ' inactive';
      }
    });
    cells[i].addEventListener('click', () => {
      gameboard.className += ' inactive';
      if (!p1.checkForLoss() && !CPU.checkForLoss()) {
        setTimeout(() => {
          p1.receiveCpuAttack();
          console.log(p1);
          gameboard.className -= ' inactive';
          renderCPUattacks();
        }, 1000);
      }
    });
  }
}

function clearPlayerData() {
  p1.fleet = [];
  p1.missedEnemyAttacks = [];
  p1.enemyHits = [];
  CPU.fleet = [];
  CPU.missedEnemyAttacks = [];
  CPU.enemyHits = [];
}

drawGrids();
addGridListeners();
randomizeShips(p1);
randomizeShips(CPU);
renderPlayerShips();
console.log(p1);
console.log(CPU);

const button = document.getElementById('new-game-button');
button.addEventListener('click', () => {
  // Needs to restore player ships
  drawGrids();
  addGridListeners();
  clearPlayerData();
});
