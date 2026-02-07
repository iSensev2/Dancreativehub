const numberCards = document.getElementsByClassName('button');
const resultBox = document.getElementById('display');

let currentInput = '';
let operator = '';
let firstOperand = null;
let secondOperand = null;

for (let i = 0; i < numberCards.length; i++) {
  numberCards[i].addEventListener('click', function () {
    const value = this.getAttribute('data-value');

    if (value === 'C') {
      // Clear all values
      currentInput = '';
      firstOperand = null;
      secondOperand = null;
      operator = '';
      resultBox.value = '';
    } else if (value === 'Del') {
      // Delete the last character
      currentInput = currentInput.slice(0, -1);
      resultBox.value = currentInput;
    } else if (value === 'Enter') {
      // Calculate the result
      if (firstOperand !== null && operator && currentInput) {
        secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, operator, secondOperand);
        resultBox.value = result;
        // Reset for next input
        currentInput = result.toString();
        firstOperand = result;
        operator = '';
        secondOperand = null;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Set operator and store the first operand
      if (currentInput) {
        if (operator) {
          // If an operator already exists, calculate before setting a new operator
          secondOperand = parseFloat(currentInput);
          firstOperand = calculate(firstOperand, operator, secondOperand);
          operator = value;
          resultBox.value = firstOperand;
          currentInput = '';
        } else {
          // Set operator and store first operand
          firstOperand = parseFloat(currentInput);
          operator = value;
          currentInput = '';
        }
      }
    } else {
      // Add numbers to current input
      if (value === '.' && currentInput.includes('.')) {
        // Prevent multiple decimals
        return;
      }
      currentInput += value;
      resultBox.value = currentInput;
    }
  });
}

function calculate(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return secondOperand !== 0 ? firstOperand / secondOperand : 'Error'; // Avoid division by zero
    default:
      return 0;
  }
}