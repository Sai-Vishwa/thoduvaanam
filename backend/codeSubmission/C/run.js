const { exec } = require('child_process');
const { count } = require('console');
const { stderr, stdout } = require('process');
async function run(fileName,testcaseInput , testCaseType,testCaseOutput) {
    await exec(`docker exec c_container ./${fileName}`,(error,stdout,stderr)=>{
        if(error){
            return {err:"error in execution try again"}
        }
        if(stderr){
            if(testCaseType=="OPEN"){
                return({
                    err:"run time error",
                    stderr: stderr,
                    count: 0
                })
            }
            return({
                err:"run time error",
                count: 0
            })
        }
        return({
            msg:"successful",
            count: stdout==testCaseOutput?1:0,
            stdout: testCaseType=="OPEN"?stdout:null
        })
    })
}

module.exports = {
    run
}