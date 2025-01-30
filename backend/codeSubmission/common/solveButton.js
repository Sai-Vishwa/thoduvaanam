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