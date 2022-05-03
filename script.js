let currentNum = null;
let previousNum = null;
let operation = null;
let operationDisplayed = null;
let decimalUse = false;
displayValues = "";

function add(a, b){
    let num = Number(a) + Number(b);
    return +num.toFixed(10);// Used toFixed used to round numbers. Rounding is inaccurate with values ending in 5 over 10 digits.
}
function subtract(a, b){
    let num = Number(a) - Number(b);
    return +num.toFixed(10);
}
function multiply(a, b){
    let num = Number(a) * Number(b);
    return +num.toFixed(10);
}
function divide(a, b){
    
    if(b == 0){
        return "Error Division by 0";
    }
    else{
        let num = Number(a) / Number(b);
        return +num.toFixed(10);
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
function displayValue(){ //Displays the screen with numbers and current operations
    const display = document.getElementById("display")
    display.innerHTML = displayValues;
}

function storeNum(){ //Stores the currentNumber used for calculations
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
function calculator(){ //Runs the calculator
    storeNum(); //Used to store and display numbers used

    const equals = document.getElementById("equals");
    const clear = document.getElementById("clear");
    const operators = document.querySelectorAll(".operation");
    const decimal = document.getElementById(".");
    const backspace = document.getElementById("backspace");

    backspace.addEventListener("click", () =>{ //Adds backspace functionality to calculator
        if(displayValues.charAt(displayValues.length -1) != operationDisplayed){
            if(displayValues.charAt(displayValues.length -1) == "."){
                decimalUse= false;
            }
            displayValues = displayValues.slice(0, -1);
            displayValue();
            currentNum = currentNum.slice(0, -1);
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
            console.log(displayValues.charAt(displayValues.length -1));
            console.log(operation);
        }
    });

    decimal.addEventListener("click", () =>{ //Adds the decimal functionality 
        if(!decimalUse&& currentNum!= null){
            displayValues+=decimal.innerHTML;
            currentNum+= decimal.innerHTML;
            displayValue();
            decimalUse= true;
            console.log(decimalUse);

        }
    });
    operators.forEach((operator) =>{ //Takes actions onto numbers if an operator is clicked
        operator.addEventListener("click", () =>{
            if(currentNum!=null&&currentNum!=""&& displayValues.charAt(displayValues.length -1) != "."){
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
                operationDisplayed = operator.innerHTML;
                console.log(operation);
                decimalUse = false;
            }

        });
    });
    clear.addEventListener("click", () => { //Removes all stored and displayed numbers
        displayValues = "";
        currentNum = null;
        previousNum = null;
        decimalUse = false;
        displayValue();
        console.log("current    " + currentNum);
        console.log("previous   " + previousNum);
    });
    equals.addEventListener("click", () => { //Operates on the current pair of numbers
        console.log("current    " + currentNum);
        console.log("previous   " + previousNum);
        if(currentNum!= null && currentNum!="" && previousNum!= null && displayValues.charAt(displayValues.length -1) != "."){

            displayValues = String(operate(operation, previousNum, currentNum));
            displayValue();
            currentNum = displayValues;
            previousNum = null;

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