let currentNum = null;
let previousNum = null;
let operation = null;
let decimalUse = false;
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
function displayValue(){ // Displays the screen with numbers and current operations
    const display = document.getElementById("display")
    display.innerHTML = displayValues;
}

function storeNum(){ // Stores the currentNumber used for calculations
    const numButtons = document.querySelectorAll(".num")
    numButtons.forEach((numButton) => {
        numButton.addEventListener("click", () =>{

            displayValues += numButton.id;
            if (currentNum == null){
                currentNum = numButton.id;
            }
            else{
                currentNum += numButton.id;
            }

            displayValue();
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
        });
    });
}
function calculator(){ // runs the calculator
    storeNum(); //Used to store and display numbers used

    const equals = document.getElementById("equals");
    const clear = document.getElementById("clear");
    const operators = document.querySelectorAll(".operation");
    const decimal = document.getElementById(".");

    decimal.addEventListener("click", () =>{ //adds the decimal functionality 
        if(!decimalUse&& currentNum!= null){
            displayValues+=decimal.innerHTML;
            currentNum+= decimal.innerHTML;
            displayValue();
            decimalUse= true;
            console.log(decimalUse);
        }
    });
    operators.forEach((operator) =>{ // Takes actions onto numbers if an operator is clicked
        operator.addEventListener("click", () =>{
            displayValues += operator.innerHTML;
            displayValue();
            
            if(previousNum == null){
                previousNum = currentNum;
                console.log("previous   " + previousNum); 
            }

            else{
                previousNum = operate(operation, previousNum, currentNum);
                console.log("previous   " + previousNum);
            }
            currentNum = null;

            if(previousNum == "Error Division by 0"){
                alert("Error Division by 0!");
                displayValues = "";
                currentNum = null;
                previousNum = null;
                decimalUse = false;
                displayValue();
            }
            operation = operator.id;
            console.log(operation);
            decimalUse = false;
        });
    });
    clear.addEventListener("click", () => { // removes all stored and displayed numbers
        displayValues = "";
        currentNum = null;
        previousNum = null;
        decimalUse = false;
        displayValue();
        console.log("current    " + currentNum);
        console.log("previous   " + previousNum);
    });
    equals.addEventListener("click", () => { // operates on the current pair of numbers
        console.log("current    " + currentNum);
        console.log("previous   " + previousNum);
        if(currentNum!= null && previousNum!= null){

            displayValues = operate(operation, previousNum, currentNum);
            displayValue();
            currentNum = displayValues;

            if(previousNum =="Error Division by 0" || currentNum =="Error Division by 0"){
                alert("Division by 0!");
                displayValues = "";
                currentNum = null;
                previousNum = null;
                decimalUse = false;
                displayValue();
            }

            console.log("current    " + currentNum);
        }
    });
    
}

calculator();