const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();

async function verifyOTPforLogin(req,res) {
    try{
        const st = await prisma.student.findFirst({
            where:{
                rno:req.body.rno
            }
        })
        const student = await prisma.oTPStudent.findFirst({
            where:{
                rno:req.body.rno
            }
        })
        if(!student){
            res.status(200).json({
                err:"Invalid request"
            })
        }
        else{
            const utc = new Date();
            const now = new Date(utc.getTime()+5.5*60*60*1000);
            const otpExpiry = new Date(student.expiry);
            if(student.otp===req.body.otp && now<otpExpiry){
                const session = await hashGenerator(student.uname);
                const exp = new Date(now.getTime()+60*60*1000);
                const update = await prisma.oTPStudent.update({
                    where:{
                        rno:student.rno
                    },
                    data:{
                        status:"APPROVED"
                    }
                })
                const removeIfExists = await prisma.session.deleteMany({
                    where:{
                        studentId: st.id
                    }
                })
                const addSession =  await prisma.session.create({
                    data:{
                        studentId:st.id,
                        expiry: exp,
                        session: session.hash
                    }
                }) 
                
                res.status(200).json({
                    msg:"Success",
                    data:{"data":JSON.stringify(st)},
                    uname:st.uname,
                    session:session
                })
            }
            else if(student.otp === req.body.otp){
                res.status(200).json({
                    err:"Time out"
                })
            }
            else{
                res.status(200).json({
                    err:"OTP mismatch"
                })
            }
        }
    }
    catch (error){
        console.log(error);
        res.status(400).json({
            err:"Internal error"
        })
    }
}

module.exports = { 
    verifyOTPforLogin
}