const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function contestReviewPage(req,res) {
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err == -1){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const submissionnDetails = await prisma.contest.findFirst({
            where:{
                title:req.body.cname
            },
            select:{
                question:{
                    select:{
                        submission:""
                    }
                }
            }
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
    contestReviewPage
}