/* eslint-env node */

const fs = require("fs");
const readline = require('readline');


async function readIds(){
    const ids = [];
    const stream = fs.createReadStream("ids.txt");
    const rl = readline.createInterface({
        input: stream
    });

    for await (const line of rl){
        ids.push(line);
    }
    return ids;
}

async function run(){
    let ids = await readIds();
    console.log(ids);
}

run();