const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function addTestCase(req,res) {
    console.log("start")
    try{
        let dt = req.body.data
        delete dt.id
        await prisma.testCase.create({
            data:req.body.data
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
    addTestCase
}