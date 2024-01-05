const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
let currentOperation = null;
let inputNumber = 0;
let storedNumber = 0;
let result = 0;



function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function equals() {
    return result;
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
        currentOperation = e.target.textContent;
        storedNumber = inputNumber;
        inputNumber = 0;
        display.textContent = inputNumber;
    });
});

equalsButton.addEventListener('click', () => {
    let temp = inputNumber;
    switch (currentOperation) {
        case '+':
            result = add(storedNumber, inputNumber);
            break;
        case '-':
            result = subtract(storedNumber, inputNumber);
            break;
        case '*':
            result = multiply(storedNumber, inputNumber);
            break;
        case '%':
            result = divide(storedNumber, inputNumber);
            break;
        default:
            break;
    }
    console.log(result);
    display.textContent = result;
    currentOperation = null;
    inputNumber = 0;
});