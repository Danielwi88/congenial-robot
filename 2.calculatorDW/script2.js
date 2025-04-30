'use strict'; //using Class OOP//
class Calculator {
  constructor(displaySelector) {
    this.display = document.querySelector(displaySelector);
    this.reset(); //initalize calculator state
  }
  //reset calculator to initial state
  reset() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.shouldClearDisplay = false;
    this.updateDisplay();
  }
  //Update display screen
  updateDisplay() {
    this.display.value = this.displayValue;
  }
  //Handles number input
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
  //Handles operator input
  inputDecimal() {
    if (this.shouldClearDisplay) {
      this.displayValue = '0.';
      this.shouldClearDisplay = false;
    } else if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
    this.updateDisplay();
  }
  //Handles operator(+,-,*,/)
  // Handles operator (+,-,*,/)
  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = String(result);
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.shouldClearDisplay = true;
    this.updateDisplay();
  }

  // Core calculation logic
  calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
      case '%':
        return firstOperand % secondOperand;
      case '√':
        return Math.sqrt(firstOperand);
      default:
        return secondOperand;
    }
  }
  //Execute calculation
  calcEqual() {
    if (this.firstOperand !== null && this.operator) {
      const inputValue = parseFloat(this.displayValue);
      const result = this.calculate(
        this.firstOperand,
        inputValue,
        this.operator
      );

      this.displayValue = String(result);
      this.operator = null;
      this.firstOperand = null;
      this.shouldClearDisplay = true;
      this.updateDisplay();
    }
  }
}

// Initialize calculator after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const calc = new Calculator('.calculator-display');

  // Event Handling
  document
    .querySelector('.calculator-keys')
    .addEventListener('click', (event) => {
      const target = event.target;
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
});
