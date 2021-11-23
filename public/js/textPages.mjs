import * as Utility from "./utility.mjs";

const compensationText = "$xx";
const Conditions = {
    RapidStandard: {
        name: "Rapid Standard",
        moveTimeText: "four minutes",
        moveTime: 4 * 5,
        taskTimeText: "45 minutes",
        championship: "Pretend you are playing at The World Rapid Chess Championship."
    }
};

let condition;

function doLoginPage(callback) {
    const page = document.getElementById("login-page");
    const nextBtn = page.querySelector("button.next-btn");
    const idInput = document.getElementById("id-input");
    const invalidLabel = page.querySelector(".invalid-label");

    async function nextBtnClick() {
        const id = idInput.value.trim();
        if (!id) {
            invalidLabel.classList.remove("invisible");
            idInput.focus();
            return;
        }
        const resp = await fetch(`/validate?id=${id}`);
        const json = await resp.json();
        console.log(json);
        if (json.ok === "VALID") {
            condition = Conditions.RapidStandard;
            console.log(condition);
            nextBtn.removeEventListener("click", nextBtnClick);
            Utility.fadeOut(page)
                .then(callback);
        }
        else {
            invalidLabel.classList.remove("invisible");
            idInput.focus();
        }
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page)
        .then(() => idInput.focus());
    console.log("login page");
}

function doEthicsPage(callback) {
    const page = document.getElementById("ethics-page");
    const nextBtn = page.querySelector("button.next-btn");
    const moveTimeSpan = page.querySelector("span.move-time-span");
    const taskTimeSpan = page.querySelector("span.task-time-span");
    const compensationSpan = page.querySelector("span.compensation-span");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(callback);
    }

    moveTimeSpan.innerHTML = condition.moveTimeText;
    taskTimeSpan.innerHTML = condition.taskTimeText;
    compensationSpan.innerHTML = compensationText;
    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

function doBlock1Page(callback) {
    console.log("doBlock1Page");

    const page = document.getElementById("block-1-page");
    const nextBtn = page.querySelector("button.next-btn");
    const moveTimeSpans = page.querySelectorAll("span.move-time-span");
    const championshipP = page.querySelector("p.championship-p");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(callback);
    }

    for (const span of moveTimeSpans) {
        span.innerHTML = condition.moveTimeText;
    }
    championshipP.innerHTML = condition.championship;
    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

function doPrePracticePage(callback) {
    const page = document.getElementById("pre-practice-page");
    const nextBtn = page.querySelector("button.next-btn");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(callback);
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

export { Conditions, condition, doLoginPage, doEthicsPage, doPrePracticePage, doBlock1Page };