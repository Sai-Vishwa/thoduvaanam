const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function startSolvingQuestion(req,res) {
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
                err:"You cant attempt a question for others"
            })
            return
        }
        const question = await prisma.questions.findFirstOrThrow({
            where:{
                title:req.body.title
            }
        })
        const submissions = await prisma.submission.findMany({
            where:{
                AND:[
                    {studentId:session.id},
                    {questionId:question.id}
                ]
            }
        })
        let flag = false
        submissions.map(submission =>{
            if(submission.status !== "COMPLETED"){
                flag = true
            }
        })
        if(flag){
            res.status(200).json({
                err:"There is already an attempt going on vro"
            })
            return
        }
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000);
        const end = new Date(now.getTime()+question.timeToSolveInMinutes*60*1000)
        const create = await prisma.submission.createManyAndReturn({
            data:[{
                questionId:question.id,
                studentId:session.id,
                startTime:now,
                maxTimeToSolve:end,
                code:"",
                language:"JAVA",
                savedCCode:question.CppBoilerCode,
                savedCppCode:question.CppBoilerCode,
                savedJavaCode:question.JavaBoilerCode,
                savedPythonCode:question.PythonBoilerCode,
            }]
        })
        await prisma.submission.updateMany({
            where:{
                id:create[0].id
            },
        data:{
            savedJavaCode:`${question.JavaImports}\npublic class Submission_${create[0].id} {\n${question.JavaBoilerCode}\n}`
        }
        })
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
    startSolvingQuestion
}