const { sessionChecker } = require("../../sessionChecker/sessionChecker")
const {PrismaClient} = require("../../dbSchema/generated")
const prisma = new PrismaClient();

async function codeSubmission(req,res) {
    try{
        const sid = sessionChecker(req.body.session)
        if(sid==-1){
            res.status(200).json({
                err:"invalid session"
            })
        }
        else{
            const update = await prisma.submission.updateManyAndReturn({
                where:{
                   AND:[
                    {id:req.body.submissionId},
                    {isFinal: "NO"}
                   ]
                },
                data:{
                    isFinal:"YES"
                }
            });
            if(!update || update.length==0){
                res.status(200).json({
                    "err":"give a valid submission"
                })
            }
            else{
                const addPoints = await prisma.studentAchievements.update({
                    where:{
                        AND:[
                            {studentId:sid},
                            {achievementId:1}
                        ]
                    },
                    data:{
                        count:{
                            increment:update[0].pointsSecured
                        }
                    }
                })
                res.status(200).json({
                    msg:"successful"
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
    codeSubmission
}