
/* global Chess Chessboard */

import * as Utility from "./utility.mjs";
import { condition, csv, addCSV } from "./textPages.mjs";

const page = document.getElementById("position-page");
const nextBtn = page.querySelector(".next-btn");
const resetBtn = page.querySelector(".reset-btn");
const alert = page.querySelector("div.alert");
const positionTitle = page.querySelector("h2.position-title");
const moveTitle = page.querySelector("h5.move-title");
const practicePosition = "k1q5/pp3rpp/2n4n/8/1P6/4B2P/Q4PP1/R4NK1 w - - 0 1";
const Positions = [{
    fen: "r1b2rk1/pp1n1ppp/2p1pn2/q2p2B1/1bPP4/2N1P3/PPQN1PPP/R3KB1R w - - 0 1",
    title: "Position 1",
    toMove: "w"
},
{
    fen: "3q1rk1/pb1r1ppp/1p6/3p4/1P6/PB2P3/Q2R1PPP/3R2K1 w - - 0 1",
    title: "Position 2",
    toMove: "w"
},
{
    fen: "2r2rk1/pp2bp1p/1qb1pnp1/3nN1B1/3P4/P1NQ4/BP3PPP/2R2RK1 w - - 0 1",
    title: "Position 3",
    toMove: "w"
},
{
    fen: "r4k2/3r1ppp/p4n2/3pR3/1P6/3B1P2/P5PP/R5K1 w - - 0 1",
    title: "Position 4",
    toMove: "w"
},
{
    fen: "rnbqkb1r/ppp2ppp/8/3pP3/4n3/2NP4/PPP3PP/R1BQKBNR b - - 0 1",
    title: "Position 5",
    toMove: "b"
},
{
    fen: "3q1r2/r7/2Bp2pk/p1pPp3/P2bPpP1/1P1Q1R2/7P/1R5K b - - 0 1",
    title: "Position 6",
    toMove: "b"
},
{
    fen: "r2q2rk/ppp4p/3p4/2b2Q2/3pPPR1/2P2n2/PP3P1P/RNB4K b - - 0 1",
    title: "Position 7",
    toMove: "b"
},
{
    fen: "r5k1/2b3pp/p1p1rp2/3pn3/3B4/1P2PNP1/P1R2P1P/5RK1 w - - 0 1",
    title: "Position 8",
    toMove: "w"
},
{
    fen: "rnb1kb1r/ppp1pppp/5n2/8/3q4/2N1BQ2/PPP3PP/R3KBNR b - - 0 1",
    title: "Position 9",
    toMove: "b"
},
{
    fen: "r1b2rk1/1pp3pp/2qppn2/pN6/PnPP4/1P3NPB/4QP1P/2KR3R b - - 0 1",
    title: "Position 10",
    toMove: "b"
},
{
    fen: "2q2nk1/pnbb1pp1/3p4/2p4p/2P4P/1P6/PBK5/6R1 w - - 0 1",
    title: "Position 11",
    toMove: "w"
},
{
    fen: "r5k1/3npp2/3p2pp/2pP4/4P3/5NP1/PR3PKP/8 b - - 0 1",
    title: "Position 12",
    toMove: "b"
}];

const config = {
    draggable: true,
    dropOffBoard: "snapback",
    showNotation: false,
    onDragStart,
    onDrop,
    onSnapEnd,
    onMoveEnd
};
const game = new Chess();
const board = Chessboard("chess-board", config);
const interTrialInterval = 2000;

let position = {
    fen: null,
    title: null,
    toMove: null
};

let nextTask;
let blockCompleted = false;
let positionIndices = [];
let timeHeader;
let countDown;
let countDownIntervalTimer;
let doingPractice = false;
let startTime = 0;

function onMoveEnd() {
    console.log("onMoveEnd()");
    if (doingPractice) {
        return;
    }
    startTime = Date.now();
    countDown = condition.moveTime;
    timeHeader.style.color = "black";
    timeHeader.innerHTML = getCountDownString();
    countDownIntervalTimer = window.setInterval(() => {
        countDown--;
        timeHeader.innerHTML = getCountDownString();
        if (countDown === 10) {
            timeHeader.style.color = "red";
        }
        if (countDown === 0) {
            window.clearInterval(countDownIntervalTimer);
            countDownIntervalTimer = null;
            config.draggable = false;
            moveTitle.innerHTML = "Timeout<br>&nbsp;";
            addCSV(`,"null","null",0`);
            console.log(csv);
            setTimeout(nextTrial, interTrialInterval);
        }
    }, 1000);
}

