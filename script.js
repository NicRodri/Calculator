
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

    function backspace(){ //Adds backspace functionality to calculator
        const backspace = document.getElementById("backspace");
        backspace.addEventListener("click", () =>{ 
            if(displayValues.charAt(displayValues.length -1) != operationDisplayed){
                if(displayValues.charAt(displayValues.length -1) == "."){
                    decimalUse= false;
                }
                displayValues = displayValues.slice(0, -1);
                displayValue();
                currentNum = currentNum.slice(0, -1);
            }
        });
    }

    function decimal(){ //Adds the decimal functionality to calculator
        const decimal = document.getElementById(".");
        decimal.addEventListener("click", () =>{ 
            if(decimalUse== false && currentNum!= "" && currentNum!= null && Number.isInteger(Number(currentNum))){
                displayValues+=decimal.innerHTML;
                currentNum+= decimal.innerHTML;
                displayValue();
                decimalUse= true;
                console.log(decimalUse);
    
            }
        });
    }

    function equals(){ //Operates on the current pair of numbers based on last arithmetic operator used
        const equals = document.getElementById("equals");
        equals.addEventListener("click", () => { 
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

    function clear(){ //Removes all stored and displayed numbers
        const clear = document.getElementById("clear");
        clear.addEventListener("click", () => { 
            displayValues = "";
            currentNum = null;
            previousNum = null;
            decimalUse = false;
            displayValue();
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
        });
    }

    function operators(){ //Applies arithmetic operators and updates stored numbers
        const operators = document.querySelectorAll(".operation");
        operators.forEach((operator) =>{ 
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
    }
    storeNum(); //Used to store and display numbers used
    backspace();
    decimal();
    equals();
    clear();
    operators();

    

    window.addEventListener("keydown", (e) =>{
        if(e.key == 1|| e.key == 2 || e.key == 3 || e.key == 4 || e.key == 5 || e.key == 6 || e.key == 7 || e.key == 8 || e.key == 9 || e.key == 0){ //Numbers input
            displayValues += e.key;
            if (currentNum == null){
                currentNum = e.key;
            }
            else{
                currentNum += e.key;
            }

            displayValue();
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
        }
        else if(e.key == "Backspace"){ //Backspace input
            if(displayValues.charAt(displayValues.length -1) != operationDisplayed){
                if(displayValues.charAt(displayValues.length -1) == "."){
                    decimalUse= false;
                }
                displayValues = displayValues.slice(0, -1);
                displayValue();
                currentNum = currentNum.slice(0, -1);
            }

        }
        else if(e.key == "."){ //Decimal input
            if(decimalUse== false && currentNum!= "" && currentNum!= null && Number.isInteger(Number(currentNum))){
                displayValues+=e.key;
                currentNum+= e.key;
                displayValue();
                decimalUse= true;
                console.log(decimalUse);
            }
        }
        else if(e.key == "Delete"){ //Clear input(uses delete button)
            displayValues = "";
            currentNum = null;
            previousNum = null;
            decimalUse = false;
            displayValue();
            console.log("current    " + currentNum);
            console.log("previous   " + previousNum);
         
        }
        else if(e.key == "="|| e.key == "Enter"){ //Equals input

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
        else if(e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/"){ //Operation input
            if(currentNum!=null&&currentNum!=""&& displayValues.charAt(displayValues.length -1) != "."){
                displayValues += e.key;
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
                operation = e.key;
                operationDisplayed = e.key;
                console.log(operation);
                decimalUse = false;
            }
            console.log("operation");
        }
    });





}

calculator();