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
            hash: student.hash,
            leetCodeProfile: student.leetCodeProfile,
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
                    studentId:student.id
                }
            })
            const ses = await prisma.session.create({
                data:{
                    studentId:student.id,
                    session:session.hash,
                    expiry: exp
                }
            })
            const achievements = await prisma.studentAchievements.createMany({
                data:[{
                    studentId: student.id,
                    achievementId: 1,
                    count: 0
                },{
                    studentId: student.id,
                    achievementId: 2,
                    count: 0
                },{
                    studentId: student.id,
                    achievementId: 3,
                    count: 0
                },{
                    studentId: student.id,
                    achievementId: 4,
                    count: 0
                },{
                    studentId: student.id,
                    achievementId: 5,
                    count: 0
                },{
                    studentId: student.id,
                    achievementId: 6,
                    count: 0
                },]
            })
            
            res.status(200).json({
                msg:"Success",
                data:{"data":JSON.stringify(student),"achievements":JSON.stringify(achieve)},
                session:session
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