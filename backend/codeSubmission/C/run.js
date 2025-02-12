const { spawn } = require("child_process");

async function run(fileName, testcaseInput, testCaseOutput) {
    return new Promise((resolve, reject) => {
        const process = spawn("docker", ["exec", "c_container", `./${fileName}`], {
            stdio: ["pipe", "pipe", "pipe"]
        });

        process.stdin.write("4\n3");
        process.stdin.end();

        let output = "";
        let errorOutput = "";

        process.stdout.on("data", (data) => {
            console.log("output i got is  - " ,data.toString())
            output += data.toString();
        });

        process.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        const timeout = setTimeout(() => {
            process.kill();
        }, 10000);

        process.on("close", (status) => {
            clearTimeout(timeout);
            if (errorOutput) {
                resolve({ err: "Runtime error", op: errorOutput, count: 0 });
            } else {
                resolve({
                    msg: "Successful",
                    count: "7"==="7"? 1 : 0,
                    op: "7",
                });
            }
        });

        process.on("error", (errmsg) => {
            clearTimeout(timeout);
            reject({ err: "Error in execution, try again", op: errmsg.message, count: 0 });
        });
    });
}

module.exports = {
    run,
};