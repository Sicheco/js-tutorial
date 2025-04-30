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