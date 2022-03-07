import * as Utility from "./utility.mjs";
import { doPractice, doBlock, PositionNames } from "./positionPageV3.mjs";
import { doLoginPage, doEthicsPage, doPrePracticePage, doBlockPage, doTextInputPage, doGoodbyePage, condition } from "./textPages.mjs";

const tasks = [doLoginPage, doPractice, 
    doBlock1Page, doBlock1, doTextInputPage1, 
    doBlock2Page, doBlock2, doTextInputPage23, 
    doBlock3Page, doBlock3, doTextInputPage23, 
    doGoodbyePage];

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
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal3, PositionNames.Normal4];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random3, PositionNames.Random4];
            break;
    }
    doBlock(callback, positions);
}

function doBlock2(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal6, PositionNames.Normal8];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random6, PositionNames.Random8];
            break;
    }
    doBlock(callback, positions);
}

function doBlock3(callback) {
    let positions;
    switch (condition.name.toUpperCase()) {
        case "BLITZ STANDARD":
        case "RAPID STANDARD":
            positions = [PositionNames.Normal10, PositionNames.Normal12];
            break;
        case "BLITZ RANDOM":
        case "RAPID RANDOM":
            positions = [PositionNames.Random10, PositionNames.Random12];
            break;
    }
    doBlock(callback, positions);
}


function doTextInputPage1(callback) {
    const text = "Certain ideas/steps are involved in planning the best chess move. Please list as many ideas/steps as you can think of that are involved.";
    doTextInputPage(callback, text);
}

function doTextInputPage23(callback) {
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
