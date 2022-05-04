
function calculator(){ //Runs the calculator
    let currentNum = null; //Keeps track of the current number pressed
    let previousNum = null; //Keeps track of the previous number pressed
    let operation = null; //Keeps track of the current arithmetic operation
    let operationDisplayed = null; //Keeps track of the arithmetic operation displayed
    let decimalUse = false; //Keeps track of whether a decimal has been used or not
    let equalsPressed = false; //Keeps track of whether the equals has been used or not
    let canBackspace = true; //Keeps track of whether you can backspace or not
    let displayValues = ""; //Used to keep track of items on the display
    let topDisplayValues = ""; //Used to keep track of items on the top of the display
    
    function add(a, b){ //Adds two numbers
        let num = Number(a) + Number(b);
        return +num.toFixed(6);// Used toFixed used to round numbers. Rounding is inaccurate with values ending in 5 over 10 digits.
    }
    function subtract(a, b){ //Subtracts two numbers
        let num = Number(a) - Number(b);
        return +num.toFixed(6);
    }
    function multiply(a, b){ //Multiplies two numbers
        let num = Number(a) * Number(b);
        return +num.toFixed(6);
    }
    function divide(a, b){ //Divides two numbers
        
        if(b == 0){
            return "Error Division by 0";
        }
        else{
            let num = Number(a) / Number(b);
            return +num.toFixed(6);
        }
    }
    
    function operate(operator, a, b){ //Applies arithmetic operation given to it  
        if(operator == "add"|| operator == "+"){
            return add(a, b);
        }
        else if(operator == "subtract" || operator == "-"){
            return subtract(a, b);
        }
        else if(operator == "multiply" || operator ==  "×"){
            return multiply(a, b);
        }
        else if(operator == "divide" || operator == "÷"){
            return divide(a, b);
        }  
    }

    function displayValue(){ //Displays the screen with numbers and current operations
        const display = document.getElementById("display")
        const topDisplay = document.getElementById("topDisplay");
        display.innerHTML = displayValues;
        topDisplay.innerHTML = topDisplayValues;

    }
    function storeNumFunction(input){ //Stores the currentNumber used for calculations
        if(!equalsPressed){
            displayValues += input;
            topDisplayValues += input;
            if (currentNum == null){
                currentNum = input;
            }
            else{
                currentNum += input;
            }
            displayValue();
        }  
    }
    function backspaceFunction(){ //Adds backspace functionality to calculator
        if(displayValues.charAt(displayValues.length -1) != operationDisplayed && canBackspace){
            if(displayValues.charAt(displayValues.length -1) == "."){
                decimalUse= false;
            }
            displayValues = displayValues.slice(0, -1);
            topDisplayValues = topDisplayValues.slice(0, -1);
            displayValue();
            currentNum = currentNum.slice(0, -1);
        }
    }
    function decimalFunction(input){ //Adds the decimal functionality to calculator
        if(decimalUse== false && currentNum!= "" && currentNum!= null && Number.isInteger(Number(currentNum))){
            displayValues+=input;
            topDisplayValues+=input;
            currentNum+= input;
            displayValue();
            decimalUse= true;
        }

    }
    function equalsFunction(){ //Operates on the current pair of numbers based on last arithmetic operator used
        if(currentNum!= null && currentNum!="" && previousNum!= null && displayValues.charAt(displayValues.length -1) != "."){

            displayValues = String(operate(operation, previousNum, currentNum));
            displayValue();
            currentNum = displayValues;
            previousNum = null;
            equalsPressed = true;
            canBackspace = false;

            if(previousNum =="Error Division by 0" || currentNum =="Error Division by 0"){
                alert("Division by 0!");
                clearFunction();
            }
        }
    }
    function clearFunction(){ //Removes all stored and displayed numbers
        displayValues = "";
        topDisplayValues = "";
        currentNum = null;
        previousNum = null;
        decimalUse = false;
        equalsPressed = false;
        canBackspace = true;
        displayValue();
    }
    function operatorsFunction(operationUsed, operatorDisplayed){ //Applies arithmetic operators and updates stored numbers
        if(currentNum!=null&&currentNum!=""&& displayValues.charAt(displayValues.length -1) != "."){
            displayValues += operatorDisplayed;
            topDisplayValues += operatorDisplayed;
            displayValue();
    
            if(previousNum == null){
                previousNum = currentNum;
            }
            else{
                previousNum = operate(operation, previousNum, currentNum);
            }
            if(previousNum == "Error Division by 0"){
                alert("Error Division by 0!");
                displayValues = "";
                topDisplayValues = "";
                currentNum = null;
                previousNum = null;
                decimalUse = false;
                displayValue();
            }
            
            currentNum = null;
            canBackspace = true;
            decimalUse = false;
            equalsPressed = false;
            operation = operationUsed;
            operationDisplayed = operatorDisplayed;
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
            decimalFunction(decimal.id);
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
                if(e.key == "*"){
                    operatorsFunction("×", "×");
                }
                else if(e.key == "/"){
                    operatorsFunction("÷", "÷");
                }
                else{
                    operatorsFunction(e.key, e.key);
                }
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