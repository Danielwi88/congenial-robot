'use strict'; //object based
//1.object creation, all the data& logic are grouped inside this calculator object
const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  shouldClearDisplay: false,

  //2. function=method to update display, to show display value
  updateDisplay() {
    document.querySelector('.calculator-display').value = this.displayValue;
  },
  //3. function=method to input digit, appends a digit to the screen, if the screen is just o , it will replace it
  inputDigit(digit) {
    if (this.shouldClearDisplay) {
      this.displayValue = digit;
      this.shouldClearDisplay = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
    this.updateDisplay();
  },

  // input decimal
  inputDecimal() {
    if (this.shouldClearDisplay) {
      this.displayValue = '0.';
      this.shouldClearDisplay = false;
    } else if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
    this.updateDisplay();
  },

  //4. when press operator (+,-,*,/,%), store[handle Operator]
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
    this.shouldClearDisplay = true; //only clear on next digit
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
        return input2 === 0 ? 'Error' : input1 / input2; //check if input2 is 0
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
      this.shouldClearDisplay = true;
      this.updateDisplay();
    }
  },

  //reset calculator
  resetCalculator() {
    this.displayValue = '0';
    this.operator = null;
    this.firstOperand = null;
    this.shouldClearDisplay = false;
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
    }
  });
