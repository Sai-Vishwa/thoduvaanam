const { PrismaClient } = require("../../dbSchema/generated");

const prisma = new PrismaClient();
async function update(req,res) {
    try{
        const upd = await prisma.student.update({
            where:{
                id:req.body.id
            },
            data:req.body.data
        })
        res.status(200).json({
            msg:"Successfully updated"
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"Internal error cannot update"
        })
    }
}

module.exports = {
     update
}