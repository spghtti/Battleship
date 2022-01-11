const shipFactory = require('./shipFactory');
const gameboard = require('./gameboard');

const turn = 0;

const p1 = gameboard();
const CPU = gameboard();

p1.name = 'Player';
CPU.name = 'Computer';
