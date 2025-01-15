const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();


async function login(req,res) {
    console.log("login request - ",req.body);
    try{
        const student = await prisma.student.findFirst({
            where:{
                OR: [
                    {uname: req.body.unameOrRno},
                    {rno:req.body.unameOrRno}
                ]
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
                const now = new Date();
                const exp = new Date(now.getTime()+60*60*1000);
                const session = hashGenerator(student.uname)
                const updateLogin = prisma.student.update({
                    where:{
                        uname:student.uname
                    },
                    data:{
                        lastLogin: now
                    }
                })
                const removeIfExists = await prisma.session.deleteMany({
                    where:{
                        uname: student.uname
                    }
                })
                const addSession =  await prisma.session.create({
                    data:{
                        uname:student.uname,
                        expiry: exp,
                        session: session
                    }
                }) 
                res.status(200).json({
                    msg:"Success",
                    data:JSON.stringify(student),
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