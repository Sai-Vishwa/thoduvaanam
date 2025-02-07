const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();

async function search(req,res) {
    try{
        const uname = req.body.uname.toLowerCase()
        const myId = await sessionChecker(req.cookies.session)
        if(myId.err == -1){
            res.status(200).json({
                err:"invalid session"
            })
        }
        else{
            const list =  await prisma.student.findMany({
                where:{
                    uname:{
                        startsWith: uname
                    }
                }
            })
            res.status(200).json({
                msg:"successful",
                data:list
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err:"internal error"
        })
    }
}
module.exports = {
    search
} 