/* eslint-disable prefer-const */
const shipFactory = (length) => {
  let health = length;
  let position;
  const destroy = () => {
    // do something
  };
  const takeHit = () => {
    health -= 1;
    if (health === 0) {
      destroy();
    }
  };
  return { length, takeHit };
};

module.exports = shipFactory;
