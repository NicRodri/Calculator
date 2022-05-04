
function calculator(){ //Runs the calculator
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
        if(operator == "add"|| operator == "+"){
            return add(a, b);
        }
        else if(operator == "subtract" || operator == "-"){
            return subtract(a, b);
        }
        else if(operator == "multiply" || operator ==  "*"){
            return multiply(a, b);
        }
        else if(operator == "divide" || operator == "/"){
            return divide(a, b);
        }  
    }

    function displayValue(){ //Displays the screen with numbers and current operations
        const display = document.getElementById("display")
        display.innerHTML = displayValues;
    }
    function storeNumFunction(input){ //Stores the currentNumber used for calculations  
        displayValues += input;
        if (currentNum == null){
            currentNum = input;
        }
        else{
            currentNum += input;
        }
        displayValue();
    }
    function backspaceFunction(){ //Adds backspace functionality to calculator
        if(displayValues.charAt(displayValues.length -1) != operationDisplayed){
            if(displayValues.charAt(displayValues.length -1) == "."){
                decimalUse= false;
            }
            displayValues = displayValues.slice(0, -1);
            displayValue();
            currentNum = currentNum.slice(0, -1);
        }
    }
    function decimalFunction(input){ //Adds the decimal functionality to calculator
        if(decimalUse== false && currentNum!= "" && currentNum!= null && Number.isInteger(Number(currentNum))){
            displayValues+=input;
            currentNum+= input;
            displayValue();
            decimalUse= true;
            console.log(decimalUse);
        }

    }
    function equalsFunction(){ //Operates on the current pair of numbers based on last arithmetic operator used
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
    }
    function clearFunction(){ //Removes all stored and displayed numbers
        displayValues = "";
        currentNum = null;
        previousNum = null;
        decimalUse = false;
        displayValue();
        console.log("current    " + currentNum);
        console.log("previous   " + previousNum);
    }
    function operatorsFunction(operationUsed, operatorDisplayed){ //Applies arithmetic operators and updates stored numbers
        if(currentNum!=null&&currentNum!=""&& displayValues.charAt(displayValues.length -1) != "."){
            displayValues += operatorDisplayed;

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
    
            decimalUse = false;

            operation = operationUsed;
            operationDisplayed = operatorDisplayed;
            console.log(operation);
        }
        
    }

    function storeNumButton(){ //Stores the currentNumber used for calculations using the buttons
        const numButtons = document.querySelectorAll(".num")
        numButtons.forEach((numButton) => {
            numButton.addEventListener("click", () =>{
                storeNumFunction(numButton.id);
            });
        });
    }
    function backspaceButton(){ //Adds backspace functionality to calculator using the button
        const backspace = document.getElementById("backspace");
        backspace.addEventListener("click", () =>{ 
            backspaceFunction();
        });
    }
    function decimalButton(){ //Adds the decimal functionality to calculator using the button
        const decimal = document.getElementById(".");
        decimal.addEventListener("click", () =>{ 
            decimalFunction(decimal.innerHTML);
        });
    }
    function equalsButton(){ //Operates on the current pair of numbers based on last arithmetic operator used using the button
        const equals = document.getElementById("equals");
        equals.addEventListener("click", () => { 
            equalsFunction();
        });
    }
    function clearButton(){ //Removes all stored and displayed numbers using the button
        const clear = document.getElementById("clear");
        clear.addEventListener("click", () => { 
            clearFunction();
        });
    }
    function operatorButtons(){ //Applies arithmetic operators and updates stored numbers using the buttons
        const operators = document.querySelectorAll(".operation");
        operators.forEach((operator) =>{ 
            operator.addEventListener("click", () =>{
                operatorsFunction(operator.id, operator.innerHTML);
            });
        });
    }
    function readKeyboardInputs(){ //Allows for use of the calculator using keyboard inputs 
        window.addEventListener("keydown", (e) =>{
            if(e.key == 1|| e.key == 2 || e.key == 3 || e.key == 4 || e.key == 5 || e.key == 6 || e.key == 7 || e.key == 8 || e.key == 9 || e.key == 0){ //Numbers input
                storeNumFunction(e.key);
            }
            else if(e.key == "Backspace"){ //Backspace input
                backspaceFunction();
            }
            else if(e.key == "."){ //Decimal input
                decimalFunction(e.key);
            }
            else if(e.key == "Delete"){ //Clear input(uses delete button)
                clearFunction();
            }
            else if(e.key == "="|| e.key == "Enter"){ //Equals input
                equalsFunction();
            }
            else if(e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/"){ //Operation input  
                operatorsFunction(e.key, e.key); 
            }
        });
    }
    storeNumButton(); 
    backspaceButton();
    decimalButton();
    equalsButton();
    clearButton();
    operatorButtons();
    readKeyboardInputs();

}

calculator();