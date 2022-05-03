let currentNum = null;
let previousNum = null;
let operation = null;
displayValues = "";
function add(a, b){
    return Number(a) + Number(b);
}
function subtract(a, b){
    return Number(a) - Number(b);
}
function multiply(a, b){
    return Number(a) * Number(b);
}
function divide(a, b){
    if(b == 0){
        return "Error Division by 0";
    }
    else{
        return Number(a) / Number(b);
    }
}

function operate(operator, a, b){    
    if(operator == "add"){
        return add(a, b);
    }
    else if(operator == "subtract"){
        return subtract(a, b);
    }
    else if(operator == "multiply"){
        return multiply(a, b);
    }
    else if(operator == "divide"){
        return divide(a, b);
    }  
}
function displayValue(){ // Displays and stores the values of numbers selected
    const display = document.getElementById("display")
    display.innerHTML = displayValues;
}

function storeNumbers(){
    const numButtons = document.querySelectorAll(".num")
    numButtons.forEach((numButton) => {
        numButton.addEventListener("click", () =>{

            displayValues += numButton.id;
            previousNum = currentNum;
            currentNum = numButton.id;
            displayValue();
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
        });
    });
}
function calculator(){
    storeNumbers();
    const equals = document.getElementById("equals");
    const clear = document.getElementById("clear");
    const operators = document.querySelectorAll(".operation");

    operators.forEach((operator) =>{
        operator.addEventListener("click", () =>{
            displayValues += operator.innerHTML;
            displayValue();
            operation = operator.id;
            console.log(operation);
        });
    });
    clear.addEventListener("click", () => {
        displayValues = "";
        displayValue();
    });
    equals.addEventListener("click", () => {
        
        displayValues = operate(operation, previousNum, currentNum);
        displayValue();
    });
    
}

calculator();
//console.log(operate("multiply", 20, 10));