/**
* @module onextwo
*/

import { setTitle, setText, setBtnText, setProccedBtn, setProccedBtnEvent, showBtns, hideBtns, cleanBtn } from "./functionality.js";
import { variables } from "./varibles.js";
import { fizzBuzz } from "./fizzbuzz.js";

/**
 * This function check if the button with the clicked
 * class is the correct one.
 * @param {int} check a counter
 * @param {event} el the clicked button
 */
function checkIfRight (check, el) {
    const clickedBtn = document.querySelector(".clicked");
    if (clickedBtn.innerHTML === variables.rightAnswers(check)) {
        el.target.classList.add("clicked-right");
        variables.updateCurrent();
    } else {
        el.target.classList.add("clicked-wrong");
    }
}

/**
 * This function adds the clicked class, to a button,
 * if there is no other clicked button.
 * @param {event} el the button that has been clicked.
 */
function clicked (el) {
    const selected = document.querySelectorAll(".clicked");
    if (selected.length < 1) {
        el.target.setAttribute("class", "clicked");
        checkIfRight(variables.inquiring(), el);
    }
    variables.updateInquiring();
}

/**
 * This function adds the hidden class to the fourth button
 */
function hideFourthBtn () {
    const fourth = document.getElementById("btn4");
    fourth.classList.add("hidden");
}

/**
 * This function sets the title, description and button text
 * depending on which iteration it's on.
 */
function oneXTwo () {
    if (variables.inquiring() < 1) {
        showBtns("hidden", "btn", clicked);
        hideFourthBtn();
    }

    setProccedBtn("Nästa");

    if (variables.inquiring() === 0) {
        setTitle("Första Frågan");
        setText("<p>Hur mycket är dubbelt av hälften av 465?</p>");
        setBtnText("232.25", "930", "465", "");
    } else if (variables.inquiring() === 1) {
        cleanBtn();
        setTitle("Andra Frågan");
        setText("<p>En flaska med kork kostar 10 kr och 50 öre. Flaskan kostar 10 kr mer än korken. Vad kostar korken?</p>");
        setBtnText("0", "25 Öre", "50 Öre", "");
    } else if (variables.inquiring() === 2) {
        cleanBtn();
        setTitle("Tredje Frågan");
        setText(
            `<p>Pappans och sonens ålder är tillsammans 66 år. Pappans ålder är densamma som sonens, men med siffrorna omvänt.</p>
            <p>Hur gamla är de?</p>`
        );
        setBtnText("42 och 24", "22 och 44", "50 och 16", "");
    } else if (variables.inquiring() === 3) {
        cleanBtn();
        setTitle("Fjärde Frågan");
        setText("<p>Marcus fyllde 22 år igår. Nästa år fyller han 24 år. När är han född?</p>");
        setBtnText("1 Januari", "29 Juni", "31 december", "");
    } else if (variables.inquiring() === 4) {
        cleanBtn();
        setTitle("Femte Frågan");
        setText("<p>Heter det “en rak kurva” eller heter det “ett rak kurva”?</p>");
        setBtnText("En", "Ett", "Inget av dem", "");
    } else {
        cleanBtn();
        hideBtns("btn", "hidden", clicked);

        setTitle("Tipsfrågor");
        setText(`<p>Du fick ${variables.current() * 3} poäng av 15 möjliga</p>`);
        setProccedBtnEvent(oneXTwo, fizzBuzz);
    }
}

/**
 * This function sets the title, description and button text.
 */
function questions () {
    setTitle("Tipsfrågor");
    setText(
        `<p>Du kommer att få 5 frågor, där varje fråga har 3 olika alternativ.</p>
        <p>Klicka på alternativet du tror är rätt.</p>`
    );
    setProccedBtn("Fortsätt");
    hideBtns("btn", "hidden", clicked);
    setProccedBtnEvent(questions, oneXTwo);
}

export { questions };
