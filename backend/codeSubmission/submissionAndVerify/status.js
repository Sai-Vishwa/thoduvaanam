const { sessionChecker } = require("../../sessionChecker/sessionChecker")
const {PrismaClient} = require("../../dbSchema/generated")
const prisma = new PrismaClient();
async function submissionStatus(req,res) {
    try{
        const id = sessionChecker(req.body.session);
        if(id==-1){
            res.status(200).json({
                err:"session error"
            })
        }
        else{
            const submission = await prisma.submission.findFirst({
                where:{
                    id: req.body.id
                }
            })
            if(!submission){
                res.status(200).json({
                    err:"wrong submission id"
                })
            }
            else{
                res.status.json({
                    msg:"succesful",
                    data: submission
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
    submissionStatus
}