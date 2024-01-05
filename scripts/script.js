const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
let currentOperation = null;
let inputNumber = 0;
let storedNumber = 0;
let result = 0;



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

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display.textContent == 0) {
            display.textContent = '';
        }
        display.textContent += e.target.textContent;
        inputNumber = Number(display.textContent);
        console.log(inputNumber);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (currentOperation !== null) {
            console.log('current operation is not null');
            storedNumber = operate(currentOperation, storedNumber, inputNumber);
            currentOperation = e.target.textContent;
            console.log(storedNumber);
        }else {
            currentOperation = e.target.textContent;
            storedNumber = inputNumber;
        }
        inputNumber = 0;
        display.textContent = inputNumber;
    });
});

equalsButton.addEventListener('click', () => {
    if (currentOperation === null) {
        return;
    }
    result = operate(currentOperation, storedNumber, inputNumber);
    console.log(result);
    display.textContent = result;
    currentOperation = null;
    inputNumber = 0;
});