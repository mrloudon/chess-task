import * as Utility from "./utility.mjs";
// import { doFrontPage } from "./frontPage.mjs";
import { doPractice } from "./positionPage.mjs";
const tasks = [doLoginPage, doEthicsPage, doPrePracticePage, doPractice];

function doLoginPage() {
    const page = document.getElementById("login-page");
    const nextBtn = page.querySelector("button.next-btn");
    const idInput = document.getElementById("id-input");
    const invalidLabel = page.querySelector(".invalid-label");

    async function nextBtnClick() {
        const id = idInput.value.trim();
        if (!id) {
            return;
        }
        const resp = await fetch(`/validate?id=${id}`);
        const json = await resp.json();
        console.log(json);
        if (json.ok === "VALID") {
            nextBtn.removeEventListener("click", nextBtnClick);
            Utility.fadeOut(page)
                .then(nextTask);
        }
        else{
            invalidLabel.classList.remove("invisible");
            idInput.focus();
        }
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page)
        .then(() => idInput.focus());
    console.log("login page");
}

function doEthicsPage() {
    const page = document.getElementById("ethics-page");
    const nextBtn = page.querySelector("button.next-btn");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(nextTask);
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

function doPrePracticePage() {
    const page = document.getElementById("pre-practice-page");
    const nextBtn = page.querySelector("button.next-btn");

    function nextBtnClick() {
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
