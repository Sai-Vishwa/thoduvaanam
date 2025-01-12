const { PrismaClient } = require('../../dbSchema/generated');

const prisma = new PrismaClient();

async function verifyOTP(req,res) {
    try{    const student = await prisma.oTPStudent.findUnique({
            where:{
                rno: req.body.rno
            }
        })
        if(!student){
            res.status(400).json({
                err:"User does not exist"
            })
        }
        const otpTime = new Date(student.expiry);
        const currTime = new Date();
        if(student["otp"]==req.body.otp && otpTime<currTime){
            const std = await prisma.student.create({
                data: {
                    name: student.name,
                    rno: student.rno,
                    uname: student.uname,
                    leetCodeName: student.leetCodeName,
                    salt: student.salt,
                    hash: student.hash,
                    leetCodeProfile: student.leetCodeProfile,
                    lastLogin: currTime
                }
            })
            res.status(200).json({
                msg:"OTP verified successfully"
            })

        }
        else if(student["otp"]!==req.body.otp){
            res.status(200).json({
                err:"OTP mismatch"
            })
        }
        else{
            res.status(200).json({
                err:"OTP time out"
            })
        }}
    catch(err){
        res.status(400).json({
            err: "Internal error"
        })
    }
}

module.exports = {
    verifyOTP
}