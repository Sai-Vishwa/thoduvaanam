const { spawn } = require("child_process");

function compile(allData, fileName) {
    return new Promise((resolve, reject) => {
        const result = spawn("docker", [
            "exec", "c_container", "gcc", `${fileName}.${allData.lang}`, "-o", `${fileName}`
        ]);

        let error = "";

        result.stderr.on("data", (data) => {
            error += data.toString();
        });

        result.on("close", (status) => {
            if (status === 0) {
                resolve(0);
            } else {
                reject(error || "Compilation failed!"); // Compilation failed
            }
        });

        result.on("error", (err) => {
            reject(err); // Process execution failed
        });
    });
}

module.exports = {
    compile
};