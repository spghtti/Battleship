/* eslint-disable prefer-const */
const shipFactory = (length) => {
  let name = '';
  let hitPositions = [];
  let positions = [];
  const isSunk = () => (hitPositions.length === 0 ? 'Sunk' : 'Not sunk');
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
