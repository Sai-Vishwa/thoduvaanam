const { PrismaClient } = require("../../dbSchema/generated");

const prisma = new PrismaClient();
async function mySubmissions(req,res) {
    try{
        
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}
module.exports = {
    mySubmissions
}