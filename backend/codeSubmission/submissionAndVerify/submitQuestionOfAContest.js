const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function submitQuestionOfAContest(req,res) {
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const uname = req.body.uname;
        const submissionId = req.body.submissionId;
        if(uname!==session.uname){
            res.status(200).json({
                err:"u cant submit others practice question"
            })
            return
        }
        const sub = await prisma.submission.findFirst({
            where:{
                id:submissionId
            },
            select:{
                studentId:true
            }
        })
        if(sub.studentId !== session.id){
            res.status(200).json({
                err:"poda fraud uh"
            })
            return
        }
        await prisma.submission.updateMany({
            where:{
                id:submissionId
            },
            data:{
                isFinal:"YES",
                
            }
        })
        res.status(200).json({
            msg:"successful"
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
    submitQuestionOfAContest
}