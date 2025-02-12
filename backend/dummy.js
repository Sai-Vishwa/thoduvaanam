const { spawn } = require("child_process");

const child = spawn("cmd.exe", ["/c", "echo", "Hello, Vro!"]);

let dat;
child.stdout.on("data", (data) => {
//   console.log("Output:", data.toString());
    dat = data
});

child.stderr.on("data", (data) => {
  console.error("Error:", data.toString());
});

child.on("close", (code) => {
  console.log(`Process exited with code ${code}`);
});


await console.log(dat)