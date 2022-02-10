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
      cell.dataset.index = y * 10 + x + 1 - 1;
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

const searchAOA = (arr, coords) => {
  // Function to search an array of arrays
  for (let i = 0; i < arr.length; i++) {
    if (arrayEquals(arr[i], coords)) return true;
  }
  return false;
};

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
          cells[k].style.background = 'rgba(38, 0, 255, 0.9)';
        }
      }
    }
  }
}

function addGridListeners() {
  const cells = document.querySelectorAll('.gridTwo-table-cell');
  const gameboard = document.getElementById('gameboards');
  const grid = document.getElementById('grid-two');
  const randomizeButton = document.getElementById('randomize-button');

  grid.addEventListener('click', () => {
    randomizeButton.className += ' inactive-button';
  });

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
  p1.enemyHits.length = 0;
  p1.missedEnemyAttacks.length = 0;
  p1.allEnemyAttacks.length = 0;
  p1.sinks.length = 0;
  p1.fleet.length = 0;
  CPU.enemyHits.length = 0;
  CPU.missedEnemyAttacks.length = 0;
  CPU.allEnemyAttacks.length = 0;
  CPU.sinks.length = 0;
  CPU.fleet.length = 0;
}

const ships = [
  [4, 'carrier'],
  [3, 'battleship'],
  [2, 'destroyer'],
  [1, 'submarine'],
  [0, 'boat'],
];
let isHorizontal = true;

function removeListeners() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  if (isHorizontal) {
    cells.forEach((cell) => {
      cell.removeEventListener('mouseenter', showHorizontalShipPlacement);
      cell.removeEventListener('mouseleave', hideHorizontalShipPlacement);
    });
  } else {
    cells.forEach((cell) => {
      cell.removeEventListener('mouseenter', showVerticalShipPlacement);
      cell.removeEventListener('mouseleave', hideVerticalShipPlacement);
    });
  }
}

(function addButtonListeners() {
  const randomizeButton = document.getElementById('randomize-button');
  const newGameButton = document.getElementById('new-game-button');
  const rotateButton = document.getElementById('rotate-button');

  randomizeButton.addEventListener('click', () => {
    drawGrids();
    addGridListeners();
    clearPlayerData();
    randomizeShips(p1);
    randomizeShips(CPU);
    renderPlayerShips();
  });

  newGameButton.addEventListener('click', () => {
    randomizeButton.className -= ' inactive-button';
    initializeGame();
  });
  rotateButton.addEventListener('click', () => {
    removeListeners();
    isHorizontal = !isHorizontal;
  });
  rotateButton.addEventListener('click', () => {
    addShipPlacementListeners(ships[0][0], isHorizontal);
  });
})();

function showHorizontalShipPlacement() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const index = Number(this.dataset.index);
  const allPositions = [];
  for (let i = 0; i < p1.fleet.length; i++) {
    for (let j = 0; j < p1.fleet[i].positions.length; j++) {
      allPositions.push(p1.fleet[i].positions[j]);
    }
  }
  for (let i = 0; i <= ships[0][0]; i++) {
    if (
      !searchAOA(
        allPositions,
        splitter(cells[index + i].attributes.value.value)
      )
    ) {
      cells[index + i].style.background = 'rgb(109, 109, 109)';
    }
  }
}

function hideHorizontalShipPlacement() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const index = Number(this.dataset.index);
  const allPositions = [];
  for (let i = 0; i < p1.fleet.length; i++) {
    for (let j = 0; j < p1.fleet[i].positions.length; j++) {
      allPositions.push(p1.fleet[i].positions[j]);
    }
  }
  for (let i = 0; i <= ships[0][0]; i++) {
    if (
      !searchAOA(
        allPositions,
        splitter(cells[index + i].attributes.value.value)
      )
    ) {
      cells[index + i].style.background = '';
    }
  }
}

