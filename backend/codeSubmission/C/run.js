const { spawn } = require("child_process");

async function run(fileName, testcaseInput, testCaseOutput) {
    const process = spawn("docker", ["exec", "c_container", `./${fileName}`], {
        stdio: ["pipe", "pipe", "pipe"],
        encoding: "utf-8",
    });

    process.stdin.write(testcaseInput);
    process.stdin.end();

    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
        output += data.toString();
    });

    process.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    setTimeout(() => {
        spawn("docker", ["exec", "c_container", "pkill", `${fileName}`]);
        return({ err: "Time limit exceeded", op: "Time limit exceeded", count: 0 });
    }, 5000);

    process.on("close", () => {
        if (errorOutput) {
            return({ err: "Runtime error", op: errorOutput, count: 0 });
        } else {
            return({
                msg: "Successful",
                count: output.trim() === testCaseOutput.trim() ? 1 : 0,
                op: output.trim(),
            });
        }
    });

    process.on("error", () => {
        return({ err: "Error in execution, try again", op: "try check again", count: 0 });
    });
}

module.exports = {
    run,
};