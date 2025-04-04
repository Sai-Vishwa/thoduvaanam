const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function addQuestion(req,res) {
    try{
        let dt = req.body.data
        delete dt.id
        dt.topic = parseInt(dt.topic)
        dt.contestId = parseInt(dt.contestId)
        dt.pointsPerTestCaseSolved = parseInt(dt.pointsPerTestCaseSolved)
        dt.noOfHiddenTestCases = parseInt(dt.noOfHiddenTestCases)
        dt.timeToSolveInMinutes = parseInt(dt.timeToSolveInMinutes)
        await prisma.questions.createMany({
            data:[
                req.body.data,
            ]
        })
        console.log("success")
        res.status(200).json({
            msg:"Successful"
        })
    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error... try again..."
        })
    }
    
}

module.exports = {
    addQuestion
}