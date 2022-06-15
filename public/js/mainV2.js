import * as Utility from "./utility.mjs";
import { doPractice, doBlock, PositionNames } from "./positionPageV3.mjs";
import { doLoginPage, doEthicsPage, doPrePracticePage, doBlockPage, doTextInputPage, doGoodbyePage, condition } from "./textPages.mjs";

const tasks = [doLoginPage, doEthicsPage, doPrePracticePage, doPractice,
    doBlock1Page, doBlock1, doTextInputPage1,
    doBlock2Page, doBlock2, doTextInputPage2,
    doBlock3Page, doBlock3, doTextInputPage3,
    doBlock4Page, doBlock4, doTextInputPage4,
    doGoodbyePage];

/* const tasks = [doLoginPage,
    doBlock1Page, doBlock1, doTextInputPage1, doBlock2Page, doBlock2, doTextInputPage2, doGoodbyePage];
 */
function doBlock1Page(callback) {
    doBlockPage(callback, {
        pageId: "block-1-text-page",
        titleText: "Position 1",
        championship: false
    });
}

function doBlock2Page(callback) {
    doBlockPage(callback, {
        pageId: "block-2-text-page",
        titleText: "Position 2",
        championship: "Try and analyse the chess position as you are making your move because once you have made your move you will be asked to fill in an identical questionnaire to the one you previously answered."
    });
}

function doBlock3Page(callback) {
    doBlockPage(callback, {
        pageId: "block-3-text-page",
        titleText: "Position 3",
        championship: false
    });
}

function doBlock4Page(callback) {
    doBlockPage(callback, {
        pageId: "block-4-text-page",
        titleText: "Position 4",
        championship: "Try and pay close attention to the action involved in making your move because you will be asked to fill out another questionnaire identical to the one you just filled out regarding your memories of this move."
    });
}

function doBlock1(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal3];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random3];
            break;
    }
    doBlock(callback, positions);
}

function doBlock2(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal4];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random4];
            break;
    }
    doBlock(callback, positions);
}

function doBlock3(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal6];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random6];
            break;
    }
    doBlock(callback, positions);
}

function doBlock4(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal10];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random10];
            break;
    }
    doBlock(callback, positions);
}

function doTextInputPage1(callback) {
    const text = `<p>Write down your analysis of the position you just saw.</p>
        <p>
            Examples could include - the opponent’s threats, both sides tactics, what you are trying to do, any of your plans and/or goals, 
            moves you rejected, any other candidate moves you had for best move, and general principles for playing this position.
        </p>`;
    doTextInputPage(callback, text);
}

function doTextInputPage2(callback) {
    const text = `<p>Write down your analysis of the position you just saw.</p>
        <p>
            Examples could include - the opponent’s threats, both sides tactics, what you are trying to do, any of your plans and/or goals, 
            moves you rejected, any other candidate moves you had for best move, and general principles for playing this position.
        </p>`;
    doTextInputPage(callback, text);
}

function doTextInputPage3(callback) {
    const text = `<p>Pretend that your friend just walked in the room. Describe the move you just made in enough detail so that your friend could duplicate the move by doing it just like you did.</p>
    <p>Additional information - the friend has a basic understanding of chess, and therefore your instructions or recipe need to be written 
    in plain language to allow the move to be duplicated in all its details by the friend who has not seen you making the move.</p>`;
    doTextInputPage(callback, text);
}

function doTextInputPage4(callback) {
    const text = `<p>Pretend that your friend just walked in the room. Describe the move you just made in enough detail so that your friend could duplicate the move by doing it just like you did.</p>
    <p>Additional information - the friend has a basic understanding of chess, and therefore your instructions or recipe need to be written 
    in plain language to allow the move to be duplicated in all its details by the friend who has not seen you making the move.</p>`;
    doTextInputPage(callback, text);
}

function nextTask(err, result) {
    console.log(`nextTask(${err}, ${result})`);
    if (err) {
        throw err;
    }
    const task = tasks.shift();
    if (task) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        task(nextTask, result);
    }
}

function run() {
    console.log("Running.");
    nextTask();
}

console.log("Main V2, Position page V3");
Utility.ready(run);
