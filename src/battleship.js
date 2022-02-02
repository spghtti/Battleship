const gameboard = require('./gameboard');

const p1 = gameboard('Player', false);
const CPU = gameboard('Computer', true);

const arrayEquals = (a, b) => a.every((val, index) => val === b[index]);

const searchAOA = (arr, coords) => {
  // Function to search an array of arrays
  for (let i = 0; i < arr.length; i++) {
    if (arrayEquals(arr[i], coords)) return true;
  }
  return false;
};

const checkForShips = (arr, x, y, d, shipLength) => {
  if (d === 'x') {
    for (let i = 0; i < shipLength; i++) {
      if (searchAOA(arr, [i + x, y])) return true;
    }
    return false;
  }
  if (d === 'y') {
    for (let j = 0; j < shipLength; j++) {
      if (searchAOA(arr, [x, j + y])) return true;
    }
    return false;
  }
};

const randomizeShips = (player) => {
  const ships = [
    [5, 'carrier'],
    [4, 'battleship'],
    [3, 'destroyer'],
    [2, 'submarine'],
    [1, 'boat'],
  ];
  const positions = [];

  const setRandomCoords = (shipLength) => {
    const randomInt = Math.round(Math.random());
    // Place a horizontal ship
    if (randomInt === 0) {
      let x1 = Math.floor(Math.random() * 10) + 1 - shipLength;
      if (x1 < 1) {
        x1 += shipLength;
      }
      let y1 = Math.floor(Math.random() * 10) + 1;
      while (checkForShips(positions, x1, y1, 'x', shipLength)) {
        x1 = Math.floor(Math.random() * 10) + 1 - shipLength;
        y1 = Math.floor(Math.random() * 10) + 1;
        if (x1 < 1) {
          x1 += shipLength;
        }
      }
      const x2 = x1 + shipLength;
      const xValuesSorted = [x1, x2].sort((a, b) => a - b);
      for (let j = xValuesSorted[0]; j <= xValuesSorted[1]; j++) {
        positions.push([j, y1]);
      }
      return [x1, y1, x2, y1];
    }
    if (randomInt === 1) {
      // Place a vertical ship
      let x1 = Math.floor(Math.random() * 10) + 1;
      let y1 = Math.floor(Math.random() * 10) + 1 - shipLength;
      if (y1 < 1) {
        y1 += shipLength;
      }
      while (checkForShips(positions, x1, y1, 'y', shipLength)) {
        y1 = Math.floor(Math.random() * 10) + 1 - shipLength;
        x1 = Math.floor(Math.random() * 10) + 1;
        if (y1 < 1) {
          y1 += shipLength;
        }
      }
      const y2 = y1 + shipLength;
      const yValuesSorted = [y1, y2].sort((a, b) => a - b);
      for (let k = yValuesSorted[0]; k <= yValuesSorted[1]; k++) {
        positions.push([x1, k]);
      }
      return [x1, y1, x1, y2];
    }
  };

  for (let i = 0; i < ships.length; i++) {
    const shipLength = ships[i][0] - 1;
    player.placeShip(...ships[i], ...setRandomCoords(shipLength));
    console.log(p1.fleet);
  }
};

exports.p1 = p1;
exports.CPU = CPU;
exports.randomizeShips = randomizeShips;
