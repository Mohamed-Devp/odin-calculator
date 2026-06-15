const calcDisplay = document.querySelector(".calculator__display");

const digitBtns = document.querySelectorAll(".btn_type_digit");
const operatorBtns = document.querySelectorAll(".btn_type_operator");

const evaluateBtn = document.querySelector(".btn_type_evaluate");

const clearBtn = document.querySelector(".btn_type_clear");

let firstNumber = 0;
let secondNumber = 0;

let operator = "";

let isFirstNumberEntered = false;
let isSecondNumberEntered = false;

let isOperatorSelected = false;

let isEvaluated = false;

let selectedOperatorBtn;

function operate() {
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;
        
        case "/":
            if (secondNumber === 0) {
                throw new Error("Division by 0");
            }

            result = firstNumber / secondNumber;
    }

    return result;
}

function appendDigit(event) {
    const digit = Number(event.target.dataset.value);

    if (isEvaluated) {
        firstNumber = digit;

        isEvaluated = false;
    }
    else if (isOperatorSelected) {
        secondNumber = secondNumber * 10 + digit;
        isSecondNumberEntered = true;
    }
    else {
        firstNumber = firstNumber * 10 + digit;
        isFirstNumberEntered = true;
    }

    calcDisplay.textContent = isOperatorSelected
        ? secondNumber : firstNumber;
    clearBtn.textContent = "CE";
}

function updateOperator(event) {
    if (!isFirstNumberEntered) {
        return;
    }

    if (isSecondNumberEntered) {
        try {
            firstNumber = operate();
        }
        catch (error) {
            clear();
            calcDisplay.textContent = `Error: ${error.message}`;
            
            return;
        }

        secondNumber = 0;

        isSecondNumberEntered = false;

        calcDisplay.textContent = firstNumber;
    }

    const operatorBtn = event.target;

    if (selectedOperatorBtn) {
        selectedOperatorBtn.classList.remove("btn_selected");
    }

    operatorBtn.classList.add("btn_selected");
    selectedOperatorBtn = operatorBtn;

    operator = operatorBtn.dataset.operator;

    isOperatorSelected = true;
    isEvaluated = false;
}

function evaluate() {
    if (!isSecondNumberEntered) {
        return;
    }

    try {
        firstNumber = operate();
    }
    catch (error) {
        clear();
        calcDisplay.textContent = `Error: ${error.message}`;
        
        return;
    }

    secondNumber = 0;

    operator = "";

    isSecondNumberEntered = false;

    isOperatorSelected = false;

    isEvaluated = true;

    calcDisplay.textContent = firstNumber;

    selectedOperatorBtn.classList.remove("btn_selected");
}

function clear() {
    firstNumber = 0;
    secondNumber = 0;

    operator = "";

    isFirstNumberEntered = false;
    isSecondNumberEntered = false;

    isOperatorSelected = false;

    isEvaluated = false;

    calcDisplay.textContent = "";
    clearBtn.textContent = "AC";

    if (selectedOperatorBtn) {
        selectedOperatorBtn.classList.remove("btn_selected");
    }
}

digitBtns.forEach(digitBtn => {
    digitBtn.addEventListener("click", appendDigit);
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", updateOperator);
});

evaluateBtn.addEventListener("click", evaluate);

clearBtn.addEventListener("click", clear);