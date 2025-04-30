let buttonElement = document.querySelector('.js-button');

buttonElement.innerHTML = buttonElement.classList.contains('js-button');

function toggleButton(className) {
  const buttonElement = document.querySelector(className);

  if (!buttonElement.classList.contains('is-toggled')) {
    turnOffPreviousButton();
    buttonElement.classList.add('is-toggled');
  }
  else if (buttonElement.classList.contains('is-toggled')) {
    buttonElement.classList.remove('is-toggled');
  }
}

function turnOffPreviousButton() {
  const previousButton = document.querySelector('.is-toggled');

  if (previousButton) {
    previousButton.classList.remove('is-toggled');
  }
}