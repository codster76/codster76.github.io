/*
Things to do
- Need some way to track where you are in the calculation (so which level of brackets) DONE
- The full calculation function needs to be recursive (shouldn't be hard) DONE

- Negative numbers
- Adjacent closing brackets
- Using the result in the next calculation and resetting
*/

const numberButtons = document.querySelectorAll(".NumberButton");
const buttonPlus = document.getElementById("ButtonPlus");
const buttonMinus = document.getElementById("ButtonMinus");
const buttonMultiply = document.getElementById("ButtonMultiply");
const buttonDivide = document.getElementById("ButtonDivide");
const buttonEquals = document.getElementById("ButtonEquals");
const buttonLeftBracket = document.getElementById("ButtonLeftBracket");
const buttonRightBracket = document.getElementById("ButtonRightBracket");
const buttonClear = document.getElementById("ButtonClear");

const result = document.getElementById("result");

const testButton = document.getElementById("Test");

class operationSymbol
{
    constructor(name, symbol = null)
    {
        this.name = name;
        this.symbol = symbol;
    }
}

const addition = new operationSymbol("addition", "+");
const subtraction = new operationSymbol("subtraction", "-");
const multiplication = new operationSymbol("multiplication", "*");
const division = new operationSymbol("division", "/");
const end = new operationSymbol("end", null);

class operation
{
    /*
    Possible types:
    - addition
    - subtraction
    - multiplication
    - division
    - end
    */
    constructor(value, operationType = multiplication)
    {
        this.value = value;
        this.operationType = operationType;
        this.type = "operation";
    }
}

// Essentially has to be like a linked list so you know which bracket level to return to when you exit a lower one
class bracketLevel
{
    constructor(numbersToCalulate, previousLevel, operationType = multiplication) // multiply any of the following numbers by default
    {
        this.numbersToCalulate = new Array();
        this.previousLevel = previousLevel;
        this.operationType = operationType;
        this.type = "bracketLevel";
    }
}

let currentValue = "";
let displayValue = "";
let fullOperation = new bracketLevel(new Array(), null, null);
const topLevel = fullOperation; // using this to check the equals button (you can only end the operation when you're back at the top level)
let currentBracketLevel = fullOperation;

testButton.addEventListener('click', function(e)
{
    console.log(topLevel);
    console.log(currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1]);
    // let testArray = [0,1,2,3,4];
    // console.log(testArray);
    // testArray.splice(1, 0, 9);
    // console.log(testArray);

    // let a = new operation(10, division);
    // let b = new operation(3, multiplication);
    // console.log(parseOperations(a, b));
});

// Constructing numbers
for(let button of numberButtons)
{
    button.addEventListener('click', function(e)
    {
        if(currentValue === "")
        {
            currentValue = button.textContent;
        }
        else
        {
            currentValue = currentValue + button.textContent;
        }

        displayValue = displayValue + button.textContent;
        result.textContent = displayValue;
    });
}

buttonPlus.addEventListener('click', function(e)
{
    // If no value is typed in, modify the previous operation type (they are named "operationType" in both classes for precisely this reason)
    if(currentValue === "")
    {
        currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType = addition;
        displayValue = replaceCharacterInString(displayValue, displayValue.length-2, addition.symbol);
        result.textContent = displayValue;
    }
    else
    {
        currentBracketLevel.numbersToCalulate.push(new operation(currentValue, addition));
        currentValue = "";
        displayValue = displayValue + addition.symbol + " ";
        result.textContent = displayValue;
    }
});

buttonMinus.addEventListener('click', function(e)
{
    // If no value is typed in, modify the previous operation type (they are named "operationType" in both classes for precisely this reason)
    if(currentValue === "")
    {
        currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType = subtraction;
        displayValue = replaceCharacterInString(displayValue, displayValue.length-2, subtraction.symbol);
        result.textContent = displayValue;
    }
    else
    {
        currentBracketLevel.numbersToCalulate.push(new operation(currentValue, subtraction));
        currentValue = "";
        displayValue = displayValue + subtraction.symbol + " ";
        result.textContent = displayValue;
    }
    
});

