const fs = require("fs");
const { useConsole, setAdapter } = require("../dist/index.js");

useConsole();

setAdapter("test", {
    error(message, ...args) {
        fs.appendFileSync("./error.txt", `${message}\r\n`);
    },
});

console.log("aavvcc");

console.error(new Error("BBBBB"));
