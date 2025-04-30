let calculation = localStorage.getItem('calculation') || '';

displayCalculation();

function updateCalculation(value) {
  calculation = calculation + value;
  localStorage.setItem('calculation', calculation);
  displayCalculation();
}

function displayCalculation() {
  document.querySelector('.js-calculation').innerHTML = calculation;
}

function calculateResult() {
  calculation = eval(calculation);
  displayCalculation();
  localStorage.setItem('calculation', calculation);
}