const calcDisplay = document.querySelector(".calculator__display");

const digitBtns = document.querySelectorAll(".btn_type_digit");
const operatorBtns = document.querySelectorAll(".btn_type_operator");

const evaluateBtn = document.querySelector(".btn_type_evaluate");

const clearBtn = document.querySelector(".btn_type_clear");

let isEvaluated = false;

let strFirstNumber = "";
let strSecondNumber = "";
let operator = "";

let selectedOperatorBtn;

function operate() {
    const firstNumber = Number(strFirstNumber);
    const secondNumber = Number(strSecondNumber);

    let result;

    switch(operator) {
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
            result = firstNumber / secondNumber;
    }

    return result;
}

function appendDigit(event) {
    const digit = event.target.getAttribute("data-value");

    const isFirstNumberEntered = operator.length === 1;

    if (isEvaluated) {
        strFirstNumber = digit;

        isEvaluated = false;

        calcDisplay.textContent = strFirstNumber;
    }
    else if (isFirstNumberEntered) {
        strSecondNumber += digit;

        calcDisplay.textContent = strSecondNumber;
    }
    else {
        strFirstNumber += digit;

        calcDisplay.textContent = strFirstNumber;
    }
}

function updateOperator(event) {
    const isFirstNumberEntered = strFirstNumber.length > 0;
    const isSecondNumberEntered = strSecondNumber.length > 0;

    if (!isFirstNumberEntered) {
        return;
    }

    const operatorBtn = event.target;

    if (selectedOperatorBtn) {
        selectedOperatorBtn.classList.remove("btn_selected");
    }

    operatorBtn.classList.add("btn_selected");
    selectedOperatorBtn = operatorBtn;

    if (isSecondNumberEntered) {
        strFirstNumber = String(operate());
        strSecondNumber = "";

        calcDisplay.textContent = strFirstNumber;
    }

    operator = operatorBtn.getAttribute("data-operator");

    isEvaluated = false;
}

digitBtns.forEach(digitBtn => {
    digitBtn.addEventListener("click", appendDigit);
});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", updateOperator);
});

evaluateBtn.addEventListener("click", () => {
    const isSecondNumberEntered = strSecondNumber.length > 0;

    if (isSecondNumberEntered) {
        strFirstNumber = String(operate());
        strSecondNumber = "";
        operator = "";

        isEvaluated = true;

        calcDisplay.textContent = strFirstNumber;
        selectedOperatorBtn.classList.remove("btn_selected");
    }
});