
/* global Chess Chessboard */

import * as Utility from "./utility.mjs";

const page = document.getElementById("position-page");
const alert = page.querySelector("div.alert");
const practicePosition = "k1q5/pp3rpp/2n4n/8/1P6/4B2P/Q4PP1/R4NK1 w - - 0 1";
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
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd() {
    board.position(game.fen());
}

function showPosition(fen) {
    alert.innerHTML = fen;
    game.load(fen);
    board.position(fen);
}

function doPractice() {
    Utility.fadeIn(page)
        .then(() => showPosition(practicePosition));
}

export { doPractice };