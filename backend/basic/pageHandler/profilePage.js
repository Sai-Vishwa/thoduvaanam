const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function profile(req,res) {
    try{
        const studentId = sessionChecker(req.cookies.session);
        let viewMode = false
        let idToSearch = studentId
        if(studentId==-1){
            res.status(200).json({
                err:"invalid session"
            })
        }
        else{
            if(req.body.idToSearch != "" && req.body.idToSearch!=studentId){
                idToSearch = parseInt(req.body.idToSearch)
                viewMode = true
            }
            const data =  await prisma.student.findFirst({
                where:{
                    id:idToSearch
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
                studentId:idToSearch
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