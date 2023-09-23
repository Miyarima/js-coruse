/**
* @module functionality
*/

/**
 * This function updates the title of the page
 * @param {string} str the title to set on the page
 */
function setTitle (str) {
    const title = document.getElementById("title");
    title.innerHTML = str;
}

/**
 * The description to set on the page
 * @param {string} str the description
 */
function setText (str) {
    const text = document.getElementById("text");
    text.innerHTML = str;
}

/**
 * This function updates the text for all buttons
 * @param {string} b1 the tex the for the first button
 * @param {string} b2 the tex the for the second button
 * @param {string} b3 the tex the for the third button
 * @param {string} b4 the tex the for the fourth button
 */
function setBtnText (b1, b2, b3, b4) {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    btn1.innerHTML = b1;
    btn2.innerHTML = b2;
    btn3.innerHTML = b3;
    btn4.innerHTML = b4;
}

/**
 * This function upates the text inside the procced button
 * @param {string} str procced button text
 */
function setProccedBtn (str) {
    const proceedBtn = document.getElementById("proceed");
    proceedBtn.innerHTML = str;
}

/**
 * This function changes the eventlistner of the procced button
 * @param {function} remove the function to remove
 * @param {function} set the function to add
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function setProccedBtnEvent (remove, set) {
    const proceedBtn = document.getElementById("proceed");
    proceedBtn.removeEventListener("click", remove);
    proceedBtn.addEventListener("click", set);
}

/**
 * This function will change the class of the given element
 * @param {element} btn the button to change
 * @param {string} remove the class to remove
 * @param {string} set the class to add
 */
function removeAndSet (btn, remove, set) {
    btn.removeAttribute("class", remove);
    btn.setAttribute("class", set);
}

/**
 * This function shows the buttons and adds the
 * given eventlistner function.
 * @param {string} remove the class to remove
 * @param {string} set the class to add
 * @param {function} func eventlistner function
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function showBtns (remove, set, func) {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    removeAndSet(btn1, remove, set);
    removeAndSet(btn2, remove, set);
    removeAndSet(btn3, remove, set);
    removeAndSet(btn4, remove, set);

    btn1.addEventListener("click", func);
    btn2.addEventListener("click", func);
    btn3.addEventListener("click", func);
    btn4.addEventListener("click", func);
}

/**
 * This function hides the buttons and removes the
 * given eventlistner function.
 * @param {string} remove the class to remove
 * @param {string} set the class to add
 * @param {function} func eventlistner function
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function hideBtns (remove, set, func) {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    removeAndSet(btn1, remove, set);
    removeAndSet(btn2, remove, set);
    removeAndSet(btn3, remove, set);
    removeAndSet(btn4, remove, set);

    btn1.removeEventListener("click", func);
    btn2.removeEventListener("click", func);
    btn3.removeEventListener("click", func);
    btn4.removeEventListener("click", func);

    setBtnText("", "", "");
}

/**
 * This function removes the different clicked classes
 */
function cleanBtn () {
    let clicked = document.querySelector(".clicked-right");
    if (clicked === null) {
        clicked = document.querySelector(".clicked-wrong");
    }
    clicked.setAttribute("class", "btn");
}

/**
 * This function removes all red and green backgrounds from text
 */
function cleanText () {
    const red = document.querySelectorAll(".red");
    const green = document.querySelectorAll(".green");
    for (const r of red) {
        r.classList.remove("red");
    }
    for (const g of green) {
        g.classList.remove("green");
    }
}

/**
 * This function will remove all eventlisner with the given
 * class, and add a new one to the procced button.
 * @param {string} name Class name
 * @param {function} remove the function to remove
 * @param {function} add the function to add
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function cancelTest (name, remove, add) {
    const element = document.querySelectorAll(name);
    for (const el of element) {
        el.removeEventListener("click", remove);
    }
    const btn = document.getElementById("proceed");
    btn.addEventListener("click", add);
}

/**
 * This function will create a div with the given classes,
 * and add it to the given space.
 * @param {string} where the place the to add the forms to
 * @param {string} color which color the form will have
 * @param {string} aprnce if it's a box or rectangel
 * @param {function} func the evenlistner function
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function drawBox (where, color, aprnce, func) {
    const space = document.querySelector(where);
    const div = document.createElement("div");

    div.classList.add(color);
    div.classList.add(aprnce);
    div.classList.add("form");

    div.addEventListener("click", func);

    space.appendChild(div);
}

/**
 * This function will create a div with the given classes,
 * and add it to the given space.
 * @param {string} where the place the to add the forms to
 * @param {string} aprnce which triangle it's going to be
 * @param {function} func the evenlistner function
 * @listens document#click - Namespace: Where the set function exists, Name: whatever the givin functions name is.
 */
function drawTri (where, aprnce, func) {
    const space = document.querySelector(where);
    const div = document.createElement("div");

    div.classList.add(aprnce);
    div.classList.add("form");

    div.addEventListener("click", func);

    space.appendChild(div);
}

export {
    setTitle,
    setText,
    setBtnText,
    setProccedBtn,
    setProccedBtnEvent,
    removeAndSet,
    showBtns,
    hideBtns,
    cleanBtn,
    cleanText,
    cancelTest,
    drawBox,
    drawTri
};
