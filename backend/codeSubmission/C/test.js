const { exec } = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');
// exec("docker cp runError.c c_container:/app/")
//docker exec c_container gcc correct.c -o correct
//docker exec c_container ./correct
exec('docker exec c_container ./run2',(error, stdout, stderr) =>{
    if(error){
        console.log(error.message)
    }
    if(stderr){
        console.log(stderr)
    }
    console.log(stdout)
})