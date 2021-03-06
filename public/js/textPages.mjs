import * as Utility from "./utility.mjs";

//const compensationText = "$xx";
const Conditions = {
    RapidStandard: {
        name: "Rapid Standard",
        moveTimeText: "four minutes",
        moveTime: 4 * 60,
        taskTimeText: "40 minutes",
        championship: "Pretend you are playing at The World Chess Championship."
    },
    RapidRandom: {
        name: "Rapid Random",
        moveTimeText: "four minutes",
        moveTime: 4 * 60,
        taskTimeText: "40 minutes",
        championship: "Pretend you are playing at The World Chess Championship."
    },
    BlitzStandard: {
        name: "Blitz Standard",
        moveTimeText: "40 seconds",
        moveTime: 40,
        taskTimeText: "20 minutes",
        championship: "Pretend you are playing at The World Chess Championship."
    },
    BlitzRandom: {
        name: "Blitz Random",
        moveTimeText: "40 seconds",
        moveTime: 40,
        taskTimeText: "20 minutes",
        championship: "Pretend you are playing at The World Chess Championship."
    }
};

let condition;
let participant;
let csv = "";

function addCSV(c) {
    csv += c;
}

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
            participant = json.participant;
            condition = Conditions[participant.conditionName];
            csv += `"${participant.id}","${condition.name}"`;
            console.log("csv:", csv);
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
    //const compensationSpan = page.querySelector("span.compensation-span");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(callback);
    }

    moveTimeSpan.innerHTML = condition.moveTimeText;
    taskTimeSpan.innerHTML = condition.taskTimeText;
    //compensationSpan.innerHTML = compensationText;
    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

function doBlockPage(callback, { pageId, titleText, championship }) {
    console.log("doBlockPage");

    const page = document.getElementById(pageId);
    const nextBtn = page.querySelector("button.next-btn");
    const moveTimeSpans = page.querySelectorAll("span.move-time-span");
    const championshipP = page.querySelector("p.championship-p");
    const title = page.querySelector(".title");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(callback);
    }

    for (const span of moveTimeSpans) {
        span.innerHTML = condition.moveTimeText;
    }
    
    if(championshipP){
        championshipP.innerHTML = championship || condition.championship;
    }
    
    title.innerHTML = titleText;
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

function doTextInputPage(callback, text) {
    const page = document.getElementById("text-input-page");
    const alert = page.querySelector("div.alert");
    const textArea = page.querySelector("textarea");
    const nextBtn = page.querySelector("button.next-btn");

    function textAreaKeyPress() {
        nextBtn.disabled = false;
    }

    function textAreaPaste(e) {
        e.preventDefault();
        return false;
    }

    function nextBtnClick() {
        let text = textArea.value.trim();
        if (!text) {
            textArea.focus()
            return;
        }
        text = text.replace(/(\r\n|\n|\r)/gm, " ");
        text = text.replace(/,/gm, ";");
        text = text.replace(/"/gm, "'");
        console.log(text);
        addCSV(`,"${text}"`);
        console.log(csv);
        nextBtn.removeEventListener("click", nextBtnClick);
        textArea.removeEventListener("keypress", textAreaKeyPress);
        textArea.removeEventListener("paste", textAreaPaste);
        textArea.removeEventListener("drop", textAreaPaste);
        Utility.fadeOut(page)
            .then(callback);
    }

    alert.innerHTML = text;
    nextBtn.addEventListener("click", nextBtnClick);
    textArea.addEventListener("keypress", textAreaKeyPress);
    textArea.addEventListener("paste", textAreaPaste);
    textArea.addEventListener("drop", textAreaPaste);
    textArea.value = "";
    nextBtn.disabled = true;
    Utility.fadeIn(page)
        .then(() => textArea.focus());
}

function doGoodbyePage() {
    const page = document.getElementById("goodbye-page");
    Utility.postCSV(csv);
    Utility.fadeIn(page);
}

export { Conditions, condition, participant, csv, addCSV, doLoginPage, doEthicsPage, doPrePracticePage, doBlockPage, doTextInputPage, doGoodbyePage };