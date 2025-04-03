const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const { CMain } = require("../C/CMain");
const { JavaMain } = require("../java/javaMain");
const {  PythonMain } = require("../python/pythonMain");
const { cppMain } = require("../cpp/cppMain")
const prisma = new PrismaClient();
const files = require('fs');

async function check(req,res) {
    console.log("inside check - ",req.body)
    try{
        const studentId = sessionChecker(req.body.session)
        const code = req.body.code
        const lang = req.body.language
        const qname = req.body.qname
        if(studentId == -1){
            res.status(200).json({
                err:"invalid session"
            })
            return
        }
        const qid = await prisma.questions.findFirst({
            where:{
                title:qname
            },
            select:{
                id:true,
                pointsPerTestCaseSolved:true
            }
        })
        const upd = await prisma.submission.updateMany({
            data:{
                noOfCasesPassed:0,
                pointsSecured:0,
                output1: "",
                output2: "",
                code: code,
                language:lang,
                status:"COMPUTING"
            },
            where:{
                id:req.body.sId
            }
        })
        if(upd.count == 0){
            res.status(200).json({
                err:"dai faker odra..."
            })
            return
        }
        if(lang==="C"){
            const outcome = await CMain(req.body);
            if(outcome.status==-1){
                res.status(400).json({
                    err:"internal error"
                })
                return
            }
            
            res.status(200).json({
                msg:"Naama jeichittom maara",
                ...outcome
            })
        }
        else if(lang==="PYTHON"){
            console.log("calling py")
            let outcome = await PythonMain(req.body);
            if(outcome.status==-1){
                res.status(400).json({
                    err:"internal error"
                })
                return
            }
            let failedHidden = ""
            let op1Pass = false
            let op2Pass = false
            outcome.results.map((res)=>{
                if(res.type==="HIDDEN" && res.count==0){
                    failedHidden = res.input
                }
                else if(res.type==="OPEN1" && res.count==1){
                    op1Pass=true
                }
                else if(res.type==="OPEN2" && res.count==1){
                    op2Pass=true
                }

            })

            await prisma.submission.updateMany({
                where:{
                    id:req.body.sId
                },
                data:{
                    isChecked:"YES",
                    failedForInput:failedHidden,
                    output1:outcome.op1,
                    output2:outcome.op2,
                    pointsSecured:outcome.count * qid.pointsPerTestCaseSolved,
                    noOfCasesPassed: outcome.count,
                    status:"WAITING",
                    output1Status:op1Pass?"YES":"NO",
                    output2Status:op2Pass?"YES":"NO"
                }
            })
            delete outcome.results

            res.status(200).json({
                msg:"Naama jeichittom maara",
                ...outcome,
                failedHidden:failedHidden,
                op1Pass:op1Pass,
                op2Pass:op2Pass
            })
        }
        
        else if(lang==="JAVA"){
            const outcome = await JavaMain(req.body);
            if(outcome.status==-1){
                res.status(400).json({
                    err:"internal error"
                })
                return
            }
            res.status(200).json({
                msg:"Naama jeichittom maara",
                ...outcome
            })
        }
        else if(lang==="CPP"){
            const outcome = await cppMain(req.body);
            if(outcome.status==-1){
                res.status(400).json({
                    err:"internal error"
                })
                return
            }
            res.status(200).json({
                msg:"Naama jeichittom maara",
                ...outcome
            })
        }
    
    }
    catch(error){
        console.log(error);
        res.status(200).json({
            err:"internal error"
        })
    }
}

module.exports = {
    check
}