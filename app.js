const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // com isso estaremos sobrescrevendo os dados do displayValue SE o atual valor for 0;
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    // se displayValue não conter um ponto decimal:
    if (!calculator.displayValue.includes(dot)) {
        // acrescente o ponto.
        calculator.displayValue += dot;
    }
};

function handleOperator(nexOperator) {
    // Desestruturar as propriedades do objeto calculadora
    const { firstOperand, displayValue, operator } = calculator;

    // parseFloat irá converter o conteúdo de displayValue para um ponto flutuante;
    const inputValue = parseFloat(displayValue);

    // aqui iremos substituir o sinal de operação, para caso o usuário mude de ideia;
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nexOperator;
        console.log(calculator);
        return;
    }

    // agora iremos verificar se firstOperand é vaziu ou indefinido (NaN);
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nexOperator;
    console.log(calculator);
};

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function updateDisplay() {
    // selecionando o elemento com a classe calculator-screen
    const display = document.querySelector('.calculator-screen');
    // atualizar o valor do elemento com o conteúdo do "display.value"
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;

    // aqui iremos checar se o local onde foi clicado é um botão
    // se não for, ele sairá da função
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});