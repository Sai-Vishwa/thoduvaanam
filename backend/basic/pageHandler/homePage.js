const {PrismaClient} = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function homePage(req,res) {
    try{
        if(await sessionChecker(req.body.id , req.body.sessionId)==0){
            res.status(200).json({
                err:"Invlaid session"
            })
        }
        else{
            const data = await prisma.topics.findMany({
                select:{
                    id:true,
                    name:true,
                    question:{
                        select:{
                            id:true,
                            title:true,
                            difficulty:true,
                            submission:{
                                select:{
                                    status:true
                                },
                                where:{
                                    studentId:req.body.studentId
                                }
                            }
                        }
                    }
                }
            });
            res.status(200).json({
                msg:"Success",
                data:data
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"Internal error"
        })
    }
}

module.exports = {
    homePage
}