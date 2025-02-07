const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();


async function login(req,res) {
    console.log("login request - ",req.body);
    try{
        const student = await prisma.student.findFirst({
            where:{
                rno:req.body.rno
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
                const utc = new Date();
                const now = new Date(utc.getTime()+5.5*60*60*1000);
                const exp = new Date(now.getTime()+60*60*1000);
                const session = hashGenerator(student.uname)
                
                const removeIfExists = await prisma.session.deleteMany({
                    where:{
                        studentId: student.id
                    }
                })
                const addSession =  await prisma.session.create({
                    data:{
                        studentId:student.id,
                        expiry: exp,
                        session: session
                    }
                }) 
                
                res.status(200).json({
                    msg:"Success",
                    session:session
                })
            }
        }
       
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