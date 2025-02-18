const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function startSolvingContest(req,res) {
    // console.log("here")
    try{
        const session =  await sessionChecker(req.body.session)
        if(session.err){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        if(req.body.uname !== session.uname){
            res.status(200).json({
                err:"You cant attempt a contest for others"
            })
            return
        }
        const contestAndQuestions = await prisma.contest.findFirst({
            where:{
                title:req.body.tname
            },
            select:{
                opensOn:true,
                closesOn:true,
                totalNoOfQuestions:true,
                timeToSolveInMinutes:true,
                question:{
                    select:{
                        id:true,
                        title:true,
                    }
                }
            }
        })
        // console.log("see here")
        console.log(contestAndQuestions)
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000);
        let arr = [];
        contestAndQuestions.question.map((ques)=>{
            arr.push(ques.id)
        })
        if(now<contestAndQuestions.opensOn){
            res.status(200).json({
                err:"Contest is not started yet"
            })
            return
        }
        if(now>contestAndQuestions.closesOn){
            res.status(200).json({
                err:"Kaalaila 6 manikku vara sonna ipo vara... ipo sayangalama 6 mani da... unakku cup um kadayathu uppu um kadayathu"
            })
            return
        }

        const submissions = await prisma.submission.findMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {questionId:{in:arr}}
                ]
            }
        })
        let flag = false
        let count = 0;
        submissions.map(submission =>{
            if(submission.status !== "COMPLETED"){
                flag = true
            }
            else{
                count+=1
            }
        })
        if(flag){
            res.status(200).json({
                err:"There is already an attempt going on vro"
            })
            return
        }
        if(count === contestAndQuestions.totalNoOfQuestions){
            res.status(200).json({
                err:"The contest is already completed by you"
            })
            return
        }
        
        const end = new Date(now.getTime()+contestAndQuestions.timeToSolveInMinutes*60*1000)

        // console.log(contestAndQuestions)

        await Promise.all(contestAndQuestions.question.map(async (q)=>{
            const data = {
                questionId:q.id,
                studentId:session.id,
                startTime:now,
                maxTimeToSolve:end,
                code:"",
                language:"JAVA"
                    
            }
            console.log(data)
            await prisma.submission.create({
                data:data
            })
        }))
        
        res.status(200).json({
            msg:"Successful"
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
    startSolvingContest
}