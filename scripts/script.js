const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const maxDisplayLength = 9;
let currentOperation = null;
let inputNumber = 0;
let storedNumber = 0;
let result = 0;
let operatorSet = false;
let alertIsShown = false;


// Funnction to perform the operation
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '%': //This operator is used to have the "old-school" calculator behaviour
            return (num1 / num2) % 1 !== 0 ? parseFloat(num1 / num2).toFixed(2) : (num1 / num2);
        default:
            break;
    }

}

// Function to check if the number is within the display length and alert the user if it is not
const checkDisplayLength = (msg) => {
    if (display.textContent.length > maxDisplayLength) {
        alert(msg);
        display.textContent = display.textContent.slice(0, maxDisplayLength);
    }
};

window.alert = (msg, timeout = null) => {
    if (alertIsShown) {
        return;
    }
    alertIsShown = true;
    const alert = document.createElement('div');
    const alertButton = document.createElement('button');
    alert.classList.add('alert');
    alert.innerText = msg;
    alertButton.innerText = 'OK';
    alert.appendChild(alertButton);
    alertButton.addEventListener('click', () => {
        alert.remove();
        alertIsShown = false;
    });
    if (timeout !== null) {
        setTimeout(() => {
            alert.remove();
            alertIsShown = false;
        }, Number(timeout));
    }
    document.body.appendChild(alert);
};

const clearDisplay = () => display.textContent = 0;


// Function to clear the variables of the calculator
const clearCalc = () => {
    currentOperation = null;
    inputNumber = 0;
    storedNumber = 0;
    result = 0;
};

const clearAll = () => {
    clearDisplay();
    clearCalc();
};

//Event listeners for each number button
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (result !== 0) {
            clearAll();
        }
        if (display.textContent == 0) {
            display.textContent = '';
        }
        display.textContent += e.target.textContent;
        inputNumber = Number(display.textContent);
        checkDisplayLength("Maximum number length reached");
    });
});

// Event listeners for each operator button
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (operatorSet) {
            currentOperation = e.target.textContent;
        }
        else if (currentOperation !== null) {
            storedNumber = operate(currentOperation, storedNumber, inputNumber);
            currentOperation = e.target.textContent;
        } else {
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
    checkDisplayLength("Number to high. Only the first 9 digits will be displayed");
    operatorSet = false;
});


clearButton.addEventListener('click', () => {
    clearAll();
});


deleteButton.addEventListener('click', () => {
    const currentInput = display.textContent;
    if (currentInput.length > 0) {
        display.textContent = currentInput.slice(0, -1);
        inputNumber = Number(display.textContent);
        display.textContent = inputNumber;
    }
});