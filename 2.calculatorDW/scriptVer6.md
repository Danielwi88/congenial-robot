'use strict';//model class

class Calculator {
  constructor() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldClearDisplay = false;
    this.display = document.querySelector('.calculator-display');
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.value = this.displayValue;
  }

  inputDigit(digit) {
    if (this.shouldClearDisplay) {
      this.displayValue = digit;
      this.shouldClearDisplay = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.shouldClearDisplay) {
      this.displayValue = '0.';
      this.shouldClearDisplay = false;
    } else if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
    this.updateDisplay();
  }

  handleOperator(newOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = `${result}`;
      this.firstOperand = result;
    }
    this.operator = newOperator;
    this.shouldClearDisplay = true;
    this.updateDisplay();
  }

  calculate(input1, input2, operator) {
    switch (operator) {
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

  calcEqual() {
    if (this.firstOperand !== null && this.operator) {
      const inputValue = parseFloat(this.displayValue);
      const result = this.calculate(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = `${result}`;
      this.firstOperand = null;
      this.operator = null;
      this.shouldClearDisplay = true;
      this.updateDisplay();
    }
  }

  resetCalculator() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldClearDisplay = false;
    this.updateDisplay();
  }
}

// ========== instantiate ==========
const calculator = new Calculator();

// ========== event listener ==========
document
  .querySelector('.calculator-keys')
  .addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;
    const value = target.value;

    if (!isNaN(value)) {
      calculator.inputDigit(value);
    } else if (['+', '-', '*', '/', '%', '√'].includes(value)) {
      calculator.handleOperator(value);
    } else if (value === '=') {
      calculator.calcEqual();
    } else if (value === 'AC') {
      calculator.resetCalculator();
    } else if (value === '.') {
      calculator.inputDecimal();
    }
  });
