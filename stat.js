const fs = require("fs");

fs.stat("ids.txt", function(err, stat){
    console.log(err);
    console.log(stat);
});