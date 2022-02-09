import * as Utility from "./utility.mjs";
import { doPractice, doBlock, PositionNames } from "./positionPageV3.mjs";
import { doLoginPage, doEthicsPage, doPrePracticePage, doBlockPage, doTextInputPage, doGoodbyePage } from "./textPages.mjs";

const tasks = [doLoginPage,  doPractice, doBlock1Page, doBlock1, doTextInputPage1, doBlock2Page, doBlock2, doTextInputPage2, doGoodbyePage];

//const tasks = [doLoginPage, doEthicsPage, doPrePracticePage, doPractice,
//    doBlock1Page, doBlock1, doTextInputPage1, doBlock2Page, doBlock2, doTextInputPage2, doGoodbyePage];

function doBlock1Page(callback) {
    doBlockPage(callback, "Block 1");
}

function doBlock2Page(callback) {
    doBlockPage(callback, "Block 2");
}

function doBlock3Page(callback) {
    doBlockPage(callback, "Block 3");
}

function doBlock1(callback) {
    doBlock(callback, [PositionNames.Normal3, PositionNames.Random3, PositionNames.Normal4, PositionNames.Random4]);
}

function doBlock2(callback) {
    doBlock(callback, [PositionNames.Normal6, PositionNames.Random6, PositionNames.Normal8, PositionNames.Random8]);
}

function doBlock3(callback) {
    doBlock(callback, [PositionNames.Normal11, PositionNames.Random11, PositionNames.Normal2, PositionNames.Random12]);
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

console.log("Position page V3");
Utility.ready(run);