buttonMultiply.addEventListener('click', function(e)
{
    // If no value is typed in, modify the previous operation type (they are named "operationType" in both classes for precisely this reason)
    if(currentValue === "")
    {
        currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType = multiplication;
        displayValue = replaceCharacterInString(displayValue, displayValue.length-2, multiplication.symbol);
        result.textContent = displayValue;
    }
    else
    {
        currentBracketLevel.numbersToCalulate.push(new operation(currentValue, multiplication));
        currentValue = "";
        displayValue = displayValue + multiplication.symbol + " ";
        result.textContent = displayValue;
    }
    
});

buttonDivide.addEventListener('click', function(e)
{
    // If no value is typed in, modify the previous operation type (they are named "operationType" in both classes for precisely this reason)
    if(currentValue === "")
    {
        currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType = division;
        displayValue = replaceCharacterInString(displayValue, displayValue.length-2, divison.symbol);
        result.textContent = displayValue;
    }
    else
    {
        currentBracketLevel.numbersToCalulate.push(new operation(currentValue, division));
        currentValue = "";
        displayValue = displayValue + division.symbol + " ";
        result.textContent = displayValue;
    }
    
});

buttonLeftBracket.addEventListener('click', function(e)
{
    if(currentValue != "") // if there's currently some value typed in, multiply it by whatever's in the bracket by default
    {
        currentBracketLevel.numbersToCalulate.push(new operation(currentValue, multiplication));
    }
    currentBracketLevel.numbersToCalulate.push(new bracketLevel(new Array(), currentBracketLevel)); // create a new bracket level
    currentBracketLevel = currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1]; // enter into it
    currentValue = "";
    displayValue = displayValue + "(";
    result.textContent = displayValue;
});

buttonRightBracket.addEventListener('click', function(e)
{
    // Exits the current level of brackets
    if(currentBracketLevel.previousLevel != null)
    {
        if(currentValue != "")
        {
            currentBracketLevel.numbersToCalulate.push(new operation(currentValue, end));
        }
        currentBracketLevel = currentBracketLevel.previousLevel;
        currentValue = "";
        displayValue = displayValue + ")" + currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType.symbol + " ";
        result.textContent = displayValue;
    }
    // else if(currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].previousLevel != undefined)
    // {
    //     console.log("does this run?");
    //     currentBracketLevel = currentBracketLevel.previousLevel;
    //     currentValue = "";
    //     replaceCharacterInString(displayValue, displayValue.length-1, ")" + currentBracketLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType.symbol + " ");
    //     result.textContent = displayValue;
    // }
    else
    {
        alert("No brackets to close");
    }
});

buttonEquals.addEventListener('click', function(e)
{
    if(currentBracketLevel === topLevel)
    {
        // If an input was typed in when equals was pressed, add it to the end of the list, otherwise change the last input's type to end
        if(currentValue != "")
        {
            topLevel.numbersToCalulate.push(new operation(currentValue, end));
        }
        else
        {
            topLevel.numbersToCalulate[currentBracketLevel.numbersToCalulate.length-1].operationType = end;
        }
        const finalArray = structuredClone(topLevel);
        const completeResult = calculate(finalArray);
        result.textContent = completeResult.value;
    }
    else
    {
        alert("Close all brackets first");
    }
});

