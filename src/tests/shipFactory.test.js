const shipFactory = require('../shipFactory');

test('Create 3-long ship', () => {
  expect(shipFactory(3).length).toBe(3);
});

test('Test sink', () => {
  const schooner = shipFactory(2);
  schooner.positions = [
    [1, 1],
    [1, 2],
  ];
  schooner.hitPositions = [
    [1, 1],
    [1, 2],
  ];
  expect(schooner.isSunk()).toBe(true);
});

test('Not sunk', () => {
  const boat = shipFactory(2);
  boat.positions = [
    [1, 1],
    [1, 2],
  ];
  boat.hitPositions = [[1, 1]];
  expect(boat.isSunk()).toBe(false);
});
