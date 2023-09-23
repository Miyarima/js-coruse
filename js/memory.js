/**
* @module memory
*/

import { comprehension } from "./comprehension.js";
import { setTitle, setText, setProccedBtn, setProccedBtnEvent, cleanText, cancelTest } from "./functionality.js";
import { variables } from "./varibles.js";

/**
 * This function displays the score of the test
 * and changes the event on the procced button.
 */
function memoryFinish () {
    unRevealPics();
    setTitle("Minne");
    setText(`<p>Du fick ${variables.current()} poäng av 9 möjliga</p>`);
    setProccedBtnEvent(memoryFinish, comprehension);
}

/**
 * This function will change the background of the
 * text that's connected to the img.
 * @param {event.target} pic the clicked img
 * @param {string} textEl id of the text
 * @param {string} img id of the img
 */
function changebackground (pic, textEl, img) {
    const text = document.getElementById(textEl);
    if (pic.id === img) {
        text.classList.add("green");
        variables.updateCurrent();
        if (variables.inquiring() === 8) {
            cancelTest(".img", clickedImg, memoryFinish);
        }
    } else {
        text.classList.add("red");
        cancelTest(".img", clickedImg, memoryFinish);
    }
}

/**
 * This function calls the changebackground function
 * depending on which itterations it is.
 * @param {event} el the clicked img
 */
function clickedImg (el) {
    const pic = el.target;
    if (variables.inquiring() === 0) {
        const btn = document.getElementById("proceed");
        btn.removeEventListener("click", pictures);
        changebackground(pic, "text1", "img9");
    } else if (variables.inquiring() === 1) {
        changebackground(pic, "text2", "img8");
    } else if (variables.inquiring() === 2) {
        changebackground(pic, "text3", "img5");
    } else if (variables.inquiring() === 3) {
        changebackground(pic, "text4", "img6");
    } else if (variables.inquiring() === 4) {
        changebackground(pic, "text5", "img4");
    } else if (variables.inquiring() === 5) {
        changebackground(pic, "text6", "img7");
    } else if (variables.inquiring() === 6) {
        changebackground(pic, "text7", "img2");
    } else if (variables.inquiring() === 7) {
        changebackground(pic, "text8", "img1");
    } else if (variables.inquiring() === 8) {
        changebackground(pic, "text9", "img3");
    }
    variables.updateInquiring();
}

/**
 * This function counts down from 5, and each time updates
 * the description text.
 */
function countDown () {
    let count = 4;
    const timer = setInterval(() => {
        setText(`<p>Klickade på det matchande paret av text och bild (${count} s)</p>`);
        count--;
        if (count <= -1) {
            clearInterval(timer);
            setText("<p>Klickade på det matchande paret av text och bild</p>");
        }
    }, 1000);
}

/**
 * This function changes the img to a red one,
 * and adds a eventlistner.
 * @param {element} pic a img
 * @listens document#click - Namespace: In the memory module, Name: clickedImg.
 */
function hidePic (pic) {
    setTimeout(function () {
        pic.src = "img/red.png";
        pic.addEventListener("click", clickedImg);
    }, 5000);
}

/**
 * This function adds the hidden class to all elements with
 * the either the img or picture-text class
 */
function revealPics () {
    const pics = document.querySelectorAll(".img");
    const text = document.querySelector(".picture-text");
    text.classList.remove("hidden");
    countDown();
    for (const pic of pics) {
        pic.classList.remove("hidden");
        pic.style.margin = "1em";
        hidePic(pic);
    }
}

/**
 * This fucntion changes all red images into thier
 * original image
 */
function restPics () {
    const pics = document.querySelectorAll(".img");
    for (const pic of pics) {
        if (pic.id === "img1") {
            pic.src = "img/dogs.png";
        } else if (pic.id === "img2") {
            pic.src = "img/hiroshimacastle.jpg";
        } else if (pic.id === "img3") {
            pic.src = "img/chef.jpg";
        } else if (pic.id === "img4") {
            pic.src = "img/bike.jpg";
        } else if (pic.id === "img5") {
            pic.src = "img/cat.jpg";
        } else if (pic.id === "img6") {
            pic.src = "img/fuji.jpg";
        } else if (pic.id === "img7") {
            pic.src = "img/lightball.jpg";
        } else if (pic.id === "img8") {
            pic.src = "img/pepsi.jpg";
        } else if (pic.id === "img9") {
            pic.src = "img/santa.jpg";
        }
    }
}

/**
 * This function removes the hidden class from all elements
 * with either the img or picture-text class
 */
function unRevealPics () {
    const pics = document.querySelectorAll(".img");
    const text = document.querySelector(".picture-text");
    text.classList.add("hidden");
    for (const pic of pics) {
        pic.classList.add("hidden");
        pic.style.margin = "";
    }
}

/**
 * This function sets the title, description and calls the revealPics function
 */
function pictures () {
    setTitle("Bilder");
    setText("<p>Klickade på det matchande paret av text och bild (5 s)</p>");
    setProccedBtn("Fortsätt");
    revealPics();
}

/**
 * This functon set the title and descripton of the
 * memory test. And if it's the first time loading,
 * it will save the prior test score.
 */
function memory () {
    setTitle("Minne");
    setText("<p>Du kommer att få 5 sekunder att bekanta dig med 9 bilder. När tiden är ute kommer bilderna att gömmas och du ska klicka på respektive bilder i den numrerade ordningen.</p>");
    setProccedBtn("Börja");
    setProccedBtnEvent(memory, pictures);

    if (variables.currentTest() === "fizzbuzz") {
        variables.updateTotal(variables.current() * 3);
        variables.updatePoints(variables.current() * 3);
        variables.resetCurrent();
        variables.resetInquiring();
    } else if (variables.currentTest() === "memory") {
        unRevealPics();
        cleanText();
        restPics();
    }
    variables.updateTest("memory");
}

export { memory, memoryFinish };
