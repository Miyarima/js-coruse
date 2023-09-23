/**
* @module perception
*/

import { setTitle, setText, setProccedBtn, setProccedBtnEvent, cancelTest, drawBox, drawTri } from "./functionality.js";
import { end } from "./result.js";
import { variables } from "./varibles.js";

let timer;

/**
 * This function adds the hidden class to all elements with
 * either the form-text or form class. And also removes the height
 * of the btn-div.
 */
function removeForms () {
    const div = document.querySelector(".form-text");
    const forms = document.querySelectorAll(".form");
    div.classList.add("hidden");
    for (const form of forms) {
        form.remove();
    }
}

/**
 * This function displays the score of the test
 * and changes the event on the procced button.
 */
function percFinish () {
    removeForms();
    setTitle("Uppfattningsförmåga");
    setText(`<p>Du fick ${variables.current()} poäng av 5 möjliga</p>`);
    setProccedBtnEvent(percFinish, end);
}

/**
 * This function checks if the clicked form
 * is the correct one, and if it is a point will be added
 * @param {event} el the clicked form
 */
function clickedForm (el) {
    const form = el.target;
    form.removeEventListener("click", clickedForm);

    if (form.classList.contains("red") ||
        form.classList.contains("box") ||
        form.classList.contains("red-tri")) {
        variables.minusCurrent();
    } else {
        variables.updateCurrent();
    }
}

/**
 * This function draws a form depending on which iteration it's on
 */
function randomForm () {
    if (variables.inquiring() === 0) {
        drawBox(".btn-div", "black", "box", clickedForm);
    } else if (variables.inquiring() === 1) {
        drawBox(".btn-div", "green", "rec", clickedForm);
    } else if (variables.inquiring() === 2) {
        drawTri(".btn-div", "blue-tri", clickedForm);
    } else if (variables.inquiring() === 3) {
        drawTri(".btn-div", "red-tri", clickedForm);
    } else if (variables.inquiring() === 4) {
        drawBox(".btn-div", "red", "box", clickedForm);
    } else if (variables.inquiring() === 5) {
        drawBox(".btn-div", "black", "rec", clickedForm);
    } else if (variables.inquiring() === 6) {
        drawBox(".btn-div", "blue", "box", clickedForm);
    } else if (variables.inquiring() === 7) {
        drawTri(".btn-div", "green-tri", clickedForm);
    } else if (variables.inquiring() === 8) {
        drawBox(".btn-div", "green", "box", clickedForm);
    } else if (variables.inquiring() === 9) {
        drawBox(".btn-div", "blue", "rec", clickedForm);
    }
    variables.updateInquiring();
}

/**
 * This function adds the description text for the test
 */
function printFormText () {
    const div = document.querySelector(".form-text");
    div.classList.remove("hidden");

    const formText = [
        "1. Har en annan färg än röd.",
        "2. Har en annan form än kvadrat...",
        "3. ...eller är röd och kvadrat"
    ];

    for (let i = 0; i < formText.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = formText[i];
        div.appendChild(p);
    }
}

/**
 * This function is the main function of the perception test. It
 * sets an interval for 20 seconds and inside a timeout for 1 second.
 * each iteration a new form is displayed
 */
function drawForms () {
    const btn = document.getElementById("proceed");
    btn.removeEventListener("click", drawForms);

    const divHeight = document.querySelector(".btn-div");
    divHeight.style.height = "140px";

    setTitle("Former");
    setText("<p>Klicka på de korrekta formerna.</p>");
    setProccedBtn("Fortsätt");
    printFormText();

    let count = 10;
    timer = setInterval(() => {
        randomForm();
        count--;

        setTimeout(function () {
            const form = document.querySelector(".form");
            if (form !== null) {
                form.remove();
            }
        }, 1000);

        if (count <= -1) {
            clearInterval(timer);
            divHeight.style.height = "10px";
            cancelTest(".form", clickedForm, percFinish);
        }
    }, 2000);
}

/**
 * This functon set the title and descripton of the
 * percption test. And if it's the first time loading,
 * it will save the prior test score.
 */
function perception () {
    setTitle("Uppfattningsförmåga");
    setText(
        `<p>Du ska klicka på former. Formen kommer att visas i en sekund, för att sedan försvinna. Nästa form visas en sekund senare. Du kommer att få tre instruktioner om vilka former du ska klicka på. Total är det 10.</p>`
    );
    setProccedBtn("Börja");
    setProccedBtnEvent(perception, drawForms);

    if (variables.currentTest() === "comp") {
        variables.updateTotal(variables.current());
        variables.updatePoints(variables.current());
        variables.resetCurrent();
        variables.resetInquiring();
    } else if (variables.currentTest() === "perception") {
        const div = document.querySelector(".form-text");
        const divHeight = document.querySelector(".btn-div");
        div.innerHTML = "";
        divHeight.style.height = "0px";
        clearInterval(timer);
    }
    variables.updateTest("perception");
}

export { perception, percFinish };
