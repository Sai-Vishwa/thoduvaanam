const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function questionPage(req,res) {
    try{
        const studentId = await sessionChecker(req.cokkies.session);
        const qid = req.body.qid
        let idToSearch = studentId
        let viewMode = false
        if(studentId == -1){
            res.status(200).json({
                err: "invalid session"
            })
        }
        else{
            if(req.body.idToSearch !== ""){
                idToSearch = parseInt(req.body.idToSearch)
                viewMode = true
            }
            const submissions = await prisma.submission.findMany({
                where:{
                    studentId: idToSearch
                }
            })
                res.status(200).json({
                    msg: "no submissions yet",
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