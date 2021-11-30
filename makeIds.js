/* eslint-env node */

const fs = require("fs");
const stream = fs.createWriteStream("ids.txt");

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let rString;



stream.once("open", () => {
    for(let i = 0; i < 1; i++){
        rString = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        //stream.write(`${rString}\n`);
        console.log(rString);
    }
    stream.end();
});