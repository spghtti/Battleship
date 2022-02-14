# Battleship

## About this project
This is a solution to the Odin's Project's [assignment](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/battleship) to create a Battleship clone as part of their full-stack curriculum. This assignment was also an exercise in Test-Driven Development (TDD) using [Jest](https://jestjs.io/). 

## My approach
This project was a lot of 'firsts' for me. Using Jest felt cumbersome at first since I was testing simple functions that I figured would work. But as the code grew, I realized that this approach forced me to write simple functions that worked with just about every use case.

This approach is conveniently and most importantly ties into my second 'first'. This was the first time I built the almost the entire logic of the game in JS without building a GUI. Normally when writing a program, I'd work backward and start with a GUI because I would reenact the game visually in my head. This led to a program that was overly dependent on the DOM, more prone to bugs, and more difficult to manage. Creating factory functions that housed the important data and player functions made it a breeze to translate it into an actual playable game.

The factory function approach was also a helpful (and sometimes painful) lesson in scope, which is something that always manages to surprise me.

## Live project demo
:point_right: https://spghtti.github.io/ :point_left:

## Built With

- [Vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [npm](https://www.npmjs.com/)
- [Webpack](https://webpack.js.org/)
- [Jest](https://jestjs.io/)


## License

Distributed under the MIT License. See LICENSE.txt for more information.