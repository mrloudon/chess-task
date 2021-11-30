/* eslint-env node */

const fs = require("fs");
const readline = require("readline");

const OUTPUT_FILE = "public/ChSgHo1TwE.csv";
const PARTICIPANTS_FILE = "participants.txt";
const CONDITION_NAMES = {
    "1": "RapidStandard",
    "2": "RapidRandom",
    "3": "BlitzStandard",
    "4": "BlitzRandom"
};
const CSV_HEADER = `"Date","Time","IP","ID","Condition","Source","Target","RT","Source","Target","RT","Source","Target","RT","Text","Source","Target","RT","Source","Target","RT","Source","Target","RT","Text"\n`;
let participants;

function getParticipantFromId(id) {
    return participants.find(participant => participant.id === id);
}

function writeCSV(csv) {
    console.log(csv);
    fs.stat(OUTPUT_FILE, function (err, stat) {
        if (err === null) {
            fs.appendFile(OUTPUT_FILE, csv, () => {});
        }
        else {
            fs.writeFileSync(OUTPUT_FILE, CSV_HEADER);
            fs.appendFile(OUTPUT_FILE, csv, () => {});
        }
    });
}

async function readParticipants() {
    const participants = [];
    const stream = fs.createReadStream(PARTICIPANTS_FILE);
    const rl = readline.createInterface({
        input: stream
    });
    let items;

    for await (const line of rl) {
        items = line.split(",");
        participants.push({
            id: items[0].trim(),
            conditionCode: parseInt(items[1], 10),
            conditionName: CONDITION_NAMES[items[1].trim()]
        });
    }
    return participants;
}

async function attachApp(app) {

    participants = await readParticipants();

    app.get("/test", (req, resp) => {
        console.log("test");
        resp
            .status(200)
            .contentType("text/plain")
            .end(ids.toString());
    });

    app.get("/validate", (req, resp) => {
        const id = req.query.id || "";
        const participant = getParticipantFromId(id);
        let result;

        if (participant) {
            result = {
                ok: "VALID",
                participant
            }
        }
        else {
            result = {
                ok: "INVALID",
                participant: {}
            }
        }
        resp
            .status(200)
            .json(result);
    });

    app.post("/submit", (req, resp) => {
        const dt = new Date();
        const ip = req.headers["x-forwarded-for"] || req.ip;

        writeCSV(`${dt.toLocaleString()},${ip},${req.body.csv}\n`);
        resp
            .status(200)
            .contentType("text/plain")
            .end("OK");
    });

}

module.exports = { attachApp };