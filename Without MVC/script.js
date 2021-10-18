let firstValue = 0;
let currentOp;
let isOp = false;
let rewrite = true;
let countOfdots = 0;

function validate(evt) {
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

function clearScreen() {
    isOp = false;
    countOfdots = 0;
    document.getElementsByClassName("interface")[0].value = "";
}

function reverse() {
    let inputValue = document.getElementsByClassName("interface")[0].value;
    if (document.getElementsByClassName("interface")[0].value != 0) {
        document.getElementsByClassName("interface")[0].value = -1 * inputValue;
    }
}

function divide_hundred() {
    let inputValue = document.getElementsByClassName("interface")[0].value;
    document.getElementsByClassName("interface")[0].value = inputValue / 100;
    isOp = true;
    countOfdots = 0;
}

function display(val) {
    validate();

    if (isOp) {
        clearScreen();
        isOp = false;
        countOfdots = 0;
    }
    if (val == '.' && document.getElementsByClassName("interface")[0].value == 0 && document.getElementsByClassName("interface")[0].value.length == 0) {
        document.getElementsByClassName("interface")[0].value = "0" + val;
        countOfdots++;
    }
    if (val != '.' || (val == '.' && countOfdots === 0)) {
        if (val == '.') {
            ++countOfdots;
        }
        document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value + val;
    }
    if (rewrite == true) {
        clearScreen();
        document.getElementsByClassName("interface")[0].value = document.getElementsByClassName("interface")[0].value + val;
    }
    rewrite = false;
}

function mySum(val) {
    currentOp = val;
    firstValue = document.getElementsByClassName("interface")[0].value;
    isOp = true;
    countOfdots = 0;
}

function mySub(val) {
    currentOp = val;
    firstValue = document.getElementsByClassName("interface")[0].value;
    isOp = true;
    countOfdots = 0;
}

function myMul(val) {
    currentOp = val;
    firstValue = document.getElementsByClassName("interface")[0].value;
    isOp = true;
    countOfdots = 0;
}

function myDiv(val) {
    currentOp = val;
    firstValue = document.getElementsByClassName("interface")[0].value;
    isOp = true;
    countOfdots = 0;
}

function equal() {
    if (currentOp == "+") {
        document.getElementsByClassName("interface")[0].value = Number(firstValue) + Number(document.getElementsByClassName("interface")[0].value);
        firstValue = 0;
    }
    if (currentOp == "-") {
        document.getElementsByClassName("interface")[0].value = Number(firstValue) - Number(document.getElementsByClassName("interface")[0].value);
        firstValue = 0;
    }
    if (currentOp == "×") {
        document.getElementsByClassName("interface")[0].value = Number(firstValue) * Number(document.getElementsByClassName("interface")[0].value);
        firstValue = 0;
    }
    if (currentOp == "÷") {
        document.getElementsByClassName("interface")[0].value = Number(firstValue) / Number(document.getElementsByClassName("interface")[0].value);
        firstValue = 0;
    }
    countOfdots = 0;
    rewrite = true;
}
