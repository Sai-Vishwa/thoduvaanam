const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function addTopic(req,res) {
    console.log("start")
    try{
        await prisma.topics.create({
            data:{
                name:req.body.name,
                description:req.body.description
            }
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