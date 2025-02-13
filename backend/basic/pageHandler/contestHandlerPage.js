const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function contestHandlerPage(req,res) {
    try{
        const studentId = await sessionChecker(req.body.session);
        const tname = req.body.tname
    
        let viewMode = true
        let idToSearch = {id:""}
        if(studentId == -1){
            res.status(200).json({
                err: "invalid session"
            })
        }
        else{
            if(req.body.uname === studentId.uname){
                viewMode = false
                idToSearch = {id:studentId.id}
            }
            else{
                idToSearch = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
            }
            
            const details = await prisma.contest.findFirst({
                where:{
                    title:req.body.tname
                },
                include:{
                    question:{
                        include:{
                            submission:{
                                where:{
                                    studentId:idToSearch.id
                                },
                                select:{
                                    status:true,
                                    id:true,
                                    maxTimeToSolve:true,
                                    startTime:true
                                }
                            }
                        }
                    }
                }
            })
           
            // details.
            const utc = new Date();
            const now = new Date(utc.getTime()+5.5*60*60*1000)
            const st = new Date(details.question[0].submission[0].startTime)
            const end = new Date(details.question[0].submission[0].maxTimeToSolve)
            console.log(st);
            const diffSeconds = Math.floor((end-now) / 1000); 
            const diffMinutes = Math.floor(diffSeconds / 60);
            const remainingSeconds = diffSeconds % 60

            // console.log(`Minutes: ${diffMinutes}, Seconds: ${remainingSeconds}`);
            if(end<now){
                res.status(200).json({
                    err:"Contest over bruh"
                })
                return
            }
            if(st>now){
                res.status(200).json({
                    err:"Contest not even started bruh"
                })
                return
            }

            const op = {
                    msg: "successful",
                    viewMode: viewMode,
                    minutes:diffMinutes,
                    seconds:remainingSeconds,
                    allData:details,
            }
            // console.log("hey - ")
            // console.log(JSON.stringify(op))
                return res.status(200).json(op)
            
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err : "internal error"
        })
    }
}
module.exports = {
    contestHandlerPage
}