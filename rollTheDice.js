'use strict';

//selecting the Elements
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelector('.show-modal');
const btnCloseModel = document.querySelector('.close-modal');
let scores, currentScore, activePlayer, playing;
const init = () => {
  //Starting process

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

//dice rolling functionality

btnRoll.addEventListener('click', () => {
  if (playing) {
    //Generate Random number from 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check if it rolled 1
    if (dice !== 1) {
      currentScore += dice;
      // currentScore1.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      // currentScore = 0;
      // currentScore += dice;
      // currentScore2.textContent = currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    //if scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if players score is >=100

    if (scores[activePlayer] >= 50) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnsOpenModal.addEventListener('click', () => {
  model.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//close the pop-up window then the X button is clicked
btnCloseModel.addEventListener('click', () => {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
});

//close the pop-up window then we click outside that box
overlay.addEventListener('click', () => {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
});

//close the pop-up window when Escape key is pressed
document.addEventListener('keydown', e => {
  //e is for event

  if (e.key === 'Escape' && !model.classList.contains('hidden')) {
    model.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});