// Has to be recursive and has to somehow preserve order of operations
function calculate(currentBracketLevel)
{
    while(currentBracketLevel.numbersToCalulate.length > 1)
    {
        // First pass for multiplication and division
        for(let i = 0;i<currentBracketLevel.numbersToCalulate.length-1;i++)
        {
            if(currentBracketLevel.numbersToCalulate[i].operationType.name === "multiplication" || currentBracketLevel.numbersToCalulate[i].operationType.name === "division")
            {
                if(currentBracketLevel.numbersToCalulate[i].previousLevel != undefined) // If the object's previousLevel property is undefined, it means it's not a bracketLevel object
                {
                    let collapsedBracketOperation = calculate(currentBracketLevel.numbersToCalulate[i]); // Collapse brackets into a singular value
                    collapsedBracketOperation.operationType = currentBracketLevel.numbersToCalulate[i].operationType; // Set the operation type of the new collapsed bracket to whatever followed the original brackets
                    currentBracketLevel.numbersToCalulate[i] = collapsedBracketOperation;
                }
                if(currentBracketLevel.numbersToCalulate[i+1].previousLevel != undefined) // If the object's previousLevel property is undefined, it means it's not a bracketLevel object
                {
                    let collapsedBracketOperation = calculate(currentBracketLevel.numbersToCalulate[i+1]); // Collapse brackets into a singular value
                    collapsedBracketOperation.operationType = currentBracketLevel.numbersToCalulate[i+1].operationType; // Set the operation type of the new collapsed bracket to whatever followed the original brackets
                    currentBracketLevel.numbersToCalulate[i+1] = collapsedBracketOperation;
                }
                let firstValue = currentBracketLevel.numbersToCalulate.splice(i,1)[0]; // need the [0] because splice outputs an array (even though I'm only pulling one thing out)
                let secondValue = currentBracketLevel.numbersToCalulate.splice(i,1)[0];
                currentBracketLevel.numbersToCalulate.splice(i,0,parseOperations(firstValue,secondValue));
                i--;
            }
        }

        // Second pass for addition and subtraction
        for(let i = 0;i<currentBracketLevel.numbersToCalulate.length-1;i++)
        {
            if(currentBracketLevel.numbersToCalulate[i].previousLevel != undefined) // If the object's previousLevel property is undefined, it means it's not a bracketLevel object
            {
                let collapsedBracketOperation = calculate(currentBracketLevel.numbersToCalulate[i]); // Collapse brackets into a singular value
                collapsedBracketOperation.operationType = currentBracketLevel.numbersToCalulate[i].operationType; // Set the operation type of the new collapsed bracket to whatever followed the original brackets
                currentBracketLevel.numbersToCalulate[i] = collapsedBracketOperation;
            }
            if(currentBracketLevel.numbersToCalulate[i+1].previousLevel != undefined) // If the object's previousLevel property is undefined, it means it's not a bracketLevel object
            {
                let collapsedBracketOperation = calculate(currentBracketLevel.numbersToCalulate[i+1]); // Collapse brackets into a singular value
                collapsedBracketOperation.operationType = currentBracketLevel.numbersToCalulate[i+1].operationType; // Set the operation type of the new collapsed bracket to whatever followed the original brackets
                currentBracketLevel.numbersToCalulate[i+1] = collapsedBracketOperation;
            }
            let firstValue = currentBracketLevel.numbersToCalulate.splice(i,1)[0]; // need the [0] because splice outputs an array (even though I'm only pulling one thing out)
            let secondValue = currentBracketLevel.numbersToCalulate.splice(i,1)[0];
            currentBracketLevel.numbersToCalulate.splice(i,0,parseOperations(firstValue,secondValue));
            i--;
        }
    }

    return currentBracketLevel.numbersToCalulate[0];
}

// Necessary because there's no character replacement function in javascript for some reason
function replaceCharacterInString(stringTouse, index, character)
{
    return stringTouse.substring(0,index) + character + stringTouse.substring(index + 1);
}

// Pass 2 operation objects, perform the operation and get a new one.
function parseOperations(first, second)
{
    let value = 0;

    if(first.operationType.name === "addition")
    {
        value = parseInt(first.value) + parseInt(second.value);
    }

    if(first.operationType.name === "subtraction")
    {
        value = parseInt(first.value) - parseInt(second.value);
    }

    if(first.operationType.name === "multiplication")
    {
        value = parseInt(first.value) * parseInt(second.value);
    }

    if(first.operationType.name === "division")
    {
        value = parseInt(first.value) / parseInt(second.value);
    }

    return new operation(value, second.operationType);
}