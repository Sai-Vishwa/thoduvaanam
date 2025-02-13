const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();
async function contestReviewPage(req,res) {
    try{
        console.log(req.body)
        const session = await sessionChecker(req.body.session);
        if(session.err == -1){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const idToSearch = await prisma.student.findFirst({
            where:{
                uname:req.body.uname
            },
            select:{
                id:true
            }
        })
        const submissionnDetails = await prisma.contest.findFirst({
            where:{
                title:req.body.tname
            },
            select:{
                closesOn:true,
                question:{
                    select:{
                        id:true,
                        title:true,
                        description:true,
                        difficulty:true,
                        testCase:{
                            select:{
                                inputString:true,
                                outputString:true,
                                type:true
                            },
                            where:{
                                type:{in:["OPEN1","OPEN2"]}
                            }
                        }
                    }
                }
            }
        })
        let arr = []
        submissionnDetails.question.map((q)=>{
            arr.push(q.id)
        })
        const submission =  await prisma.submission.findMany({
            where:{
                AND:[
                    {studentId:idToSearch.id},
                    {questionId:{in:arr}}
                ]
            }
        })
        // console.log(submission)
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000)
        const end = new Date(submissionnDetails.closesOn)
        if(req.body.uname !== session.uname && end>now){
            res.status(200).json({
                err:"poru pa contest mudiyattum appuram stalk pannalam"
            })
            return
        }
        // console.log(JSON.stringify(submissionnDetails))

        res.status(200).json({
            msg:"Successful",
            data:{...submissionnDetails , submission:submission},
            submission:submission
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