function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    if(b == 0){
        return "Error Division by 0";
    }
    else{
        return a/b;
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

//console.log(operate("multiply", 20, 10));