const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function questionPage(req,res) {
    try{
        const studentId = await sessionChecker(req.cokkies.session);
        const qid = req.body.qid
        let viewMode = true
        let idToSearch = {id:""}
        if(studentId == -1){
            res.status(200).json({
                err: "invalid session"
            })
        }
        else{
            if(req.body.uname === studentId.uname){
                viewMode = false
                idToSearch = {id:studentId.id}
            }
            else{
                idToSearch = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
            }
            const submissions = await prisma.submission.findMany({
                where:{
                    studentId: idToSearch.id
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