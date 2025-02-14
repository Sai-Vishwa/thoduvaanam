const { PrismaClient } = require('../../dbSchema/generated');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');

const prisma = new PrismaClient();

async function verifyOTPforSignUp(req,res) {
    console.log("im here haha")
    try{    
        const student = await prisma.oTPStudent.findUnique({
            where:{
                rno: req.body.rno
            }
        })
        if(!student){
            res.status(200).json({
                err:"User does not exist"
            })
        }
        else{
        const otpTime = new Date(student.expiry);
        const utc = new Date();
        const currTime = new Date(utc.getTime()+5.5*60*60*1000);
        const exp = new Date(currTime.getTime()+60*60*1000);
        const data = {
            name: student.name,
            rno: student.rno,
            uname: student.uname,
            leetCodeName: student.leetCodeName,
            salt: student.salt,
            hash: student.hash
        }
        const session = await hashGenerator(student.uname)
        if(student["otp"]==req.body.otp && currTime<exp){
            const std = await prisma.student.create({
                data: data
            })
            const otpVerified = await prisma.oTPStudent.update({
                where:{
                    id:student.id
                },
                data:{
                    status:"APPROVED"
                }
            })
            const del = await prisma.session.deleteMany({
                where:{
                    studentId:std.id
                }
            })
            const ses = await prisma.session.create({
                data:{
                    studentId:std.id,
                    session:session.hash,
                    expiry: exp
                }
            })
            const achievements = await prisma.studentAchievements.create({
                data:{
                    studentId: std.id,
                    achievementId: 34,
                    count: 0
                }
            })
            
            res.status(200).json({
                msg:"Success",
                session:session.hash,
                uname:std.uname
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
        res.status(200).json({
            err: "Internal error"
        })
    }
}

module.exports = {
    verifyOTPforSignUp
}