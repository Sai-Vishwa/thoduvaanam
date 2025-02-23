const { PrismaClient } = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");


const prisma = new PrismaClient()
async function logout(req,res) {
    
    try{
        const session = await sessionChecker(req.body.session);
        if(session.err){
            res.status(200).json({
                err:"nee yaara login eh pannama logout panra..."
            })
            return
        }
        const del = await prisma.session.deleteMany({
            where:{
                session:req.body.session
            }
        })

        res.status(200).json({
            msg:"Logout successful"
        })
    }
    catch(error){
        console.log(error);
        res.status(200).json({
            err:"internal error... try again"
        })
    }

}

module.exports = {
    logout
}