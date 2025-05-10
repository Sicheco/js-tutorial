let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

displayScore();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function displayScore() {
  let scoreElement = document.querySelector('.js-score');

  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;


function resetScore() {
  localStorage.removeItem('score');
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  displayScore();
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play').innerText = 'Stop Playing';
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play').innerText = 'Auto Play';
  }
}

function renderResetConfirmation () {
  document.querySelector('.js-reset-confirmation').innerHTML = `
  Are you sure you want to reset the score?
  <button class="js-confirmation-button-yes confirmation-button">
    Yes 
  </button>
  <button class="js-confirmation-button-no confirmation-button">
    No 
  </button>`;

  document.querySelector('.js-confirmation-button-yes').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-confirmation-button-no').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  renderResetConfirmation();
});

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
  else if (event.key === 'a') {
    autoPlay();
  }
  else if (event.key === 'Backspace') {
    renderResetConfirmation();
  }
  console.log(event.key);
});

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = '';
  let resultElement = document.querySelector('.js-result');

  if (playerMove === computerMove) {
    result = 'Tie.';
    resultElement.innerHTML = result;
  }
  else if (playerMove === 'rock') {
    if (computerMove === 'paper') {
      result = 'You Lose.';
      resultElement.innerHTML = result;
    }
    else if (computerMove === 'scissors') {
      result = 'You Win.';
      resultElement.innerHTML = result;
    }
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win.';
      resultElement.innerHTML = result;
    }
    else if (computerMove === 'scissors') {
      result = 'You Lose.';
      resultElement.innerHTML = result;
    }
  }
  else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose.';
      resultElement.innerHTML = result;
    }
    else if (computerMove === 'paper') {
      result = 'You Win.';
      resultElement.innerHTML = result;
    }
  }

  let movesElement = document.querySelector('.js-moves');

  movesElement.innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png"> <img class="move-icon" src="images/${computerMove}-emoji.png"> Computer`;

  if (result === 'You Win.') {
    score.wins++;
  }
  else if (result === 'You Lose.') {
    score.losses++;
  }
  else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  displayScore();
}