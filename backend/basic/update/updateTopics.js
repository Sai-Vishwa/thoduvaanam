const { PrismaClient } = require( "../../dbSchema/generated")

const prisma = new PrismaClient();
async function updateTopics(req,res) {
    try{
        const data = req.body.data
        let topicArr = []
        let questionArr = []
        let testCaseArr = []
        
        console.log(data[2])
    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error"
        })
    }
}


module.exports = {
    updateTopics
}