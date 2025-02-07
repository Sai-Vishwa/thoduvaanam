const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();

async function verifyOTPforLogin(req,res) {
    try{
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
                const session = hashGenerator(student.uname);
                const exp = new Date(now.getTime()+60*60*1000);
                const update = await prisma.oTPStudent.update({
                    where:{
                        id:student.id
                    },
                    data:{
                        status:"APPROVED"
                    }
                })
                const del = await prisma.session.deleteMany({
                    where:{
                        studentId:student.id
                    }
                })
                const ses = await prisma.session.create({
                    data:{
                        stduentId:student.id,
                        session:session,
                        expiry: exp
                    }
                })
                
                res.status(200).json({
                    msg:"Success",
                    data:{"data":JSON.stringify(student),"achievements":JSON.stringify(achieve)},
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