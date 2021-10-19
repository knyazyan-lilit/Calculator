class View {
    constructor() {
        this.currentOp = "";
        this.firstOp = 0;
        this.isOp = false;
        this.rewrite = true;
        this.countOfdots = 0;
        this.AC = document.querySelector(".AC");
        this.reverse = document.querySelector(".reverse");
        this.percent = document.querySelector(".percent");
        this.divide = document.querySelector(".divide");
        this.seven = document.querySelector(".seven");
        this.eight = document.querySelector(".eight");
        this.nine = document.querySelector(".nine");
        this.multiply = document.querySelector(".multiply");
        this.four = document.querySelector(".four");
        this.five = document.querySelector(".five");
        this.six = document.querySelector(".six");
        this.minus = document.querySelector(".minus");
        this.one = document.querySelector(".one");
        this.two = document.querySelector(".two");
        this.three = document.querySelector(".three");
        this.plus = document.querySelector(".plus");
        this.zero = document.querySelector(".zero");
        this.dot = document.querySelector(".dot");
        this.equal = document.querySelector(".equal");
    }

    addListener(handler) {
        this.zero.addEventListener("click", () => { this.displayScreen("0") });
        this.one.addEventListener("click", () => { this.displayScreen("1") });
        this.two.addEventListener("click", () => { this.displayScreen("2") });
        this.three.addEventListener("click", () => { this.displayScreen("3") });
        this.four.addEventListener("click", () => { this.displayScreen("4") });
        this.five.addEventListener("click", () => { this.displayScreen("5") });
        this.six.addEventListener("click", () => { this.displayScreen("6") });
        this.seven.addEventListener("click", () => { this.displayScreen("7") });
        this.eight.addEventListener("click", () => { this.displayScreen("8") });
        this.nine.addEventListener("click", () => { this.displayScreen("9") });
        this.dot.addEventListener("click", () => { this.displayScreen(".") });
        this.AC.addEventListener("click", () => {
            this.currentOp = "AC";
            handler("AC")
        });
        this.reverse.addEventListener("click", () => {
            this.currentOp = "+/-";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
            handler("+/-")
        })
        this.percent.addEventListener("click", () => {
            this.currentOp = "%";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
            handler("%")
        })
        this.divide.addEventListener("click", () => {
            this.currentOp = "÷"
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        this.multiply.addEventListener("click", () => {
            this.currentOp = "×";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        this.minus.addEventListener("click", () => {
            this.currentOp = "-";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        this.plus.addEventListener("click", () => {
            this.currentOp = "+";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        this.equal.addEventListener("click",() => {
            handler(this.currentOp);
        });
    }

    displayScreen(val) {
        // validate();
        // if (isOp) {
        //     clearScreen();
        //     isOp = false;
        //     countOfdots = 0;
        // }
        document.getElementsByClassName("interface")[0].value += val;
        // if (val != '.' || (val == '.' && countOfdots === 0)) {
        //     if (val == '.') {
        //         ++countOfdots;
        //     }
        //     document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value + val;
        // }
        // if (rewrite == true) {
        //     clearScreen();
        //     document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value + val;
        // }
        // rewrite = false;
    }

    clearScreen() {
        isOp = false;
        countOfdots = 0;
        document.getElementsByClassName("interface")[0].value = "";
    }

    validate(evt) {
        evt = (evt) ? evt : window.event;
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((evt != undefined && evt != null) && charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 46)) {
            return false;
        }

        let inputString = document.getElementsByClassName("interface")[0].value
        if (inputString[0] == 0 && inputString[1] !== ".") {
            document.getElementsByClassName("interface")[0].value = inputString.substr(1, inputString.length);
        }
        if (inputString[0] == ".") {
            document.getElementsByClassName("interface")[0].value = 0 + inputString;
        }
        return true;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentOp = this.view.currentOp;
        this.firstOp = this.view.firstOp;
        this.countOfdots = this.view.countOfdots;
        this.rewrite = this.view.rewrite;
    }
    handleEvent(currentOp) {
        if (currentOp == "+") {
            this.view.displayScreen(this.model.sum(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
        if (currentOp == "-") {
            this.view.displayScreen(this.model.sub(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
        if (currentOp == "*") {
            this.view.displayScreen(this.model.mul(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
        if (currentOp == "÷") {
            this.view.displayScreen(this.model.div(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
        if (currentOp == "AC") {
            this.view.displayScreen(this.view.clearScreen());
        }
        if (currentOp == "+/-") {
            this.view.displayScreen(this.model.reverse(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
        if (currentOp == "%") {
            this.view.displayScreen(this.model.percent(firstOp));
            this.firstOp = 0;
            this.countOfdots = 0;
            this.rewrite = true;
        }
    }
    run() {
        this.view.addListener(this.handleEvent);
    }
}

class Model {
    constructor() {
        this.result = 0;
    }
    sum(firstOp) {
        this.result = Number(this.firstOp) + Number(document.getElementsByClassName("interface")[0].value);
        return this.result;
    }
    sub(firstOp) {
        this.result = Number(this.firstOp) - Number(document.getElementsByClassName("interface")[0].value);
        return this.result;
    }
    mul(firstOp) {
        this.result = Number(this.firstOp) * Number(document.getElementsByClassName("interface")[0].value);
        return this.result;
    }
    div(firstOp) {
        this.result = Number(this.firstOp) / Number(document.getElementsByClassName("interface")[0].value);
        return this.result;
    }
    reverse(firstOp) {
        if (firstOp != 0) {
            this.result = -1 * firstOp;
        }
        return this.result;
    }
    percent(firstOp) {
        this.result = firstOp % 100;
        return this.result;
    }
}
// debugger;

function main() {
    let model = new Model();
    let view = new View();
    let controller = new Controller(model, view);
    controller.run();
}
main();
