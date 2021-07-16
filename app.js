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
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

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

    // ↓ agora iremos verificar se firstOperand é vaziu ou indefinido (NaN);
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        // ↓ Isso é feito para restringir a quantidade de dígitos após o 0 para 7; 
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
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

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = false;
    console.log(calculator);
}

function updateDisplay() {
    // selecionando o elemento com a classe calculator-screen
    const display = document.querySelector('.calculator-screen');
    // atualizar o valor do elemento com o conteúdo do "display.value"
    display.value = calculator.displayValue;
    console.log(display)
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // agora vai checar se a tecla é um valor inteiro
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});