const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");

const prisma = new PrismaClient();

async function ContestBasicPage(req,res) {
    
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err){
            res.status(200).json({
                err:"invalid login"
            })
            return
        }
        let viewMode = false;
        let idToSearch = {id:session.id}

        if(req.body.uname !== session.uname){
            viewMode = true;
            idToSearch = await prisma.student.findFirst({
                where:{
                    uname:req.body.uname
                }
            })
        }

        const details = await prisma.contest.findFirst({
            where:{
                title:req.body.tname
            },
            include:{
                question:{
                    select:{
                        submission:{
                            where:{
                                studentId:idToSearch.id
                            },
                            select:{
                                status:true,
                                id:true
                            }
                        }
                    }
                }
            }
        })

        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000);

        let count = 0
        let count2 = 0

        details.question.map(ques =>{
            ques.submission.map(sub =>{
                if(sub.status == "COMPLETED"){
                    count+=1
                }
                count2 += 1
            })
        })

        if(count === details.totalNoOfQuestions){
            res.status(200).json({
                msg:"Successful",
                status:"COMPLETED",
                data:details
            })
            return
        }

        if(count2 == 0){
            res.status(200).json({
                msg:"Successful",
                status:"START NEW ATTEMPT",
                data:details
            })
            return
        }

        if(count2 > 0){
            res.status(200).json({
                msg:"Successful",
                status:"CONTINUE LAST ATTEMPT",
                data:details
            })
            return
        }

        if(now > details.closesOn){
            res.status(200).json({
                msg:"Successful",
                status:"ENDED",
                data:details
            })
            return
        }
        if(now < details.opensOn){
            res.status(200).json({
                msg:"Successful",
                status:"NOT STARTED",
                data:details
            })
            return
        }
        res.status(200).json({
            err:"ithu enna puthu case uh"
        })
    }

    catch(error){
        console.log(error);
        res.status(200).json({
            err:"internal error"
        })
    }

}

module.exports = {
    ContestBasicPage
}