const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
let currentOperation = null;
let inputNumber = 0;
let storedNumber = 0;
let result = 0;


// Funnction to perform the operation
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '%':
            return num1 / num2;
        default:
            break;
    }

}

const clearDisplay = () =>  display.textContent = 0;


// Function to clear the variables of the calculator
const clearCalc = () => {
    currentOperation = null;
    inputNumber = 0;
    storedNumber = 0;
    result = 0;
};

//Event listeners for each number button
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display.textContent == 0) {
            display.textContent = '';
        }
        display.textContent += e.target.textContent;
        inputNumber = Number(display.textContent);
    });
});

// Event listeners for each operator button
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (currentOperation !== null) {
            storedNumber = operate(currentOperation, storedNumber, inputNumber);
            currentOperation = e.target.textContent;
        }else {
            currentOperation = e.target.textContent;
            storedNumber = inputNumber;
        }
        inputNumber = 0;
        clearDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    if (currentOperation === null) {
        return;
    }
    result = operate(currentOperation, storedNumber, inputNumber);
    display.textContent = result;
    clearCalc();
});


clearButton.addEventListener('click', () => {
    clearDisplay();
    clearCalc();
});


deleteButton.addEventListener('click', () => {
    const currentInput = display.textContent;
    display.textContent = currentInput.slice(0, -1);
    inputNumber = Number(display.textContent);
    display.textContent = inputNumber;
});