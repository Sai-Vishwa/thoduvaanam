const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');

const prisma = new PrismaClient();


async function login(req,res) {
    try{
        const now = new Date();
        const student = await prisma.student.findUnique({
            where:{
                uname: req.body.unameRegno
            }
        })
        if(!student){
            res.status(200).json({
                err:"Wrong user name or reg no"
            })
        }
        else{
            const hashCheck = hashChecker(student.salt,student.hash , req.body.password );
            if(hashCheck == 0){
                res.status(200).json({
                    err: "Wrong password"
                })
            }
            else{
                res.status(200).json({
                    msg:"Success"
                })
            }
        }
        const updateLogin = prisma.student.update({
            where:{

            },
            data:{
                lastLogin: now
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err: "Internal Error"
        })
    }
}
module.exports = {
    login
}