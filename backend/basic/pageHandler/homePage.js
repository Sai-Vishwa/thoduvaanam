const {PrismaClient} = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function homePage(req,res) {
    try{
        let viewMode = true
        let searchid
        console.log(req.body.session)
        const studentId = await sessionChecker(req.body.session)
        if(studentId.err){
            res.status(200).json({
                err:"Invlaid session"
            })
        }
        else{
            if(studentId.uname == req.body.uname){
                viewMode = false
                searchid = studentId.id
            }
            else{
                const search = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
                searchid = search.id
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
                                        {studentId: searchid},
                                        {isFinal:"YES"}
                                    ]
                                }
                            }
                        },
                        where:{
                            type:"PRACTICE"
                        }
                    }
                }
            });
            const myData = await prisma.student.findFirst({
                where:{
                    id:searchid
                },
                select:{
                    name:true,
                    rno:true,
                    uname:true,
                    leetCodeName:true,
                    studentAchievements:{
                        select:{
                            achievementId:true,
                            count:true
                        }
                    }
                }
            })
            res.status(200).json({
                msg:"Success",
                data:data,
                myData:myData,
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