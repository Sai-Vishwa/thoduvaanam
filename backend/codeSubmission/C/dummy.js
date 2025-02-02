const { spawn } = require("child_process");

async function run() {
    return new Promise((resolve, reject) => {
        const process = spawn("cmd", ["/c", "echo Hello, vro!"]);

        let output = "";

        process.stdout.on("data", (data) => {
            output += data.toString();
        });

        process.on("close", () => {
            resolve(output); // ✅ Using resolve to return the output
        });

        process.on("error", (err) => {
            reject(err); // ✅ Rejecting if there's an error
        });
    });
}

(async () => {
    try {
        const result = await run(); // ✅ Should print: Hello, vro!
        console.log("Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
})();
