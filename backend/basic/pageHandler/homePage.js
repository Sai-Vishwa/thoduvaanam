const {PrismaClient} = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function homePage(req,res) {
    try{
        const studentId = await sessionChecker(req.cookies.session)
        let viewMode = false
        let idToSearch = studentId
        if(studentId==-1){
            res.status(200).json({
                err:"Invlaid session"
            })
        }
        else{
            if(req.body.serachId !== ""){
                idToSearch = parseInt(req.body.serachId)
                viewMode = true
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
                            submission:{
                                select:{
                                    status:true,
                                    isFinal:"YES"
                                },
                                where:{
                                    studentId:idToSearch
                                }
                            }
                        }
                    }
                }
            });
            res.status(200).json({
                msg:"Success",
                data:data,
                viewMode: viewMode
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