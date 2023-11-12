'use strict';

//Player (1)
const player0El = document.querySelector('.player--0');
const name0El = document.getElementById('name--0');
const score0El = document.getElementById('score--0');
const curScore0El = document.getElementById('current--0');
let scorePlayer1 = 0;
//Player (2)
const player1El = document.querySelector('.player--1');
const name1El = document.getElementById('name--1');
const score1El = document.getElementById('score--1');
const curScore1El = document.getElementById('current--1');
let scorePlayer2 = 0;
//Dice
const dice = document.querySelector('.dice');
//Buttons
const btnNew = document.querySelector('.btn--new');
const btnChange = document.querySelector('.btn--change');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, win;

//Starting Point
const init = function () {
  win = 100;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;

  dice.classList.add('hidden');
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

//Rolling button
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Random dice
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomDice}.png`;
    //Check if value is 1 and add to current
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //Switch player and reset current score value
    else {
      switchPlayer();
    }
  }
});

//Holding the score for the active player
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Checking if player wins or not
    if (scores[activePlayer] >= win) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    //Switch player
    else {
      switchPlayer();
    }
  }
});

//resetting the game and zeroing scores
btnNew.addEventListener('click', init);

//Change names
btnChange.addEventListener('click', function () {
  name0El.textContent = prompt('1st Name:');
  name1El.textContent = prompt('2nd Name:');
});
