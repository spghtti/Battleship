const shipFactory = require('../shipFactory');

test('Create 3-long ship', () => {
  expect(shipFactory(3).length).toBe(3);
});

test('Test sink', () => {
  const boat = shipFactory(2);
  expect(boat.isSunk()).toBe('Sunk');
});

test('Not sunk', () => {
  const boat = shipFactory(2);
  boat.positions = [
    [1, 1],
    [1, 2],
  ];
  expect(boat.isSunk()).toBe('Sunk');
});
