const { PrismaClient } = require('../../dbSchema/generated');

const prisma = new PrismaClient();


async function login(req,res) {
    try{

    }
    catch(err){
        res.status(400).json({
            err: "Internal Error"
        })
    }
}
module.exports = {
    login
}