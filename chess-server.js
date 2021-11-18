/* eslint-env node */

const fs = require("fs");

const OUTPUT_FILE = "output.csv";
const CSV_HEADER = "CSV header goes here";

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

function attachApp(app) {

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