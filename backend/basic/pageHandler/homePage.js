const {PrismaClient} = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function homePage(req,res) {
    try{
        let viewMode = true
        const studentId = await sessionChecker(req.cookies.session)
        if(studentId.err){
            res.status(200).json({
                err:"Invlaid session"
            })
        }
        else{
            if(studentId.uname == req.body.uname){
                viewMode = false
                const searchid = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
            }
            else{
                const searchid = studentId.id
            }
            const data = await prisma.topics.findMany({
                select:{
                    id:true,
                    name:true,
                    question:{
                        select:{
                            id:true,
                            title:true,
                            difficulty:true,
                            type:true,
                            submission:{
                                select:{
                                    status:true,
                                },
                                where:{
                                    AND: [
                                        {studentId: studentId.id},
                                        {isFinal:"YES"}
                                    ]
                                }
                            }
                        }
                    }
                }
            });
            res.status(200).json({
                msg:"Success",
                data:data,
                viewMode: viewMode,
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