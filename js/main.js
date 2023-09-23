import { setTitle, setText, setProccedBtnEvent } from "./functionality.js";
import { variables } from "./varibles.js";
import { questions } from "./onextwo.js";
import { fizzBuzz } from "./fizzbuzz.js";
import { memory, memoryFinish } from "./memory.js";
import { comprehension, finish } from "./comprehension.js";
import { perception, percFinish } from "./perception.js";
import { end } from "./result.js";

(function () {
    'use strict';

    function welcome () {
        setTitle("Välkommen!");
        setText(
            `<p>Intelligence testet är uppdelat i 5 olika delar.</p>
            <p>Tipsfrågor, FizzBuzz, Minne, Visuell förmåga, Uppfattningsförmåga.</p>
            <p>Poägen samlas ihop i slutet, och du får reda på din IQ.</p>`
        );
        const proceedBtn = document.getElementById("proceed");
        proceedBtn.addEventListener("click", questions);
    }

    welcome();

    window.reset = function () {
        variables.resetCurrent();
        console.log(variables.total());

        if (variables.currentTest() === "1x2") {
            variables.resetInquiring();
            setProccedBtnEvent(fizzBuzz, questions);
            questions();
        } else if (variables.currentTest() === "fizzbuzz") {
            variables.resetInquiring();
            setProccedBtnEvent(memory, fizzBuzz);
            fizzBuzz();
        } else if (variables.currentTest() === "memory") {
            variables.resetInquiring();
            setProccedBtnEvent(comprehension, memory);
            setProccedBtnEvent(memoryFinish, memory);
            memory();
        } else if (variables.currentTest() === "comp") {
            variables.resetInquiring();
            setProccedBtnEvent(perception, comprehension);
            setProccedBtnEvent(finish, comprehension);
            comprehension();
        } else if (variables.currentTest() === "perception") {
            variables.resetInquiring();
            setProccedBtnEvent(end, perception);
            setProccedBtnEvent(percFinish, perception);
            perception();
        }
    };
})();
