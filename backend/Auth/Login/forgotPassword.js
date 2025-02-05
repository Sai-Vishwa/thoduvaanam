const { PrismaClient } = require('../../dbSchema/generated');
const { hashChecker } = require('../hashAndOtp/hashChecker');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');
const { OtpGenerator } = require('../hashAndOtp/OtpGenerator');
const { SendEmail } = require('../sendEmail/email');

const prisma = new PrismaClient();

async function forgotPassword(req,res) {
    try{
        const student = await prisma.oTPStudent.findFirst({
            where:{
                rno:req.body.rno
            }
        });
        const student2 = await prisma.student.findFirst({
            where:{
                rno:req.body.rno
            }
        })
        if(!student || !student2){
            res.status(200).json({
                err:"Wrong user name or Rno"
            })
        }
        else{
            const otp = OtpGenerator();
            const exp = new Date(now.getTime()+60*60*1000);
            const email = SendEmail(student.rno+"@rajalakshmi.edu.in",otp);
            if(email==0){
                res.status(400).json({
                    err:"Error sending email try again"
                })
            }
            else{
                const update = await prisma.oTPStudent.update({
                    where:{
                        id:student.id
                    },
                    data:{
                        expiry:exp,
                        otp:otp,
                        status:"PENDING"
                    }
                });
                res.status(200).json({
                    msg:"Successful"
                })
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}

module.exports={
    forgotPassword
}