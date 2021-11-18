
/* global Chess Chessboard */

import * as Utility from "./utility.mjs";

const page = document.getElementById("position-page");
const nextBtn = page.querySelector(".next-btn");
const resetBtn = page.querySelector(".reset-btn");
const alert = page.querySelector("div.alert");
const positionTitle = page.querySelector("h2.position-title");
const moveTitle = page.querySelector("h4.move-title");
const practicePosition = "k1q5/pp3rpp/2n4n/8/1P6/4B2P/Q4PP1/R4NK1 w - - 0 1";
const positions = [{
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
    onSnapEnd
};
const game = new Chess();
const board = Chessboard("chess-board", config);
let position = {
    fen: null,
    title: null,
    toMove: null
};
let positionIndex = 0;

function onDragStart(source, piece, position, orientation) {
    alert.innerHTML = `Source: ${source} Piece: ${piece} Position: ${position} Orientation: ${orientation}`;

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
    alert.innerHTML = `Source: ${source} Target: ${target}`;
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
        config.draggable = false;
        nextBtn.disabled = false;
        moveTitle.innerHTML = "&nbsp;";
    }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen());
}

function showPosition() {
    alert.innerHTML = position.fen;
    positionTitle.innerHTML = position.title;
    if (!position) {
        return;
    }
    game.load(position.fen);
    board.position(position.fen);
    config.draggable = true;
}

function toMove(){
    return position.toMove === "w" ? "White to play" : "Black to play";
}

function nextBtnClick() {
    console.log("Next");
    if (positionIndex < positions.length) {
        position = positions[positionIndex];
        positionIndex++;
        nextBtn.disabled = true;
        showPosition();
        moveTitle.innerHTML = toMove();
    }
    else {
        removeListeners();
        Utility.fadeOut(page);
    }
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

function doPractice() {
    board.clear(false);
    position = {
        title: "Practice Position",
        fen: practicePosition,
        toMove: "w"
    }
    attachListeners();
    moveTitle.innerHTML = toMove();
    Utility.fadeIn(page)
        .then(showPosition);
}

export { doPractice };