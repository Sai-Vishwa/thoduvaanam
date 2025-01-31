const { spawnSync } = require('child_process');

function run(fileName, testcaseInput, testCaseType, testCaseOutput) {

    const result = spawnSync("docker", ["exec", "c_container", `./${fileName}`], {
        input: testcaseInput,
        encoding: "utf-8"
    });

    if (result.error) {
        return { err: "Error in execution, try again" };
    }

    if (result.stderr) {
        if (testCaseType === "OPEN") {
            return {
                err: "Runtime error",
                stderr: result.stderr,
                count: 0
            };
        }
        return {
            err: "Runtime error",
            count: 0
        };
    }

    return {
        msg: "Successful",
        count: result.stdout === testCaseOutput ? 1 : 0,
        stdout: testCaseType === "OPEN" ? result.stdout : null
    };
}

module.exports = {
    run
};