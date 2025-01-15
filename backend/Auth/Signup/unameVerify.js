const { PrismaClient } = require('../../dbSchema/generated');
const prisma = new PrismaClient();

async function unameVerify(req,res) {
    try{
        const user = await prisma.student.findFirst({
            where:{
                uname:req.body.uname
            }
        })
        const user2 = await prisma.oTPStudent.findFirst({
            where:{
                uname: req.body.uname
            }
        })
        if(!user && !user2){
            res.status(200).json({
                msg:"Accepted"
            })
        }
        else{
            res.status(200).json({
                err:"Taken"
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err:"Internal error"
        })
    }
}
module.exports =  {
    unameVerify
}