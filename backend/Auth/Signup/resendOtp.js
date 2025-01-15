const { PrismaClient } = require('../../dbSchema/generated');
const { OtpGenerator } = require('../hashAndOtp/OtpGenerator');
const { SendEmail } = require('../sendEmail/email');

const prisma = new PrismaClient();

async function resendOtp(req,rse) {
    const currTime = new Date();
    const exp = new Date(currTime.getTime()+10*60*1000);
    const otp = OtpGenerator();
    try{    const student = await prisma.oTPStudent.update({
            where: {
                rno: req.body.rno
            },
            data:{
                otp:otp,
                expiry:exp
            }
        })
        const send = await SendEmail(req.body.rno+"@rajalakshmi.edu.in" , otp)
        if(send==1){
            res.status(200).json({
                msg:"OTP is resent successfully"
            })
        }
        else{
            res.status(200).json({
                err: "Error in sending email"
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            err:"Internal error"
        })
    }
}
module.exports = {
    resendOtp
}