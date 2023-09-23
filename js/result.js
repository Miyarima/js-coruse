/**
* @module result
*/

import { setTitle, setText } from "./functionality.js";
import { variables } from "./varibles.js";

/**
 * My made up way of calculatiin IQ
 * @returns {int} total multiplied by 3 minus 6
 */
function IQ () {
    const num = variables.total();
    return (num * 3) - 6;
}

/**
 * This function displays the result of all the tests.
 */
function end () {
    variables.updateTotal(variables.current());
    variables.updatePoints(variables.current());
    const points = variables.points();
    setTitle(`Du har en IQ på ${IQ()}!`);
    setText(`
        <p>
        Deltest 1: ${points[0]}/ 15<br>
        Deltest 2: ${points[1]}/ 3<br>
        Deltest 3: ${points[2]}/ 9<br>
        Deltest 4: ${points[3]}/ 10<br>
        Deltest 5: ${points[4]}/ 5<br>
        Total fick du ${variables.total()}/42
        </p>
    `);
    const procced = document.getElementById("proceed");
    procced.classList.add("hidden");
}

export { end };
