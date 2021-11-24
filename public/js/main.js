import * as Utility from "./utility.mjs";
// import { doFrontPage } from "./frontPage.mjs";
import { doPractice, doBlock } from "./positionPage.mjs";
import { doLoginPage, doEthicsPage, doPrePracticePage, doBlockPage, doTextInputPage, doGoodbyePage } from "./textPages.mjs";

//const tasks = [doLoginPage, doEthicsPage, doPrePracticePage, doPractice, doBlock1Page, doBlock1];

const tasks = [doLoginPage, doBlock1Page, doBlock1, doTextInputPage1, doBlock2Page, doBlock2, doTextInputPage2, doGoodbyePage];

function doBlock1Page(callback) {
    doBlockPage(callback, "Block 1");
}

function doBlock2Page(callback) {
    doBlockPage(callback, "Block 2");
}

function doBlock1(callback) {
    doBlock(callback, [0, 1, 2]);
}

function doBlock2(callback) {
    doBlock(callback, [3, 4, 5]);
}

function doTextInputPage1(callback) {
    const text = "Certain ideas/steps are involved in planning the best chess move. Please list as many ideas/steps as you can think of that are involved.";
    doTextInputPage(callback, text);
}

function doTextInputPage2(callback) {
    const text = "Pretend that your friend just walked into the room. Describe the last move you made in enough detail so that your friend could make the same move as you.";
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

Utility.ready(run);
