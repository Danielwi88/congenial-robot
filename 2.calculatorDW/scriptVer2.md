'use strict';// variable model
//1.Calculator state
let operator = null;
let firstOperand = null;
let displayValue = '0';

//2. Function untuk update display
function updateDisplay() {
  document.querySelector('.calculator-display').value = displayValue;
}
//3. Function input number
function inputDigit(digit) {
  displayValue = displayValue === '0' ? digit : displayValue + digit;
  updateDisplay();
}
//4.handle operator selection
function handleOperator(newOperator) {
  const inputValue = parseFloat(displayValue);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    displayValue = `${result}`;
    firstOperand = result;
  }
  operator = newOperator;
  displayValue = '0';
  updateDisplay();
}

//5. Function calculation
function calculate(input1, input2, op) {
  switch (op) {
    case '+':
      return input1 + input2;
    case '-':
      return input1 - input2;
    case '*':
      return input1 * input2;
    case '/':
      return input2 === 0 ? 'Error' : input1 / input2;
    case '%':
      return input1 % input2;
    case '√':
      return Math.sqrt(input1);
    default:
      return input2;
  }
}

//6. handle equal button
function calcEqual() {
  if (firstOperand !== null && operator) {
    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);

    displayValue = `${result}`;
    firstOperand = null;
    operator = null;

    updateDisplay();
  }
}

//7. Reset calculator
function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;

  updateDisplay();
}
//8. Event listener for number buttons
document
  .querySelector('.calculator-keys')
  .addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
      return;
    }

    const value = target.value;

    if (!isNaN(value)) {
      inputDigit(value);
    } else if (['+', '-', '*', '/', '%', '√'].includes(value)) {
      handleOperator(value);
    } else if (value === '=') {
      calcEqual();
    } else if (value === 'AC') {
      resetCalculator();
    } else if (value === '.') {
      if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
      }
    }
  });
