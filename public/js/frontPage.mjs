import * as Utility from "./utility.mjs";

function doFrontPage(nextTask) {
    console.log("doFrontPage()");

    const page = document.getElementById("front-page");
    const nextBtn = page.querySelector(".next-btn");

    function nextBtnClick() {
        nextBtn.removeEventListener("click", nextBtnClick);
        Utility.fadeOut(page)
            .then(() => nextTask(null, "Page result"));
    }

    nextBtn.addEventListener("click", nextBtnClick);
    Utility.fadeIn(page);
}

export { doFrontPage };