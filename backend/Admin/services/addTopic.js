const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function addTopic(req,res) {
    console.log("start")
    try{
        await prisma.topics.create({
            data:{
                name:req.body.title,
                description:req.body.description
            }
        })
        console.log("success")
        res.status(200).json({
            msg:"Successful"
        })
    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error... try again..."
        })
    }
    
}

module.exports = {
    addTopic
}