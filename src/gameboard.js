/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const shipFactory = require('./shipFactory');

const gameboard = (playerName, isCPU) => {
  let attacks = [];
  let missedAttacks = [];
  let fleet = [];
  const placeShip = (length, name, x1, y1, x2, y2) => {
    let newShip = shipFactory(length);
    newShip.name = name;
    if (x1 !== x2) {
      const xValuesSorted = [x1, x2].sort((a, b) => a - b);
      for (let i = xValuesSorted[0]; i <= xValuesSorted[1]; i++) {
        newShip.positions.push([i, y1]);
      }
    } else {
      const yValuesSorted = [y1, y2].sort();
      for (let i = yValuesSorted[0]; i <= yValuesSorted[1]; i++) {
        newShip.positions.push([x1, i]);
      }
    }
    fleet.push(newShip);
  };
  const arrayEquals = (a, b) => a.every((val, index) => val === b[index]);
  const receiveAttack = (x, y) => {
    const hitStatus = document.getElementById('status');
    let hit = false;
    for (let i = 0; i < fleet.length; i++) {
      for (let j = 0; j < Object.keys(fleet[i].positions).length; j++) {
        if (arrayEquals(fleet[i].positions[j], [x, y])) {
          fleet[i].hit(x, y);
          if (fleet[i].isSunk()) {
            hitStatus.textContent = `${playerName}'s ${fleet[i].name} has been sunk!`;
            attacks.push([x, y]);
            return 'sink';
          }
          attacks.push([x, y]);
          return 'hit';
        }
      }
    }
    missedAttacks.push([x, y]);
    return 'miss';
  };
  const searchAOA = (arr, coords) => {
    for (let i = 0; i < arr.length; i++) {
      if (arrayEquals(arr[i], coords)) return true;
    }
    return false;
  };
  const receiveCpuAttack = () => {
    let allAttacks = attacks.concat(missedAttacks);
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    while (searchAOA(allAttacks, [x, y])) {
      x = Math.floor(Math.random() * 10) + 1;
      y = Math.floor(Math.random() * 10) + 1;
    }
    receiveAttack(x, y);
  };
  const checkForLoss = () => {
    const winStatus = document.getElementById('status');
    let sum = 0;
    for (let i = 0; i < fleet.length; i++) {
      sum += fleet[i].positions.length;
    }
    if (sum === 0) {
      winStatus.textContent = 'Game over!';
      return true;
    }
    return false;
  };
  return {
    checkForLoss,
    arrayEquals,
    receiveCpuAttack,
    playerName,
    fleet,
    placeShip,
    receiveAttack,
    attacks,
    missedAttacks,
  };
};

module.exports = gameboard;
