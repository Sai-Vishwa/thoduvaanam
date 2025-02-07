import { PrismaClient } from "../../dbSchema/generated";

const prisma = new PrismaClient();

async function forceQuitSignUp(req,res) {
    const del = await prisma.oTPStudent.deleteMany({
        where:{
            rno:req.body.rno
        }
    })
    res.status(200).json({
        err:""
    })
}

module.exports = {
    forceQuitSignUp
}