const file = require("fs");
const { spawnSync } = require("child_process");

async function copy(allData, fileName) {

    file.writeFile(`${fileName}.${allData.lang}`, allData.code, "utf-8");

    const result = spawnSync("docker", ["cp", `${fileName}.${allData.lang}`, "c_container:/app/"], {
        encoding: "utf-8"
    });

    if (result.error || result.stderr) {
        console.log(result.error, result.stderr);
        return -1;
    }
    return 0;
}

module.exports = {
    copy
};
