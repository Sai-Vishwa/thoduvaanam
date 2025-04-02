const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function autoSave(req,res) {
    try{
        const studentId = await sessionChecker(req.body.session)
        const submissionId = req.body.sId
        if(studentId==-1){
            res.status(200).json({
                err:"invlaid session"
            })
            return
        }
        const check = await prisma.submission.findFirst({
            where:{
                id:submissionId
            }
        })
        if(check.studentId !== studentId.id){
            res.status(200).json({
                err:"matniya da body soda"
            })
        }
        console.log(JSON.stringify(req.body))
        await prisma.submission.updateMany({
            where:{
                id:submissionId
            },
            data:{
                savedCCode:req.body.savedCCode,
                savedCppCode:req.body.savedCppCode,
                savedJavaCode:req.body.savedJavaCode,
                savedPythonCode:req.body.savedPythonCode
            }
        })
        res.status(200).json({
            msg:"Successful"
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
    autoSave
}