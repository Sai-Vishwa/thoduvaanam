const { spawn } = require("child_process");

function cppCompile(allData, fileName) {
    return new Promise((resolve, reject) => {
        const result = spawn("docker", [
            "exec","-i", "cpp_container", "g++","-o", `${fileName}`, `${fileName}.${allData.lang}`
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
    cppCompile
};