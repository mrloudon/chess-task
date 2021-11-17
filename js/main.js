import * as Utility from "./utility.mjs";
import { doFrontPage } from "./frontPage.mjs";
import { doPractice } from "./positionPage.mjs";
const tasks = [doFrontPage, doPractice];



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
