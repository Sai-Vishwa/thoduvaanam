const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const { pythonMain } = require("../python/pythonMain");
const prisma = new PrismaClient();
async function check(req,res) {
    try{
        const studentId = sessionChecker(req.cookies.session)
        const code = req.body.code
        const lang = req.body.lang
        const qid = req.body.qid
        if(studentId == -1){
            res.status(200).josn({
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
                    studentId:studentId,
                    questionId:qid,
                    isFinal:"NO",
                    status:"PENDING"
                }
            })
            if(upd.count == 0){
                res.status(200).josn({
                    err:"dai faker odra..."
                })
            }
            else{
                if(lang==="C"){

                }
                else if(lang==="Python"){
                    const outcome = await pythonMain({});
                    if(outcome.status == -1){
                        res.status(200).json({
                            err:"Thothukitte irukkiye da..."
                        })
                    }
                    else{
                        res.status(200).json({
                            msg:"ithu namma kaalam kabila...",
                            data:outcome
                        })
                    }
                }
                else if(lang==="Java"){
    
                }
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