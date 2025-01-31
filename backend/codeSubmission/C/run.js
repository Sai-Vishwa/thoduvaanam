const { spawnSync } = require('child_process');
const { stderr } = require('process');

function run(fileName, testcaseInput, testCaseOutput) {

    const result = spawnSync("docker", ["exec", "c_container", `./${fileName}`], {
        input: testcaseInput,
        encoding: "utf-8"
    });

    setTimeout(()=>{
        const kill = spawnSync("docker",["exec","pkill",`${fileName}`])
        return {err:"Time limit exceeded",op:"Time limit exceeded",count:0}
    },5*1000)

    if (result.error) {
        return { err: "Error in execution, try again",count:0 ,op:"try check again"};
    }

    if (result.stderr) {
        return {
            err: "Runtime error",
            op:result.stderr,
            count: 0
        };
    }

    else if(result.stdout){
        return {
            msg: "Successful",
            count: result.stdout === testCaseOutput ? 1 : 0,
            op: result.stdout
        };
    }
    
}

module.exports = {
    run
};