const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function profile(req,res) {
    try{
        const studentId = await sessionChecker(req.cookies.session);
        let viewMode = true
        if(studentId.err==-1){
            res.status(200).json({
                err:"invalid session"
            })
        }
        else{
            if(req.body.uname === studentId.uname){
                viewMode = false
            }
            const data =  await prisma.student.findFirst({
                where:{
                    uname:req.body.uname
                },
                select:{
                    id: true,
                    name: true,
                    uname: true,
                    leetCodeProfile: true,
                    timeOfLastSolve: true,
                    leetCodeName: true,
                    rno: true,
                    studentAchievements:{
                        select:{
                            achievementId: true,
                            count: true,
                            achievements:{
                                select:{
                                    title: true,
                                    description: true
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json({
                msg:"successful",
                data:data,
                viewMode:viewMode,
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}

module.exports = {
    profile
}