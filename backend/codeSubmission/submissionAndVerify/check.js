const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const { CMain } = require("../C/CMain");
const { JavaMain } = require("../java/javaMain");
const {  PythonMain } = require("../python/pythonMain");
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
                id:true
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
                AND:[
                    {studentId:studentId},
                    {questionId:qid.id},
                ]
            }
        })
        if(upd.count == 0){
            res.status(200).json({
                err:"dai faker odra..."
            })
            return
        }
        if(lang==="c"){
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
            const outcome = await PythonMain(req.body);
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
        else if(lang==="Java"){
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