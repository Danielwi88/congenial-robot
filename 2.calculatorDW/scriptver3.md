'use strict'; //object based
//1.object creation, all the data& logic are grouped inside this calculator object
const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,

  //2. function=method to update display, to show display value
  updateDisplay() {
    document.querySelector('.calculator-display').value = this.displayValue;
  },
  //3. function=method to input digit, appends a digit to the screen, if the screen is just o , it will replace it
  inputDigit(digit) {
    this.displayValue =
      this.displayValue === '0' ? digit : this.displayValue + digit;
    this.updateDisplay();
  },

  //4. when press operator (+,-,*,/,%), store
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
    this.displayValue = '0';
    this.updateDisplay();
  },
//5. function=method to calculate math logic
  calculate(input1, input2, opr) {
    switch (opr) {
      case '+':
        return input1 + input2;
      case '-':
        return input1 - input2;
      case '*':
        return input1 * input2;
      case '/':
        return input2 === 0 ? 'Error' : input1 / input2;//check if input2 is 0
      case '%':
        return input1 % input2;
      case '√':
        return Math.sqrt(input1);
      default:
        return input2;
    }
  },

  //execute when press = equal
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
      this.updateDisplay();
    }
  },

  //reset calculator
  resetCalculator() {
    this.displayValue = '0';
    this.operator = null;
    this.firstOperand = null;
    this.updateDisplay();
  },
};
//event listener
document
  .querySelector('.calculator-keys')
  .addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
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
      if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
        calculator.updateDisplay();
      }
    }
  });
