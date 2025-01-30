const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const { CMain } = require("../C/CMain");
const { pythonMain } = require("../python/pythonMain");
const prisma = new PrismaClient();
const files = require('fs');

async function check(req,res) {
    try{
        const studentId = sessionChecker(req.cookies.session)
        const code = req.body.code
        const lang = req.body.lang
        const qid = req.body.qid
        if(studentId == -1){
            res.status(200).json({
                err:"invalid session"
            })
        }
        else{
            const upd = await prisma.submission.updateMany({
                data:{
                    noOfCasesPassed:0,
                    pointsSecured:0,
                    output1: "",
                    output2: "",
                    code: code,
                    lang: lang
                },
                where:{
                    AND:[
                        {studentId:studentId},
                        {questionId:qid},
                        {isFinal:"NO"},
                        {status:"PENDING"}
                    ]
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
            else if(lang==="Python"){
                
            }
            else if(lang==="Java"){

            }
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