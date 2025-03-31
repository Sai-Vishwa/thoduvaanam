const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function submitContest(req,res) {
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const uname = req.body.uname;
        const tname = req.body.tname;
        if(uname!==session.uname){
            res.status(200).json({
                err:"u cant submit others contest"
            })
            return
        }
        const questions = await prisma.contest.findFirst({
            include:{
                question:{
                    include:{
                        submission:true
                    }
                }
            },
            where:{
                title:tname
            }
        })
        let qids = []
        questions.question.map((q)=>{
            qids.push(q.id)
        })
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000)
        const submit = await prisma.submission.updateManyAndReturn({
            data:{
                isFinal:"YES",
                status:"COMPLETED",
                submittedOn:now
            },
            where:{
                AND:[
                    {questionId:{in:qids}},
                    {studentId:session.id},
                    {status:"WAITING"},
                    {isFinal:"NO"},
                    {maxTimeToSolve:{gte:now}}
                ]
                
            }
        })
        if(submit.length !== qids.length ){
            res.status(200).json({
                err:"Etho kolaru panta da.. contact admin"
            })
            return
        }
        let score = 0;
        submit.map((sub)=>{
            score+=parseInt(sub.pointsSecured)
        })

        const achievements = await prisma.achievements.findMany()
        let ach = {}
        achievements.map((a)=>{
            ach[a.title] = a.id
        })

        await prisma.studentAchievements.updateMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach.totalPoints}
                ]
            },
            data:{
                count:{increment:score}
            }
        })

        await prisma.studentAchievements.updateMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach.totalContestsParticipated}
                ]
            },
            data:{
                count:{
                    increment: 1
                }
            }
        })

        const lastSolve = await prisma.student.findFirst({
            where:{
                id:session.id
            },
            select:{
                timeOfLastSolve:true
            }
        })

        const streak = new Date(lastSolve.timeOfLastSolve)

        const diffDays = Math.floor((now - streak)/(1000*60*60*24))
        console.log("look at this and ponder")

        console.log("diffdays = ",diffDays)
        console.log("streak = ",streak)
        console.log("last solve = ",lastSolve.timeOfLastSolve)

        if(diffDays == 1){

            await prisma.studentAchievements.updateMany({
                where:{
                    AND:[
                        {studentId:session.id},
                        {achievementId:ach.currentStreak}
                    ]
                },
                data:{
                    count:{
                        increment: 1
                    }
                }
            })

        }

        else if(diffDays > 1  || streak===null || lastSolve.timeOfLastSolve===null){
            await prisma.studentAchievements.updateMany({
                where:{
                    AND:[
                        {studentId:session.id},
                        {achievementId:ach.currentStreak}
                    ]
                },
                data:{
                    count:1
                }
            })
        }

        const str = await prisma.studentAchievements.findFirst({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach.currentStreak}
                ]
            },
            select:{
                count:true
            }
        })

        await prisma.student.updateMany({
            where:{
                id:session.id
            },
            data:{
                timeOfLastSolve:now
            }
        })

        res.status(200).json({
            msg:"Successful",
            pts:score,
            streak:str.count
        })
    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error"
        })
    }
}

module.exports = {
    submitContest
}