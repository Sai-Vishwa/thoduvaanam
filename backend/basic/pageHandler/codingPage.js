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
            select:{
                id:true
            }
        })
        const details = await prisma.submission.findFirst({
            where:{
                AND:[
                    {questionId:qid.id},
                    {studentId:studentId.id}
                ]
            }
        })
        const boiler = await prisma.boilerPlate.findMany({
            where:{
                AND:[
                    {questionId:qid.id},
                    {type:"TO_USER"}
                ]
            }
        })
        const tc = await prisma.testCase.findMany({
            where:{
                AND:[
                    {questionId:qid.id},
                    {type:{in:["OPEN1","OPEN2"]}}
                ]
            },
            select:{
                type:true,
                inputString:true,
                outputString:true
            }
        })
        if(details.isFinal == "YES" || details.status!=="WAITING"){
            res.status(200).json({
                err:"contest completed already"
            })
            return
        }
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000)
        const st = new Date(details.startTime)
        const end = new Date(details.maxTimeToSolve)
        // console.log(st);
        const diffSeconds = Math.floor((end-now) / 1000); 
        const diffMinutes = Math.floor(diffSeconds / 60);
        const remainingSeconds = diffSeconds % 60
        console.log(boiler)
        res.status(200).json({
            msg:"Successful",
            data:details,
            minutes:diffMinutes,
            seconds:remainingSeconds,
            testCase:tc,
            boiler:boiler
        })
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