const shipFactory = require('../shipFactory');

test('Create 3-long ship', () => {
  expect(shipFactory(3).length).toBe(3);
});
