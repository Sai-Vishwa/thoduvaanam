const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function submitQuestion(req,res) {
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
                err:"u cant submit others practice question"
            })
            return
        }
        const questions = await prisma.questions.findFirst({
            include:{
                submission:{
                    where:{
                        studentId:session.id
                    }
                }
            },
            where:{
                title:tname
            }
        })
        let bestScore = 0;
        let counter = 0;
        questions.submission.map((s)=>{
            counter+=1
            if(s.pointsSecured>bestScore && s.isFinal=="YES" && s.status=="COMPLETED"){
                bestScore= s.pointsSecured
            }
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
                id:req.body.sId
            }
        })
        if(submit.length !== 1 ){
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

        if(score > bestScore){
            
        
        await prisma.studentAchievements.updateMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach.totalPoints}
                ]
            },
            data:{
                count:{increment:score-bestScore}
            }
        })

    }
    console.log("bestcore",bestScore)
    console.log("score",score)
    console.log("counter",counter)

    if(counter == 1 && parseInt(questions.pointsPerTestCaseSolved)*(parseInt(questions.noOfExternalTestCases)+parseInt(questions.noOfHiddenTestCases))===score){

        
        await prisma.studentAchievements.updateMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach.totalQuestionsSolved}
                ]
            },
            data:{
                count:{
                    increment: 1
                }
            }
        })
        
        await prisma.studentAchievements.updateMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {achievementId:ach[`total${questions.difficulty=="EASY"?"Easy":questions.difficulty=="BALANCED"?"Balanced":questions.difficulty=="HELL"?"Hell":"Intense"}QuestionsSolved`]}
                ]
            },
            data:{
                count:{
                    increment: 1
                }
            }
        })
    }

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
    submitQuestion
}