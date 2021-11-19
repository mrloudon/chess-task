import * as Utility from "./utility.mjs";
import { doFrontPage } from "./frontPage.mjs";
import { doPractice } from "./positionPage.mjs";
const tasks = [doFrontPage, doEthicsPage, doPrePracticePage, doPractice];

function doEthicsPage(){
    const page = document.getElementById("ethics-page");
    const nextBtn = page.querySelector("button.next-btn");

    function nextBtnClick(){
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(nextTask);
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

function doPrePracticePage(){
    const page = document.getElementById("pre-practice-page");
    const nextBtn = page.querySelector("button.next-btn");

    function nextBtnClick(){
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(nextTask);
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
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
