const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function solveButton(req,res) {
    try{
        const studentId = await sessionChecker(req.cookies.session)
        if(studentId==-1){
            res.status(200).json({
                err:"invlaid session"
            })
            return
        }
        const add = await prisma.submission.createMany({
            data:{
                studentId:studentId,
                ...req.body.data
            }
        })

        res.status(200).json({
            msg:"successful"
        })

        setTimeout(async ()=>{
            const now = new Date();
            const val = await prisma.submission.update({
                where:{
                    AND:[
                        {studentId:studentId},
                        {questionId:qid},
                        {isFinal:"NO"},
                        {status:"PENDING"}
                    ]
                },
                data:{
                    isFinal:"YES",
                    status:"COMPLETED",
                    timeTaken:90*60*1000,
                    solvedOn: now
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