const { spawnSync } = require("child_process");

function compile(allData, fileName) {

    const result = spawnSync("docker", [
        "exec", "c_container", "gcc", `${fileName}.${allData.lang}`, "-o", `${fileName}`
    ], { encoding: "utf-8" });

    if (result.error || result.stderr) {
        console.log(result.error, result.stderr);
        return -1;
    }
    return 0;
}

module.exports = {
    compile
};