function showVerticalShipPlacement() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const index = Number(this.dataset.index);
  const allPositions = [];
  for (let i = 0; i < p1.fleet.length; i++) {
    for (let j = 0; j < p1.fleet[i].positions.length; j++) {
      allPositions.push(p1.fleet[i].positions[j]);
    }
  }
  for (let i = 0; i <= ships[0][0]; i++) {
    if (
      !searchAOA(
        allPositions,
        splitter(cells[index + i * 10].attributes.value.value)
      )
    ) {
      cells[index + i * 10].style.background = 'rgb(109, 109, 109)';
    }
  }
}

function hideVerticalShipPlacement() {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const index = Number(this.dataset.index);
  const allPositions = [];
  for (let i = 0; i < p1.fleet.length; i++) {
    for (let j = 0; j < p1.fleet[i].positions.length; j++) {
      allPositions.push(p1.fleet[i].positions[j]);
    }
  }
  for (let i = 0; i <= ships[0][0]; i++) {
    if (
      !searchAOA(
        allPositions,
        splitter(cells[index + i * 10].attributes.value.value)
      )
    ) {
      cells[index + i * 10].style.background = '';
    }
  }
}

function nextShip() {
  ships.shift();
}

function placeShipOnClick() {
  const coords = splitter(this.attributes.value.value);
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const position = Number(this.dataset.index);
  const shipLength = ships[0][0];
  const shipName = ships[0][1];

  function checkForOccupation() {
    if (isHorizontal) {
      for (let i = 0; i <= shipLength; i++) {
        if (cells[i + position].dataset.occupied === 'true') {
          return true;
        }
      }
      return false;
    }
    for (let i = 0; i <= shipLength; i++) {
      if (cells[position + i * 10].dataset.occupied === 'true') {
        return true;
      }
    }
    return false;
  }

  if (isHorizontal) {
    if (!checkForOccupation()) {
      p1.placeShip(
        shipLength + 1,
        shipName,
        coords[0],
        coords[1],
        coords[0] + shipLength,
        coords[1]
      );
      for (let i = 0; i <= shipLength; i++) {
        cells[i + position].dataset.occupied = 'true';
      }
      nextShip();
      removeListeners();
      addShipPlacementListeners(ships[0][0], isHorizontal);
    }
  } else {
    p1.placeShip(
      shipLength + 1,
      shipName,
      coords[0],
      coords[1],
      coords[0],
      coords[1] + shipLength
    );
    for (let i = 0; i <= shipLength; i++) {
      cells[position + i * 10].dataset.occupied = 'true';
    }
    nextShip();
    removeListeners();
    addShipPlacementListeners(ships[0][0], isHorizontal);
  }
}

function addShipPlacementListeners(shipLength, isHorizontal) {
  const cells = document.querySelectorAll('.gridOne-table-cell');
  const length = shipLength;
  for (let i = 0; i < cells.length; i++) {
    if (isHorizontal) {
      if (i + length < 100) {
        if ((i % 10) + length < 10) {
          cells[i].addEventListener('click', placeShipOnClick);
          cells[i].addEventListener('click', renderPlayerShips);
          cells[i].addEventListener('click', () => {
            console.log(p1.fleet);
          });
          cells[i].addEventListener('mouseenter', showHorizontalShipPlacement);
          cells[i].addEventListener('mouseleave', hideHorizontalShipPlacement);
        }
      }
    } else {
      const vertLength = length * 10;
      if (i + vertLength < 100) {
        cells[i].addEventListener('click', placeShipOnClick);
        cells[i].addEventListener('click', renderPlayerShips);
        cells[i].addEventListener('click', () => {
          console.log(p1.fleet);
        });
        cells[i].addEventListener('mouseenter', showVerticalShipPlacement);
        cells[i].addEventListener('mouseleave', hideVerticalShipPlacement);
      }
    }
  }
}

function initializeGame() {
  const status = document.getElementById('status');
  status.textContent = 'Place your ships';
  drawGrids();
  clearPlayerData();
  addGridListeners();
  addShipPlacementListeners(ships[0][0], isHorizontal);
  renderPlayerShips();
}

initializeGame();
