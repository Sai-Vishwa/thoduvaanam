const file = require('fs')
async function CMain(allData) {

    try{
        await Promise.all([
            file.writeFile(`Submission_${allData.submissionId}.${allData.lang}` , )

        ])
    }
    catch(error){
        console.log(error)
        return {status:-1}
    }

}
module.exports = {
    CMain
}