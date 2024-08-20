'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0'); // Player 0 total score
const score1El = document.getElementById('score--1'); // Player 1 total score

const current0El = document.getElementById('current--0'); // Player 0 score in current game round
const current1El = document.getElementById('current--1'); // Player 1 score in current game round

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing; // Create game variables

// Init function sets initial conditions of game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // set elements to intial classes
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// call init to begin game with the correct starting conditions
init();

// Function switches to the other player when the active player rolls a 1
const switchPlayer = function () {
  // Reset the current score of the active player to 0 in the UI and the current score variable
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Switch the active player (if the current player is 0, switch to 1, and vice versa)
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle the 'player--active' class to visually indicate the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll dice button functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Show corresponding dice face
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for dice roll of 1
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold dice button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // End the game highlight the winner
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Call init function when New Game button is clicked
btnNew.addEventListener('click', init);
