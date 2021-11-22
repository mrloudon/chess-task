import * as Utility from "./utility.mjs";
// import { doFrontPage } from "./frontPage.mjs";
import { doPractice, doBlock1 } from "./positionPage.mjs";
import { doLoginPage, doEthicsPage, doPrePracticePage, doBlock1Page } from "./textPages.mjs";

const tasks = [doLoginPage, doEthicsPage, doPrePracticePage, doPractice, doBlock1Page, doBlock1];

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
