const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function solveButton(req,res) {
    try{
        const studentId = await sessionChecker(req.body.session)
        if(studentId==-1){
            res.status(200).json({
                err:"invlaid session"
            })
            return
        }
        const add = await prisma.submission.createManyAndReturn({
            data:{
                studentId:studentId,
                ...req.body.data
            }
        })
        let ids = [];
        add.forEach(sub =>{
            ids.push(sub.id)
        })

        res.status(200).json({
            msg:"successful"
        })

        setTimeout(async ()=>{
            const utc = new Date();
            const now = new Date(utc.getTime()+5.5*60*60*1000);
            const val = await prisma.submission.updateManyAndReturn({
                where:{
                    AND:[
                        {id:{
                            in:ids
                        }},
                        {status:"WAITING"}
                    ]
                },
                data:{
                    isFinal:"YES",
                    status:"COMPLETED",
                    timeTaken:90*60*1000,
                    solvedOn: now
                }
            });
            let sum = 0;
            val.forEach(v =>{
                sum += parseInt(v.pointsSecured)
            })
            const addPoints = await prisma.studentAchievements.update({
                where:{
                    AND:[
                        {studentId:studentId},
                        {achievementId:1}
                    ]
                },
                data:{
                    count:{
                        increment:sum
                    }
                }
            })
        },90*60*1000)
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}

module.exports = {
    solveButton
}