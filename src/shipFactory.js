/* eslint-disable prefer-const */
const shipFactory = (length) => {
  const name = '';
  const positions = [];
  const hitPositions = [];
  const isSunk = function () {
    return this.hitPositions.length === length;
  };
  const hit = (x, y) => {
    hitPositions.push([x, y]);
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
