let displayString = "";
let value = 0;
const displayValue = document.querySelector("#display");
let answerOut = false;
let decimalAvail = true;
let backSpaceAvail = false;
displayValue.innerHTML = displayString;
let displayFontSize;
let operatorAvail = true;

document.querySelectorAll(".buttons").forEach (function(button){
    if (button.id === "cancel"){
        button.addEventListener("click", function(){
            displayValue.innerHTML ="";
            displayString = "";
            decimalAvail = true;
            backSpaceAvail = false;
            operatorAvail = true;
        });
    }

    else if (button.id === "backspace")
    {
        button.addEventListener("click", function()
        {
            if (backSpaceAvail === true){
                if (displayValue.innerHTML.endsWith(" ")){
                    displayValue.innerHTML = displayValue.innerHTML.slice(0,displayValue.innerHTML.length - 3);
                    displayString = displayString.slice(0,displayValue.innerHTML.length - 3);
                    operatorAvail = true;
                }
                else if (displayValue.innerHTML.endsWith(".")){
                    displayValue.innerHTML = displayValue.innerHTML.slice(0,displayValue.innerHTML.length - 1);
                    displayString = displayString.slice(0, displayString.length - 1)
                    if(decimalAvail === false)
                        decimalAvail = true;
                }

                else {
                    displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length - 1);
                    displayString = displayString.slice(0, displayString.length - 1);
                }
            }
        })  
    }


    else if (button.id === "equal"){
        button.addEventListener("click", function(){
            displayValue.innerHTML = calculate(displayString);
            displayString =displayValue.innerHTML;
            answerOut = true;
            decimalAvail = true;
            backSpaceAvail = false;
            operatorAvail = true;
        });
    }
    else if (button.id === "plus" || button.id === "minus" || button.id === "times" || button.id === "subs"){
        button.addEventListener("click", function(){
            if (operatorAvail === true){
                if(!(displayString === "" && (button.textContent === "+" || button.textContent === "×" || button.textContent === "÷"))){
                    if (answerOut === true){
                        displayValue.innerHTML = "";
                        answerOut = false;
                    }
                    displayValue.innerHTML +=  " " + button.textContent + " ";
                    displayString += " " + button.textContent + " ";
                    if (decimalAvail === false)
                        decimalAvail = true;
                    backSpaceAvail = true;
                    operatorAvail = false;
                }
            }
        });
    }
    else if (button.id === "decimal") {
            button.addEventListener("click", function(){
                if (answerOut === true){
                    displayValue.innerHTML = "";
                    answerOut = false;
                }
                if (decimalAvail === true){
                    displayValue.innerHTML += ".";
                    displayString += ".";
                    decimalAvail = false;
                    backSpaceAvail = true;
                }
            })
    }

    else {
        button.addEventListener("click", function(){
            if (answerOut === true){
                displayValue.innerHTML = "";
                answerOut = false;
            }
            displayValue.innerHTML += button.textContent;
            displayString += button.textContent;
            backSpaceAvail = true;
            if ( operatorAvail === false)
                operatorAvail = true;
        });
    }

});


function calculate (inputStr) {
    let arr = inputStr.split(" ");
    return recursion(arr);
}

function recursion (arr) {
    if (arr.length === 3){
        return operate(chosenOperator(arr[1]),parseFloat(arr[0]),parseFloat(arr[2]));
    }

    if(arr[1] === "+"){
        return operate(chosenOperator("+"), parseFloat(arr[0]),recursion(arr.slice(2)));
    }

    else if (arr[1] === "-"){
        arr[2] *= -1;
        return operate(chosenOperator("+"), parseFloat(arr[0]),recursion(arr.slice(2)));
    }

    else if (arr[1] === "×" || arr[1] === "÷"){
        arr[2] = operate(chosenOperator("×"),parseFloat(arr[0]), parseFloat(arr[2]));
        return recursion(arr.slice(2));
    }
}

function chosenOperator(char) {
    if (char === "+")
        return add;
    else if (char === "-")
        return subtract;
    else if (char === "×")
        return multiply;
    else if (char === "÷")
        return divide;
}

function operate(operator, num1, num2) {
    let output = operator(num1, num2);
    return output;
}

let add = function(num1, num2) {
    return num1 + num2;
}

let subtract = function(num1, num2) {
    return num1 - num2;
}

let multiply = function(num1, num2) {
    return num1 * num2;
}

let divide = function(num1, num2) {
    return num1 / num2;
}
