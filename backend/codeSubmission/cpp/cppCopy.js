const fs = require("fs");
const { spawn } = require("child_process");

async function cppCopy(allData, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.${allData.lang}`, allData.code, "utf-8", (err) => {
            if (err) return reject(err);

            const process = spawn("docker", ["cp", `${fileName}.${allData.lang}`, "cpp_container:/app/"]);

            process.stderr.on("data", (data) => {
            console.error("Error:", data.toString());
            reject(-1);
             });
            
                process.on("close", (code) => {
                resolve(code === 0 ? 0 : -1);
            });

            process.on("error", (err) => reject(err));
         });
    });
}

module.exports = { cppCopy };