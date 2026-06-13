const calcDisplay = document.querySelector(".calculator__display");

const digitBtns = document.querySelectorAll(".btn_type_digit");
const operatorBtns = document.querySelectorAll(".btn_type_operator");

const evaluateBtn = document.querySelector(".btn_type_evaluate");

const clearBtn = document.querySelector(".btn_type_clear");

let isEvaluated = false;

let strFirstNumber = "";
let strSecondNumber = "";
let operator = "";

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
