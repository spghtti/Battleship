/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
const shipFactory = require('./shipFactory');

const gameboard = (playerName, isCPU) => {
  let enemyHits = [];
  let missedEnemyAttacks = [];
  let allEnemyAttacks = [];
  let sinks = [];
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
      const yValuesSorted = [y1, y2].sort((a, b) => a - b);
      for (let i = yValuesSorted[0]; i <= yValuesSorted[1]; i++) {
        newShip.positions.push([x1, i]);
      }
    }
    fleet.push(newShip);
  };

  const arrayEquals = (a, b) => a.every((val, index) => val === b[index]);

  const receiveAttack = (x, y) => {
    const hitStatus = document.getElementById('status');
    for (let i = 0; i < fleet.length; i++) {
      for (let j = 0; j < Object.keys(fleet[i].positions).length; j++) {
        if (arrayEquals(fleet[i].positions[j], [x, y])) {
          fleet[i].hit(x, y);
          if (fleet[i].isSunk()) {
            hitStatus.textContent = `${playerName}'s ${fleet[i].name} has been sunk!`;
            enemyHits.push([x, y]);
            sinks.push([x, y]);
            allEnemyAttacks.push([x, y]);
            return 'sink';
          }
          enemyHits.push([x, y]);
          allEnemyAttacks.push([x, y]);
          return 'hit';
        }
      }
    }
    missedEnemyAttacks.push([x, y]);
    allEnemyAttacks.push([x, y]);
    return 'miss';
  };

  const searchAOA = (arr, coords) => {
    // Function to search an array of arrays
    for (let i = 0; i < arr.length; i++) {
      if (arrayEquals(arr[i], coords)) return true;
    }
    return false;
  };

  const receiveCpuAttack = () => {
    const isLastHitASink = () => {
      if (enemyHits.length > 0) {
        if (sinks.length > 0) {
          return arrayEquals(
            enemyHits[enemyHits.length - 1],
            sinks[sinks.length - 1]
          );
        }
        return false;
      }
      return false;
    };

    const findNextAttack = () => {
      let x = Math.floor(Math.random() * 10) + 1;
      let y = Math.floor(Math.random() * 10) + 1;
      // Sets random coordinates that haven't been played yet
      while (searchAOA(allEnemyAttacks, [x, y])) {
        x = Math.floor(Math.random() * 10) + 1;
        y = Math.floor(Math.random() * 10) + 1;
      }
      // If last two shots were hits, continue attacking
      if (enemyHits.length > 0) {
        const lastHit = enemyHits[enemyHits.length - 1];
        // If last shot was a hit but not sink, guess until it's a sink
        if (!isLastHitASink()) {
          console.log('Second attack');
          // Start attacking around hit
          if (
            lastHit[0] + 1 < 11 &&
            !searchAOA(allEnemyAttacks, [lastHit[0] + 1, lastHit[1]])
          ) {
            x = lastHit[0] + 1;
            y = lastHit[1];
          } else if (
            lastHit[0] + -1 > 0 &&
            !searchAOA(allEnemyAttacks, [lastHit[0] + -1, lastHit[1]])
          ) {
            x = lastHit[0] + -1;
            y = lastHit[1];
          } else if (
            lastHit[1] + 1 < 11 &&
            !searchAOA(allEnemyAttacks, [lastHit[0], lastHit[1] + 1])
          ) {
            x = lastHit[0];
            y = lastHit[1] + 1;
          } else if (
            lastHit[1] + -1 > 0 &&
            !searchAOA(allEnemyAttacks, [lastHit[0], lastHit[1] + -1])
          ) {
            x = lastHit[0];
            y = lastHit[1] + -1;
          }
        }
        if (enemyHits.length > 1 && !isLastHitASink()) {
          const secondToLastHit = enemyHits[enemyHits.length - 2];
          const difference =
            lastHit[0] - secondToLastHit[0] + (lastHit[1] - secondToLastHit[1]);

          if (!isLastHitASink() && (difference === 1 || difference === -1)) {
            console.log('Continuing chain');
            // Continue chain of hits
            if (difference === 1 || difference === -1) {
              if (lastHit[0] !== secondToLastHit[0]) {
                x = lastHit[0] - secondToLastHit[0] + lastHit[0];
                y = lastHit[1];
              }
              if (lastHit[1] !== secondToLastHit[1]) {
                y = lastHit[1] - secondToLastHit[1] + lastHit[1];
                x = lastHit[0];
              }
            }
          }
        }
      }
      return [x, y];
    };
    receiveAttack(...findNextAttack());
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
    enemyHits,
    missedEnemyAttacks,
    sinks,
    allEnemyAttacks,
  };
};

module.exports = gameboard;