function onDragStart(source, piece) {
    // do not pick up pieces if the game is over
    if (game.game_over()) {
        return false;
    }

    // only pick up pieces for the side to move
    if ((game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (game.turn() === "b" && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop(source, target) {
    // alert.innerHTML = `Source: ${source} Target: ${target}`;
    // see if the move is legal
    const move = game.move({
        from: source,
        to: target,
        promotion: "q" // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
        return "snapback";
    }
    else {
        console.log(source, target);
        config.draggable = false;
        if (countDownIntervalTimer) {
            window.clearInterval(countDownIntervalTimer);
            countDownIntervalTimer = null;
        }
        if (doingPractice) {
            nextBtn.disabled = false;
            moveTitle.innerHTML = `Move completed<br>click <span class="text-muted">Reset</span> to repeat practice or <span class="text-muted">Next</span> to continue`;
        }
        else {
            moveTitle.innerHTML = "Move completed<br>&nbsp;";
            addCSV(`,"${source}","${target}",${Date.now() - startTime}`);
            console.log(csv);
            setTimeout(nextTrial, interTrialInterval);
        }
    }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen());
}

function showPosition() {
    positionTitle.innerHTML = position.title;
    moveTitle.innerHTML = toMove();
    if (!position) {
        return;
    }
    game.load(position.fen);
    board.position(position.fen);
    config.draggable = true;
    console.log("draggable true");
}

function toMove() {
    return position.toMove === "w" ? "White to play<br>&nbsp;" : "Black to play<br>&nbsp;";
}

function nextTrial() {
    if (countDownIntervalTimer) {
        window.clearInterval(countDownIntervalTimer);
        countDownIntervalTimer = null;
    }
    if (blockCompleted) {
        Utility.fadeOut(page)
            .then(nextTask);
    }
    else {
        position = Positions[positionIndices.shift()];
        if (positionIndices.length === 0) {
            blockCompleted = true;
        }
        showPosition();
    }
}

function nextBtnClick() {
    removeListeners();
    Utility.fadeOut(page)
        .then(nextTask);
}

function resetBtnClick() {
    console.log("Reset");
    nextBtn.disabled = true;
    showPosition();
    moveTitle.innerHTML = toMove();
}

function removeListeners() {
    nextBtn.removeEventListener("click", nextBtnClick);
    resetBtn.removeEventListener("click", resetBtnClick);
}

function attachListeners() {
    nextBtn.addEventListener("click", nextBtnClick);
    resetBtn.addEventListener("click", resetBtnClick);
}

function getCountDownString() {
    let mins = (Math.floor(countDown / 60)).toString();
    let secs = (countDown % 60).toString();
    if (secs.length < 2) {
        secs = `0${secs}`;
    }
    return `${mins}:${secs}`;
}

function doPractice(callback) {
    resetBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";
    nextBtn.disabled = true;
    nextTask = callback;
    doingPractice = true;
    board.clear(false);
    position = {
        title: "Practice Position",
        fen: practicePosition,
        toMove: "w"
    }
    attachListeners();
    alert.innerHTML = `Use this practice position to familiarise yourself with making a move.<br>
        Click <strong>Next</strong> to move on to the main task. Click <strong>Reset</strong> to reset the practice position.`;
    Utility.fadeIn(page)
        .then(showPosition);
}

function doBlock(callback, indices) {
    resetBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";
    nextBtn.disabled = true;
    nextTask = callback;
    blockCompleted = false;
    doingPractice = false;
    positionIndices = indices;
    //position = Positions[positionIndices.shift()];
    attachListeners();
    countDown = condition.moveTime;
    alert.innerHTML = `<h1 class="display-5 font-monospace">${getCountDownString()}</h1>`;
    timeHeader = page.querySelector("h1.display-5");
    console.log(timeHeader);
    Utility.fadeIn(page)
        .then(nextTrial);
}

export { doPractice, doBlock };