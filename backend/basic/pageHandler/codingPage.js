const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function codingPage(req,res) {
    try{
        const qname = req.body.qname;
        const studentId = await sessionChecker(req.body.session)
        if(studentId.err == -1){
            res.status(200).json({
                err:"invalid login"
            })
            return
        }
        if(studentId.uname !== req.body.uname){
            res.status(200).json({
                err:"U cant access others coding page"
            })
            return
        }
        const qid = await prisma.questions.findFirst({
            where:{
                title:qname
            },
            include:{
                contest:{
                    select:{
                        title:true
                    }
                }
            }
        })
        console.log(qid)
        const details = await prisma.submission.findMany({
            where:{
                AND:[
                    {questionId:qid.id},
                    {studentId:studentId.id}
                ]
            }
        })
        let count = 0
        let data = {}
        details.map((dt)=>{
            if(dt.status!=="COMPLETED" ){
                data = dt
                
                count+=1
                
            }
        })
        if(count!==1){
            res.status(200).json({
                err:"nee etho kolaru panta da.. contact admin"
            })
            return
        }
        await prisma.submission.updateMany({
            where:{
                id:data.id
            },
            data:{
                isFinal:"NO"
            }
        })
        // 
        const tc = await prisma.testCase.findMany({
            where:{
                AND:[
                    {questionId:qid.id},
                ]
            },
            select:{
                type:true,
                inputString:true,
                outputString:true
            }
        })

        
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000)
        const st = new Date(data.startTime)
        const end = new Date(data.maxTimeToSolve)
        // console.log(st);
        const diffSeconds = Math.floor((end-now) / 1000); 
        const diffMinutes = Math.floor(diffSeconds / 60);
        const remainingSeconds = diffSeconds % 60

        if(now>end){
            res.status(200).json({
                err:"Contest over bruh"
            })
            return
        }
        let ip1 ={};
        let ip2 ={};
        let totaltc = tc.length;
        tc.map((t)=>{
            if(t.type === "OPEN1"){
                ip1["Input"] = t.inputString
                ip1["Output"] = t.outputString
            }
            else if(t.type === "OPEN2"){
                ip2["Input"] = t.inputString
                ip2["Output"] = t.outputString
            }
        })
        console.log(qid)
        res.status(200).json({
            msg:"Successful",
            data:data,
            minutes:diffMinutes,
            seconds:remainingSeconds,
            ques:qid,
            ip1:ip1,
            ip2:ip2,
            totaltc:totaltc
        })
        return
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err:"internal error"
        })
    }
}
module.exports = {
    codingPage
}