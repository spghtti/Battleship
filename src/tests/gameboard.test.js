const shipFactory = require('../shipFactory');
const gameboard = require('../gameboard');

test('place 3-long ship', () => {
  const p1 = gameboard();
  p1.placeShip(3, 'frigate', 1, 1, 1, 3);
  expect(p1.fleet[0].positions).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
});
test('create a two-ship fleet', () => {
  const playerOne = gameboard();
  playerOne.placeShip(3, 'schooner', 1, 1, 1, 3);
  playerOne.placeShip(2, 'frigate', 2, 1, 2, 2);
  expect(playerOne.fleet.length).toEqual(2);
});
test('check for hit', () => {
  const playerOne = gameboard();
  playerOne.placeShip(3, 'schooner', 1, 1, 1, 3);
  playerOne.placeShip(2, 'frigate', 2, 1, 2, 2);
  playerOne.receiveAttack(1, 2);
  expect(playerOne.fleet[0].hitPositions[0]).toStrictEqual([1, 2]);
});
test('check for miss', () => {
  const p1 = gameboard();
  p1.placeShip(3, 'schooner', 1, 1, 1, 3);
  p1.receiveAttack(1, 4);
  expect(p1.missedAttacks[0]).toStrictEqual([1, 4]);
});
