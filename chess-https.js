/* eslint-env node */

const PORT = 3001;
const KEY = "key.pem";
const CERT = "cert.pem";

//const KEY =  "/etc/ssl/certs/psychlab_massey_ac_nz.pem";
//const CERT = "/etc/ssl/certs/psychlab_massey_ac_nz.pem";

const fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const chessServer = require("./chess-server");

const app = express();

let server;


function buildApp() {
    app.use((req, _res, next) => {
        try {
            const fileName = path.basename(req.originalUrl);
            const extension = path.extname(fileName);
            if (extension === ".html") {
                const date = new Date();
                console.log(`${Date.now()},${date.toLocaleString()},${req.ip},${req.originalUrl}`);
            }
        }
        finally {
            next();
        }
    });

    app.use(express.static("public"));
    app.use(express.json());
    app.disable("x-powered-by");

    chessServer.attachApp(app);
}

function createServer() {
    server = https.createServer({
        key: fs.readFileSync(KEY),
        cert: fs.readFileSync(CERT)
        //passphrase: "tafR99+d"
    }, app);
    server.listen(PORT, function () {
        console.log(`Express (HTTPS) server listening on port: ${PORT}, worker PID: ${process.pid}`);
    });
}

buildApp();
createServer();