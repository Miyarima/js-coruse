/**
* @module fizzbuzz
*/

import { setTitle, setText, setBtnText, setProccedBtn, setProccedBtnEvent, showBtns, hideBtns } from "./functionality.js";
import { variables } from "./varibles.js";
import { memory } from "./memory.js";

/**
 * This function generats a few random numbers
 * @returns {array} With a few random numbers
 */
function generateSequence () {
    const rand = Math.floor(Math.random() * 100);
    const sequence = [];
    for (let i = rand; i < (rand + 8); i++) {
        sequence.push(i);
    }
    return sequence;
}

/**
 * This function check if the number is fizzbuzz, fizz, buzz
 * or none of them.
 * @param {int} num the number to check for fizzbuzz
 * @returns {string} the result
 */
function checkFizzBuzz (num) {
    if (num % 3 === 0 && num % 5 === 0) {
        return "FizzBuzz";
    } else if (num % 3 === 0) {
        return "Fizz";
    } else if (num % 5 === 0) {
        return "Buzz";
    } else {
        return num.toString();
    }
}

/**
 * This function will add either the clicked right or wrong class.
 * @param {event} el the clicked button
 */
function checkIfRight (el) {
    const clickedBtn = document.querySelector(".clicked");
    if (clickedBtn.innerHTML === variables.fizzBuzz()) {
        el.target.classList.add("clicked-right");
        variables.updateCurrent();
    } else {
        el.target.classList.add("clicked-wrong");
    }
}

/**
 * This function will add the clicked class to
 * the buttons that has been clicked.
 * @param {event} el the clicked button
 */
function clicked (el) {
    const selected = document.querySelectorAll(".clicked");
    if (selected.length < 1) {
        el.target.setAttribute("class", "clicked");
        checkIfRight(el);
    }
    variables.updateInquiring();
}

/**
 * The main function of the fizzbuzz module.
 * This function displays the fizzbuzz sequence, and changes the
 * title and text to whats appropriate.
 */
function fizz () {
    if (variables.inquiring() === 0) {
        const sequence = generateSequence();
        const fizzbuzzArr = [];

        for (let i = 0; i < sequence.length; i++) {
            if (i > 6) {
                fizzbuzzArr.push(` ?`);
            } else {
                fizzbuzzArr.push(` ${checkFizzBuzz(sequence[i])}`);
            }
        }
        variables.updatefizzBuzz(checkFizzBuzz(sequence[sequence.length - 1]));
        setTitle("");
        setText(`<p>${fizzbuzzArr}</p>`);
        setProccedBtn("Fortsätt");
        showBtns("hidden", "btn", clicked);
        setBtnText("Buzz", "Fizz", sequence[sequence.length - 1], "FizzBuzz");
    } else {
        hideBtns("btn", "hidden", clicked);
        setTitle("FizzBuzz");
        setText(`<p>Du fick ${variables.current() * 3} poäng av 3 möjliga</p>`);
        setProccedBtnEvent(fizz, memory);
    }
}

/**
 * This functon set the title and descripton of the
 * fizzbuzz test. And if it's the first time loading,
 * it will save the prior test score.
 */
function fizzBuzz () {
    setTitle("FizzBuzz");
    setText(
        `<p>Du kommer att få en sekvens med siffror.</p>
        <p>Om talet är delbart med 3 byts talet mot "Fizz", om det är delbart med 5 byts talet mot "Buzz". Om båda stämmer blir talet "FizzBuzz".</p>`
    );
    hideBtns("btn", "hidden", clicked);
    setProccedBtn("Börja");
    setProccedBtnEvent(fizzBuzz, fizz);

    if (variables.currentTest() === "1x2") {
        variables.updateTotal(variables.current() * 3);
        variables.updatePoints(variables.current() * 3);
        variables.resetCurrent();
        variables.resetInquiring();
    }
    variables.updateTest("fizzbuzz");
}

export { fizzBuzz };
