class View {
    constructor() {
        this.AC = document.querySelector('.AC');
        this.reverse = document.querySelector('.reverse');
        this.percent = document.querySelector('.percent');
        this.divide = document.querySelector('.divide');
        this.seven = document.querySelector('.seven');
        this.eight = document.querySelector('.eight');
        this.nine = document.querySelector('.nine');
        this.multiply = document.querySelector('.multiply');
        this.four = document.querySelector('.four');
        this.five = document.querySelector('.five');
        this.six = document.querySelector('.six');
        this.minus = document.querySelector('.minus');
        this.one = document.querySelector('.one');
        this.two = document.querySelector('.two');
        this.three = document.querySelector('.three');
        this.plus = document.querySelector('.plus');
        this.zero = document.querySelector('.zero');
        this.dot = document.querySelector('.dot');
        this.equal = document.querySelector('.equal');
    }

    addListener(handler) {
        this.zero.addEventListener('click', () => { handler('0') });
        this.one.addEventListener('click', () => { handler('1') });
        this.two.addEventListener('click', () => { handler('2') });
        this.three.addEventListener('click', () => { handler('3') });
        this.four.addEventListener('click', () => { handler('4') });
        this.five.addEventListener('click', () => { handler('5') });
        this.six.addEventListener('click', () => { handler('6') });
        this.seven.addEventListener('click', () => { handler('7') });
        this.eight.addEventListener('click', () => { handler('8') });
        this.nine.addEventListener('click', () => { handler('9') });
        this.dot.addEventListener('click', () => { handler('.') });
        this.AC.addEventListener('click', () => {
            handler(this.AC.value);
        });
        this.reverse.addEventListener('click', () => {
            handler(this.reverse.value);
        })
        this.percent.addEventListener('click', () => {
            handler(this.percent.value);
        })
        this.divide.addEventListener('click', () => {
            handler(this.divide.value);
        });
        this.multiply.addEventListener('click', () => {
            handler(this.multiply.value);
        });
        this.minus.addEventListener('click', () => {
            handler(this.minus.value);
        });
        this.plus.addEventListener('click', () => {
            handler(this.plus.value);
        });
        this.equal.addEventListener('click', () => {
            handler(this.equal.value);
        });
    }

    getInputText() {
        return document.getElementsByClassName('interface')[0].value;
    }
    setInputText(value) {
        document.getElementsByClassName('interface')[0].value = value;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent(currentValue) {
        if (!isNaN(currentValue)) {
            this.displayOperationResult(currentValue);
            return;
        } else if (currentValue == '.') {
            this.displayOperationResult(currentValue);
            return;
        } else if (currentValue == 'AC') {
            this.model.setFirstOperand(0);
            this.model.setResult(0);
            this.clearScreen();
            return;
        } else if (currentValue == '%') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setIsOperation(true);
            this.displayOperationResult(this.model.percent(this.model.getFirstOperand()));
            return;
        } else if (currentValue == '+/-') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setIsOperation(true);
            this.displayOperationResult(this.model.reverse(this.model.getFirstOperand()));
        }

