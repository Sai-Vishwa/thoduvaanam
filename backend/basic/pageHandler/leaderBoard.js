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
                        rno:true
                    }
                },
                achievements:{
                    select:{
                        description:true,
                        title:true
                    }
                }
            },
            where:{
                achievementId:1
            }
        })
        res.status(200).json({
            msg:"successful",
            data:studentAchievements
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