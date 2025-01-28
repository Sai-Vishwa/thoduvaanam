const { PrismaClient } = require("../../dbSchema/generated");

const prisma =  new PrismaClient();

async function leaderBoard(req,res) {
    try{
        const studentAchievements = await prisma.studentAchievements.findMany({
            select:{
                studentId:true,
                achievementId:true,
                count:true,
                student:{
                    select:{
                        uname:true,
                        name:true,
                        rno:true,
                        timeOfLastSolve:true
                    }
                },
                achievements:{
                    select:{
                        description:true,
                        title:true
                    }
                }
            }
        })
        res.status(200).json({
            msg:"successful",
            studentAchievements:studentAchievements
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}

module.exports = {
    leaderBoard
}