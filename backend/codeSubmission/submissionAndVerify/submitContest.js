const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function submitContest(req,res) {
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const uname = req.body.uname;
        const tname = req.body.tname;
        if(uname!==session.uname){
            res.status(200).json({
                err:"u cant submit others contest"
            })
            return
        }
        const questions = await prisma.topics.findFirst({
            select:{
                question:{
                    select:{
                        id:true
                    }
                }
            },
            where:{
                name:tname
            }
        })
        let qids = []
        questions.question.map((q)=>{
            qids.push(q.id)
        })
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000)
        const submit = await prisma.submission.updateManyAndReturn({
            data:{
                isFinal:"YES",
                status:"COMPLETED",
                submittedOn:now
            },
            where:{
                AND:[
                    {questionId:{in:qids}},
                    {studentId:session.id}
                ]
                
            }
        })
        let score = 0;
        submit.map((sub)=>{
            score+=parseInt(sub.pointsSecured)
        })
        res.status(200).json({
            msg:"Successful",
            pts:score
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
    submitContest
}