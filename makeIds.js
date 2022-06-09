/* eslint-env node */

const fs = require("fs");
const stream = fs.createWriteStream("ids.txt");

const N_IDS = 200;

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let rString;
let idSet = new Set();
let n = 0;

function writeItem(){
    while(idSet.size < N_IDS){
        rString = randomString(4, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if(!idSet.has(rString)){
            idSet.add(rString);
            stream.write(`${rString},${(n % 3) + 1}\n`, writeItem);
            n++;
        }
    }
    stream.end();
}

stream.once("open", () => {
    writeItem();
});