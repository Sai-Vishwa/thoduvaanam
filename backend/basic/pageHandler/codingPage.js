const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function codingPage(req,res) {
    try{
        const submissionId = req.body.submissionId;
        const questionId = req.body.questionId;
        const studentId = sessionChecker(req.cookies.session)
        if(studentId == -1){
            res.status(200).json({
                err:"invalid login"
            })
        }
        else{
            if(submissionId == ""){
                const data = await prisma.questions.findFirst({
                    where:{
                        id: questionId
                    },
                    include:{
                        boilerPlate:true
                    }
                })
                res.status(200).json({
                    msg:"Successful",
                    data:data,
                    type:"loaded",
                })
            }
            else{
                const data = await prisma.submission.findFirst({
                    where:{
                        id:submissionId
                    }
                })
                res.status(200).json({
                    msg:"Successful",
                    data:data,
                    type:"submitted"
                })
            }
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err:"internal error"
        })
    }
}
module.exports = {
    codingPage
}