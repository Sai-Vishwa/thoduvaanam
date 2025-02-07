const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function questionPage(req,res) {
    try{
        const studentId = await sessionChecker(req.cokkies.session);
        const qid = req.body.qid
        let viewMode = true
        if(studentId == -1){
            res.status(200).json({
                err: "invalid session"
            })
        }
        else{
            if(req.body.uname === studentId.uname){
                viewMode = false
            }
            const submissions = await prisma.submission.findMany({
                where:{
                    
                }
            })
                res.status(200).json({
                    msg: "successful",
                    viewMode: viewMode,
                    data: submissions
                })
            
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
    questionPage
}