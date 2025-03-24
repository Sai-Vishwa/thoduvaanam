const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function questionPage(req,res) {
    try{
        const studentId = await sessionChecker(req.body.session);
        const qname = req.body.qname
        let qid = await prisma.questions.findFirst({
            where:{
                title:qname
            }
        })
        qid.points  = (parseInt(qid.noOfExternalTestCases)+parseInt(qid.noOfHiddenTestCases))*parseInt(qid.pointsPerTestCaseSolved)
        delete qid.description
        delete qid.contestId
        delete qid.noOfExternalTestCases
        delete qid.noOfHiddenTestCases
        delete qid.pointsPerTestCaseSolved
        
        
        let viewMode = true
        let idToSearch = {id:""}
        if(studentId == -1){
            res.status(200).json({
                err: "invalid session"
            })
        }
        else{
            if(req.body.uname === studentId.uname){
                viewMode = false
                idToSearch = {id:studentId.id}
            }
            else{
                idToSearch = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
            }
            const submissions = await prisma.submission.findMany({
                where:{
                    AND:[
                        {studentId: idToSearch.id},
                        {questionId:qid.id}
                    ]
                }
            })

            let count = 0
        let count2 = 0
        submissions.map((sb)=>{
            if(sb.status=="COMPLETED"){
                count+=1
            }
        })
        if(count==submissions.length){
            res.status(200).json({
                msg:"Successful",
                status:"START NEW ATTEMPT",
                submissionData: submissions,
                questionData : qid,
                viewMode: viewMode,

            })
            return
        }
        else{

            res.status(200).json({
                msg: "successful",
                viewMode: viewMode,
                submissionData: submissions,
                questionData : qid,
                status:"CONTINUE LAST ATTEMPT",

            })

        }
                
            
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err : "internal error"
        })
    }
}
module.exports = {
    questionPage
}