const  spawn  = require("child_process").spawn;

async function cppRun(fileName, testcaseInput, testCaseOutput) {
    return new Promise((resolve, reject) => {
        const child = spawn("docker", ["exec", "-i" ,"cpp_container", `./${fileName}`],{
            stdio:["pipe","pipe","pipe"]
        });

        var utfEncoder = new TextEncoder("utf-8");
        var utfDecoder = new TextDecoder("utf-8");


        console.log(testcaseInput)
        child.stdin.write("4 10 20 10 5");
        
        child.stdin.end();

        let output = "";
        let errorOutput = "";


        // child.stdout.setEncoding("utf-8");
        child.stdout.on('data', (data) => {
            output = data.toString()
            console.log(`Output: ${output} , tc - ${testCaseOutput}`); // Now safely convert
        });
        
        

        child.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        const timeout = setTimeout(() => {
            errorOutput = "runtime"
            child.kill();
        }, 10000);

        child.on("close", (status) => {
            clearTimeout(timeout);
            if (errorOutput) {
                resolve({ err: "Runtime error", op: errorOutput, count: 0 });
            } else {
                resolve({
                    msg: "Successful",
                    count: output == testCaseOutput ? 1:0,
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
    cppRun,
};