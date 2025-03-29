const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function addContest(req,res) {
    console.log("start")
    try{
        let dt = req.body.data
        delete dt.id
       let openTime = new Date(dt.opensOn).toISOString()
       let closeTime = new Date(dt.closesOn).toISOString()
       dt.opensOn = openTime
       dt.closesOn = closeTime
       dt.totalPoints = parseInt(dt.totalPoints)
       dt.totalNoOfQuestions = parseInt(dt.totalNoOfQuestions)
       dt.timeToSolveInMinutes = parseInt(dt.timeToSolveInMinutes)
        await prisma.contest.create({
            data:req.body.data
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
    addContest
}