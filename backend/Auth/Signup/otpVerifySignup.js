const { PrismaClient } = require('../../dbSchema/generated');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();

async function verifyOTPforSignUp(req,res) {
    try{    
        const student = await prisma.oTPStudent.findUnique({
            where:{
                rno: req.body.rno
            }
        })
        if(!student){
            res.status(400).json({
                err:"User does not exist"
            })
        }
        else{
        const otpTime = new Date(student.expiry);
        const currTime = new Date();
        const exp = new Date(now.getTime()+60*60*1000);
        const data = {
            name: student.name,
            rno: student.rno,
            uname: student.uname,
            leetCodeName: student.leetCodeName,
            salt: student.salt,
            hash: student.hash,
            leetCodeProfile: student.leetCodeProfile,
            lastLogin: currTime,
        }
        const session = hashGenerator(student.uname)
        if(student["otp"]==req.body.otp && otpTime<currTime){
            const std = await prisma.student.create({
                data: data
            })
            const otpVerified = await prisma.oTPStudent.update({
                where:{
                    rno:student.rno
                },
                data:{
                    status:"APPROVED"
                }
            })
            const del = await prisma.session.deleteMany({
                where:{
                    uname:student.uname
                }
            })
            const ses = await prisma.session.create({
                data:{
                    uname:student.uname,
                    session:session,
                    expiry: exp
                }
            })
            res.status(200).json({
                msg:"Success",
                data: data,
                session : session
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
        }}}
    catch(error){
        console.log(error)
        res.status(400).json({
            err: "Internal error"
        })
    }
}

module.exports = {
    verifyOTPforSignUp
}