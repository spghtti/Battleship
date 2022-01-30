const gameboard = require('./gameboard');

const p1 = gameboard('Player', false);
const CPU = gameboard('Computer', true);

p1.placeShip(1, 'boat', 4, 1, 4, 1);
p1.placeShip(1, 'boat', 4, 6, 4, 6);
p1.placeShip(1, 'boat', 6, 7, 6, 7);
p1.placeShip(1, 'boat', 2, 10, 2, 10);
p1.placeShip(2, 'schooner', 2, 1, 2, 2);
p1.placeShip(2, 'schooner', 7, 3, 8, 3);
p1.placeShip(2, 'schooner', 4, 9, 5, 9);
p1.placeShip(3, 'frigate', 2, 5, 2, 7);
p1.placeShip(3, 'frigate', 8, 5, 8, 7);
p1.placeShip(4, 'cruiser', 10, 7, 10, 10);

CPU.placeShip(1, 'boat', 4, 1, 4, 1);
// CPU.placeShip(1, 'boat', 4, 6, 4, 6);
// CPU.placeShip(1, 'boat', 6, 7, 6, 7);
// CPU.placeShip(1, 'boat', 2, 10, 2, 10);
// CPU.placeShip(2, 'schooner', 2, 3, 3, 3);
// CPU.placeShip(2, 'schooner', 7, 3, 8, 3);
// CPU.placeShip(2, 'schooner', 4, 9, 5, 9);
// CPU.placeShip(3, 'frigate', 2, 5, 2, 7);
// CPU.placeShip(3, 'frigate', 8, 5, 10, 5);
// CPU.placeShip(4, 'cruiser', 7, 10, 10, 10);

exports.p1 = p1;
exports.CPU = CPU;
