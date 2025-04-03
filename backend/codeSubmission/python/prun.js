const  spawn  = require("child_process").spawn;

async function prun(fileName, testcaseInput, testCaseOutput) {
    return new Promise((resolve, reject) => {
        const child = spawn("docker", ["exec", "-i", "python_container", `python`, `${fileName}.py`]);

        var utfEncoder = new TextEncoder("utf-8");
        var utfDecoder = new TextDecoder("utf-8");

        child.stdin.write(testcaseInput);
        
        child.stdin.end();

        let output = "";
        let errorOutput = "";

        // child.stdout.setEncoding("utf-8");
        child.stdout.on('data', (data) => {
            output = data.toString()
            console.log(`Output: ${data.toString()}`); // Now safely convert
        });
        
        

        child.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        const timeout = setTimeout(() => {
            errorOutput = "Time limit exceeded ..."
            child.kill();
        }, 10000);

        child.on("close", (status) => {
            clearTimeout(timeout);
            if (errorOutput) {
                resolve({ err: "Runtime error", op: errorOutput, count: 0 });
            } else {
                resolve({
                    msg: "Successful",
                    count: `${testCaseOutput}\n`===output || testCaseOutput===output? 1 : 0,
                    op: output,
                    
                });
            }
        });

        child.on("error", (errmsg) => {
            clearTimeout(timeout);
            reject({ err: "Error in execution, try again", op: errmsg.message, count: 0 });
        });
    });
}

module.exports = {
    prun,
};