        if (currentValue == '+') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setPrevOperation('+');
            this.model.setIsOperation(true);
            this.model.setCountOfdots(0);
        } else if (currentValue == '-') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setPrevOperation('-');
            this.model.setIsOperation(true);
            this.model.setCountOfdots(0);
        } else if (currentValue == '×') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setPrevOperation('×');
            this.model.setIsOperation(true);
            this.model.setCountOfdots(0);
        } else if (currentValue == '÷') {
            this.model.setFirstOperand(this.view.getInputText());
            this.model.setPrevOperation('÷');
            this.model.setIsOperation(true);
            this.model.setCountOfdots(0);
        }

        if (currentValue == '=') {
            let prevOperation = this.model.getPrevOperation();
            if (prevOperation == '+') {
                let sum = this.model.sum(this.model.getFirstOperand(), this.view.getInputText());
                this.displayOperationResult(sum, currentValue);
                this.model.setFirstOperand(0);
            } else if (prevOperation == '-') {
                let sub = this.model.sub(this.model.getFirstOperand(), this.view.getInputText());
                this.displayOperationResult(sub, currentValue);
                this.model.setFirstOperand(0);
            } else if (prevOperation == '×') {
                let mul = this.model.mul(this.model.getFirstOperand(), this.view.getInputText());
                this.displayOperationResult(mul, currentValue);
                this.model.setFirstOperand(0);
            } else if (prevOperation == '÷') {
                let div = this.model.div(this.model.getFirstOperand(), this.view.getInputText());
                this.displayOperationResult(div, currentValue);
                this.model.setFirstOperand(0);
            }
            this.model.setCountOfdots(0);
            this.model.setRewrite(true);
        }
    }

    displayOperationResult(val, currentValue = '') {
        this.validate();
        if (this.model.getIsOperation() == true) {
            this.clearScreen();
            this.model.setIsOperation(false);
            this.model.setCountOfdots(0);
        }
        if (val == '.' && this.view.getInputText() == 0 && this.view.getInputText().length == 0) {
            this.view.setInputText('0' + val);
            this.model.setCountOfdots(this.model.getCountOfdots() + 1);
        }
        if (currentValue == '=') {
            this.view.setInputText(val);
            this.model.setRewrite(true);
            return;
        }
        if ((val != '.' && this.model.getRewrite() == false) || ((val == '.' && this.model.getCountOfdots() === 0) && this.model.getRewrite() == false)) {
            if (val == '.') {
                this.model.setCountOfdots(this.model.getCountOfdots() + 1);;
            }
            this.view.setInputText(this.view.getInputText() + val);
            this.model.setRewrite(false);
            return;
        }

        if (this.model.getRewrite() == true) {
            this.clearScreen();
            this.view.setInputText(this.view.getInputText() + val);
        }
        this.model.setRewrite(false);
    }

    validate() {
        let inputString = this.view.getInputText();
        if (inputString[0] == 0 && inputString[1] !== '.') {
            this.view.setInputText(inputString.substr(1, inputString.length));
        }
        if (inputString[0] == '.') {
            this.view.setInputText(0 + inputString);
        }
    }
    clearScreen() {
        this.model.setIsOperation(false);
        this.model.setCountOfdots(0);
        this.view.setInputText('');
    }
    run() {
        this.view.addListener(this.handleEvent);
    }
}

class Model {
    constructor() {
        this.result = 0;
        this.firstOperand = 0;
        this.countOfdots = 0;
        this.rewrite = true;
        this.prevOperation = '';
        this.isOperation = false;
    }
    getFirstOperand() {
        return this.firstOperand;
    }
    setFirstOperand(operand) {
        this.firstOperand = operand;
    }
    getResult() {
        return this.result;
    }
    setResult(value) {
        this.result = value;
    }
    getCountOfdots() {
        return this.countOfdots;
    }
    setCountOfdots(dotsCount) {
        this.countOfdots = dotsCount;
    }
    getRewrite() {
        return this.rewrite;
    }
    setRewrite(newRewrite) {
        this.rewrite = newRewrite;
    }
    setPrevOperation(operation) {
        this.prevOperation = operation;
    }
    getPrevOperation() {
        return this.prevOperation;
    }
    getIsOperation() {
        return this.isOperation;
    }
    setIsOperation(isOp) {
        this.isOperation = isOp;
    }

    sum(firstOperand, secondOperand) {
        this.result = Number(firstOperand) + Number(secondOperand);
        this.firstOperand = 0;
        this.countOfdots = 0;
        return this.result;
    }
    sub(firstOperand, secondOperand) {
        this.result = Number(firstOperand) - Number(secondOperand);
        this.firstOperand = 0;
        this.countOfdots = 0;
        return this.result;
    }
    mul(firstOperand, secondOperand) {
        this.result = Number(firstOperand) * Number(secondOperand);
        this.firstOperand = 0;
        this.countOfdots = 0;
        return this.result;
    }
    div(firstOperand, secondOperand) {
        this.result = Number(firstOperand) / Number(secondOperand);
        this.firstOperand = 0;
        this.countOfdots = 0;
        return this.result;
    }
    reverse(firstOperand) {
        if (firstOperand != 0) {
            this.result = -1 * firstOperand;
        }
        this.firstOperand = 0;
        return this.result;
    }
    percent(firstOperand) {
        this.result = firstOperand / 100;
        this.firstOperand = 0;
        this.countOfdots = 0;
        return this.result;
    }
}

function main() {
    let model = new Model();
    let view = new View();
    let controller = new Controller(model, view);
    controller.run();
}
main();
