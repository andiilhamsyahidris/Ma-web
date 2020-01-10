const kalkulator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector("#displaynumber").innerText = kalkulator.displayNumber;
}

function clearKalkulator() {
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if(kalkulator.waitingForSecondNumber && kalkulator.firstNumber == kalkulator.displayNumber) {
        kalkulator.displayNumber = digit;
    } else {
        if(kalkulator.displayNumber === '0') {
            kalkulator.displayNumber = digit;
        } else {
            kalkulator.displayNumber += digit;
        }
    }
}

function negatifKalkulator() {
    if(kalkulator.displayNumber === '0') {
        return;
    }
    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function opeKalkulator(operator) {
    if(!kalkulator.waitingForSecondNumber) {
        kalkulator.operator = operator;
        kalkulator.waitingForSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;
    } else {
        alert("Operator sudah ditetapkan");
    }
}

function jumlahKalkulator() {
    if(kalkulator.firstNumber == null || kalkulator.operator == null) {
        alert("Anda belum menetapkan angka dan operator");
    }

    let result = 0;
    if(kalkulator.operator == '+') {
        result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    } else {
        result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
    }
    kalkulator.displayNumber = result;
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for(let button of buttons) {
    button.addEventListener('click', function(event) {
        const target= event.target;

        if(target.classList.contains('clear')) {
            clearKalkulator();
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('negative')) {
            negatifKalkulator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')) {
            opeKalkulator(target.innerText);
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) {
            jumlahKalkulator();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}




