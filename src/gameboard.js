/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const shipFactory = require('./shipFactory');

const gameboard = (playerName, isCPU) => {
  let missedAttacks = [];
  let fleet = [];
  const placeShip = (length, name, x1, y1, x2, y2) => {
    // Fill the ship's coordinates between its start and end points.
    let newShip = shipFactory(length);
    newShip.name = name;
    if (x1 !== x2) {
      const xValuesSorted = [x1, x2].sort();
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
    const status = document.getElementById('status');
    let hit = false;
    for (let i = 0; i < fleet.length; i++) {
      for (let j = 0; j < Object.keys(fleet[i].positions).length; j++) {
        if (arrayEquals(fleet[i].positions[j], [x, y])) {
          fleet[i].hit(x, y);
          fleet[i].isSunk()
            ? (status.textContent = 'Sunk!')
            : (status.textContent = 'Hit!');
          hit = true;
        }
      }
    }
    if (hit === false) {
      status.textContent = 'Miss.';
      missedAttacks.push([x, y]);
    }
  };
  const receiveRandomAttack = () => {
    receiveAttack(
      Math.floor(Math.random() * 10) + 1,
      Math.floor(Math.random() * 10) + 1
    );
  };
  // const checkForLoss = () = {
  //   if
  // }
  return {
    // checkForLoss,
    arrayEquals,
    receiveRandomAttack,
    playerName,
    fleet,
    placeShip,
    receiveAttack,
    missedAttacks,
  };
};

module.exports = gameboard;
