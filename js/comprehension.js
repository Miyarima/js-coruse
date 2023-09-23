/**
* @module comprehension
*/

import { setTitle, setText, setProccedBtn, setProccedBtnEvent, cleanText, cancelTest, drawBox, drawTri } from "./functionality.js";
import { perception } from "./perception.js";
import { variables } from "./varibles.js";

let timer;

/**
 * This function adds the hidden class to all elements with
 * either the form-text or form class
 */
function removeForms () {
    const div = document.querySelector(".form-text");
    const forms = document.querySelectorAll(".form");
    div.innerHTML = "";
    div.classList.add("hidden");
    for (const form of forms) {
        form.remove();
    }
}

/**
 * This function displays the score of the test
 * and changes the event on the procced button.
 */
function finish () {
    removeForms();
    setTitle("Visuell förmåga");
    setText(`<p>Du fick ${variables.current()} poäng av 10 möjliga</p>`);
    setProccedBtnEvent(finish, perception);
}

/**
 * This function counts down from 15, and when it's done
 * stops the test and clears the timer
 */
function countDown () {
    let count = 14;
    timer = setInterval(() => {
        setText(`<p>Klicka på den korrekta formen. (${count} s)</p>`);
        count--;
        if (count <= -1) {
            clearInterval(timer);
            cancelTest(".form", clickedForm, finish);
            setText("<p>Klicka på den korrekta formen. (0 s)</p>");
        }
    }, 1000);
}

/**
 * This function checks if the right box was clicked
 * @param {event.target} el the clicked form
 * @param {*} color the color of the form
 * @param {*} form which form it has
 */
function checkIfRightBox (el, color, form) {
    const text = document.getElementById(`form${variables.inquiring() + 1}`);
    if (el.classList.contains(color) && el.classList.contains(form)) {
        text.classList.add("green");
        variables.updateCurrent();
    } else {
        text.classList.add("red");
    }
}

/**
 * This function checks if the right triangle was clicked
 * @param {event.target} el the clicked form
 * @param {*} color the color of the form
 */
function checkIfRightTri (el, color) {
    const text = document.getElementById(`form${variables.inquiring() + 1}`);
    if (el.classList.contains(color)) {
        text.classList.add("green");
        variables.updateCurrent();
    } else {
        text.classList.add("red");
    }
}

/**
 * this function calls the checkifright functions
 * depending on which iteration it is.
 * @param {event} el the clicked form
 */
function clickedForm (el) {
    const form = el.target;
    if (variables.inquiring() === 0) {
        const btn = document.getElementById("proceed");
        btn.removeEventListener("click", drawObjects);
        checkIfRightBox(form, "red", "box");
    } else if (variables.inquiring() === 1) {
        checkIfRightTri(form, "blue-tri");
    } else if (variables.inquiring() === 2) {
        checkIfRightBox(form, "black", "box");
    } else if (variables.inquiring() === 3) {
        checkIfRightBox(form, "blue", "rec");
    } else if (variables.inquiring() === 4) {
        checkIfRightTri(form, "green-tri");
    } else if (variables.inquiring() === 5) {
        checkIfRightBox(form, "green", "box");
    } else if (variables.inquiring() === 6) {
        checkIfRightBox(form, "blue", "box");
    } else if (variables.inquiring() === 7) {
        checkIfRightTri(form, "red-tri");
    } else if (variables.inquiring() === 8) {
        checkIfRightBox(form, "black", "rec");
    } else if (variables.inquiring() === 9) {
        checkIfRightBox(form, "green", "rec");
    }
    variables.updateInquiring();
}

/**
 * This function adds the description text for the comprehension
 * test
 */
function printFormText () {
    const div = document.querySelector(".form-text");
    div.classList.remove("hidden");

    const formText = [
        "1. Röd Kvadrat",
        "2. Blå Triangel",
        "3. Svart Kvadrat",
        "4. Blå Rektangel",
        "5. Grön Triangel",
        "6. Grön Kvadrat",
        "7. Blå Kvadrat",
        "8. Röd Triangel",
        "9. Svart Rektangel",
        "10. Grön Rektangel"
    ];

    for (let i = 0; i < formText.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = formText[i];
        p.setAttribute("id", `form${i + 1}`);
        div.appendChild(p);
    }
}

/**
 * This function adds the hidden class to all elements
 * with the form-text class
 */
function hideText () {
    const div = document.querySelector(".form-text");
    div.classList.add("hidden");
    div.innerHTML = "";
}

/**
 * This function draws the form for the btn-div
 */
function firstDiv () {
    drawBox(".btn-div", "black", "box", clickedForm);
    drawBox(".btn-div", "green", "rec", clickedForm);
    drawTri(".btn-div", "blue-tri", clickedForm);
}

/**
 * This function draws the form for the pictures1 div
 */
function secondDiv () {
    drawTri(".pictures1", "red-tri", clickedForm);
    drawBox(".pictures1", "red", "box", clickedForm);
    drawBox(".pictures1", "black", "rec", clickedForm);
}

/**
 * This function draws the form for the pictures2 div
 */
function thirdDiv () {
    drawBox(".pictures2", "blue", "box", clickedForm);
    drawTri(".pictures2", "green-tri", clickedForm);
    drawBox(".pictures2", "green", "box", clickedForm);
}

/**
 * This function draws the form for the pictures3 div
 */
function fourthDiv () {
    drawBox(".pictures3", "blue", "rec", clickedForm);
}

/**
 * This function removes all elements which has the form class
 */
function hideObjects () {
    const red = document.querySelectorAll(".form");
    for (const r of red) {
        r.remove();
    }
}

/**
 * This function set the title, description and calls
 * all necessary functions for the comprehension test
 */
function drawObjects () {
    const btn = document.getElementById("proceed");
    btn.removeEventListener("click", drawObjects);
    setTitle("Former");
    setText("<p>Klicka på den korrekta formen. (15 s)</p>");
    setProccedBtn("Fortsätt");
    firstDiv();
    secondDiv();
    thirdDiv();
    fourthDiv();
    printFormText();
    countDown();
}

/**
 * This functon set the title and descripton of the
 * comprehension test. And if it's the first time loading,
 * it will save the prior test score.
 */
function comprehension () {
    setTitle("Visuell förmåga");
    setText(
        `<p>10 olika former kommer att visas. Du ska klicka på rätt form enligt den numrerade listan. Du har 15 sekunder på dig. Testet forsätt även om du klickar fel.</p>`
    );
    setProccedBtn("Börja");
    setProccedBtnEvent(comprehension, drawObjects);

    if (variables.currentTest() === "memory") {
        variables.updateTotal(variables.current());
        variables.updatePoints(variables.current());
        variables.resetCurrent();
        variables.resetInquiring();
    } else if (variables.currentTest() === "comp") {
        clearInterval(timer);
        cleanText();
        hideText();
        hideObjects();
    }
    variables.updateTest("comp");
}

export { comprehension, finish };
