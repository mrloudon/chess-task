/* eslint-env node */

const fs = require("fs");
const readline = require('readline');

const OUTPUT_FILE = "output.csv";
const IDS_FILE = "ids.txt";
const CSV_HEADER = "CSV header goes here";
let ids;

function writeCSV(csv) {
    try {
        if (!fs.existsSync(OUTPUT_FILE)) {
            fs.writeFileSync(OUTPUT_FILE, CSV_HEADER);
        }
        fs.appendFile(OUTPUT_FILE, csv, function (err) {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }
}

async function readIds() {
    const ids = [];
    const stream = fs.createReadStream(IDS_FILE);
    const rl = readline.createInterface({
        input: stream
    });

    for await (const line of rl) {
        ids.push(line);
    }
    return ids;
}

async function attachApp(app) {

    ids = await readIds();

    app.get("/test", (req, resp) => {
        console.log("test");
        resp
            .status(200)
            .contentType("text/plain")
            .end(ids.toString());
    });

    app.get("/validate", (req, resp) => {
        const id = req.query.id;
        let ok;
        if (id && ids.includes(id)) {
            ok = "VALID";
        }
        else {
            ok = "INVALID";
        }

        resp
            .status(200)
            .json({ ok });
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