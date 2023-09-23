/**
* @module variables
*/

const rightAnswers = ["465", "25 Öre", "42 och 24", "31 december", "Inget av dem"];
const points = [];

let currentTest = "1x2";
let total = 0;
let current = 0;
let inquiring = 0;
let fizzBuzzAns = "";

const variables = {
    currentTest: function () {
        return currentTest;
    },

    updateTest: function (test) {
        currentTest = test;
    },

    total: function () {
        return total;
    },

    updateTotal: function (num) {
        total += num;
    },

    current: function () {
        return current;
    },

    updateCurrent: function () {
        current++;
    },

    minusCurrent: function () {
        current--;
    },

    resetCurrent: function () {
        current = 0;
    },

    rightAnswers: function (pos) {
        return rightAnswers[pos];
    },

    inquiring: function () {
        return inquiring;
    },

    updateInquiring: function () {
        inquiring++;
    },

    resetInquiring: function () {
        inquiring = 0;
    },

    fizzBuzz: function () {
        return fizzBuzzAns;
    },

    updatefizzBuzz: function (el) {
        fizzBuzzAns = el;
    },

    points: function () {
        return points;
    },

    updatePoints: function (num) {
        points.push(num);
    }
};

export { variables };
