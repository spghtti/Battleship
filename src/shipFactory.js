/* eslint-disable prefer-const */
const shipFactory = (length) => {
  const name = '';
  const positions = [];
  const hitPositions = [];
  const isSunk = function () {
    return this.hitPositions.length === length;
  };
  const indexOfArray = (val, arr) => {
    let hash = {};
    for (let i = 0; i < arr.length; i++) {
      hash[arr[i]] = i;
    }
    return hash.hasOwnProperty(val) ? hash[val] : -1;
  };
  const hit = (x, y) => {
    hitPositions.push([x, y]);
    positions.splice(indexOfArray([x, y], positions), 1);
  };
  return {
    name,
    positions,
    hitPositions,
    isSunk,
    length,
    hit,
  };
};

module.exports = shipFactory;
