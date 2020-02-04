// DOM elements
const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const lowercaseEl = document.querySelector("#lowercase");
const uppercaseEl = document.querySelector("#uppercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const generateEl = document.querySelector("#generate");
const clipboardEl = document.querySelector("#clipboard");

const getRandomFunc = (howManyNum, startingNum) => {
    return String.fromCharCode(Math.floor(Math.random() * howManyNum) + startingNum);
}

// Generator functions - http://www.net-comber.com/charset.html
const getRandomLower = () => getRandomFunc(26,97);   
const getRandomUpper = () => getRandomFunc(26,65);   
const getRandomNumber = () => getRandomFunc(10,48);   
const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}[]/,."
    return symbols[Math.floor(Math.random() * symbols.length)];
}     

const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol; 
    console.log(typesCount);
    const typesArr = [{lower}, {upper}, {number}, {symbol}]; 
    const typesArrFiltered = typesArr.filter((currentObject) => Object.values(currentObject)[0]); 
    console.log(typesArrFiltered);

    if (typesCount === 0) {
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArrFiltered.forEach((currentType) => {
            const funcName = Object.keys(currentType)[0];
            console.log("funcname:" + funcName);
            generatedPassword += randomFunctions[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length); 
    return finalPassword;
}

generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;    
    const hasUpper = uppercaseEl.checked; 
    const hasNumber = numbersEl.checked; 
    const hasSymbol = symbolsEl.checked; 

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to the clipboard");
});