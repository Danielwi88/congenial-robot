'use strict';

// OOP Calculator Class
class Calculator {
  constructor(displaySelector) {
    this.display = document.querySelector(displaySelector);
    this.reset();
  }

  // Resets calculator to initial state
  reset() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldClearDisplay = false;
    this.updateDisplay();
  }

  // Updates display screen
  updateDisplay() {
    this.display.value = this.displayValue;
  }

  // Handles number input
  inputDigit(digit) {
    if (this.shouldClearDisplay) {
      this.displayValue = digit;
      this.shouldClearDisplay = false;
    } else {
      this.displayValue = (this.displayValue === '0') ? digit : this.displayValue + digit;
    }
    this.updateDisplay();
  }

  // Handles decimal input
  inputDecimal() {
    if (this.shouldClearDisplay) {
      this.displayValue = '0.';
      this.shouldClearDisplay = false;
    } else if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
    this.updateDisplay();
  }

  // Handles operators (+ - * / % √)
  handleOperator(newOperator) {
    const inputValue = parseFloat(this.displayValue);
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      this.firstOperand = this.calculate(this.firstOperand, inputValue, this.operator);
      this.displayValue = `${this.firstOperand}`;
    }
    this.operator = newOperator;
    this.shouldClearDisplay = true;
    this.updateDisplay();
  }

  // Core calculation logic
  calculate(operand1, operand2, operator) {
    switch (operator) {
      case '+': return operand1 + operand2;
      case '-': return operand1 - operand2;
      case '*': return operand1 * operand2;
      case '/': return operand2 === 0 ? 'Error' : operand1 / operand2;
      case '%': return operand1 % operand2;
      case '√': return Math.sqrt(operand1);
      default: return operand2;
    }
  }

  // Executes calculation when "=" is pressed
  calcEqual() {
    if (this.firstOperand !== null && this.operator) {
      const inputValue = parseFloat(this.displayValue);
      this.displayValue = `${this.calculate(this.firstOperand, inputValue, this.operator)}`;
      this.firstOperand = null;
      this.operator = null;
      this.shouldClearDisplay = true;
      this.updateDisplay();
    }
  }
}

// ====================
// Object Instantiation
// ====================
const calc = new Calculator('.calculator-display');

// ====================
// Event Handling
// ====================
document.querySelector('.calculator-keys').addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;
  const value = target.value;

  if (!isNaN(value)) {
    calc.inputDigit(value);
  } else if (['+', '-', '*', '/', '%', '√'].includes(value)) {
    calc.handleOperator(value);
  } else if (value === '=') {
    calc.calcEqual();
  } else if (value === 'AC') {
    calc.reset();
  } else if (value === '.') {
    calc.inputDecimal();
  }
});
