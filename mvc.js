class View {
    constructor() {
        this.currentOp = '';
        this.firstOp = 0;
        this.isOp = false;
        this.rewrite = true;
        this.countOfdots = 0;
    }

    addListener(handler) {
        document.querySelector(".AC").addEventListener("click", () => {
            this.currentOp = "AC";
            handler("AC")
        });
        document.querySelector(".reverse").addEventListener("click", () => {
            this.currentOp = "+/-";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
            handler("+/-")
        })
        document.querySelector(".percent").addEventListener("click", () => {
            this.currentOp = "%";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
            handler("%")
        })
        document.querySelector(".divide").addEventListener("click", () => {
            this.currentOp = "÷"
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        document.querySelector(".seven").addEventListener("click", () => { this.displayScreen("7"); });
        document.querySelector(".eight").addEventListener("click", () => { this.displayScreen("8"); });
        document.querySelector(".nine").addEventListener("click", () => { this.displayScreen("9"); });
        document.querySelector(".multiply").addEventListener("click", () => {
            this.currentOp = "×";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        document.querySelector(".four").addEventListener("click", () => { this.displayScreen("4") });
        document.querySelector(".five").addEventListener("click", () => { this.displayScreen("5") });
        document.querySelector(".six").addEventListener("click", () => { this.displayScreen("6") });
        document.querySelector(".minus").addEventListener("click", () => {
            this.currentOp = "-";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        document.querySelector(".one").addEventListener("click", () => { this.displayScreen("1") });
        document.querySelector(".two").addEventListener("click", () => { this.displayScreen("2") });
        document.querySelector(".tree").addEventListener("click", () => { this.displayScreen("3") });
        document.querySelector(".plus").addEventListener("click", () => {
            this.currentOp = "+";
            this.isOp = true;
            this.firstOp = document.getElementsByClassName("interface")[0].value;
        });
        document.querySelector(".zero").addEventListener("click", () => { this.displayScreen("0") });
        document.querySelector(".dot").addEventListener("click", () => { this.displayScreen(".") });
        document.querySelector(".equal").addEventListener("click", function() {
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
        document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value + val;
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
        if (document.getElementsByClassName("interface")[0].value[0] == 0 && document.getElementsByClassName("interface")[0].value[1] !== ".") {
            document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value.substr(1, document.getElementsByClassName("interface")[0].value.length);
        }
        if (document.getElementsByClassName("interface")[0].value[0] == ".") {
            document.getElementsByClassName("interface")[0].value = 0 + document.getElementsByClassName("interface")[0].value;
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
            this.view.displayScreen(this.view.clear(""));
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