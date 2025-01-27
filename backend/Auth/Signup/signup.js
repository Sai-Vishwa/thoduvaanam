const { PrismaClient } = require('../../dbSchema/generated');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');
const { OtpGenerator } = require('../hashAndOtp/OtpGenerator');
const { SendEmail } = require('../sendEmail/email');

const prisma = new PrismaClient();


async function signUp(req,res) {
    const currTime = new Date();
    const exp = new Date(currTime.getTime()+10*60*1000);
    const saltHash = await hashGenerator(req.body.password);
    if(saltHash.err){
        res.status(200).json({...saltHash})
    }
    else{
        const otp = OtpGenerator();
    try{
        const student = await prisma.oTPStudent.create({
            data:{
                name: req.body.name,
                rno: req.body.rno,
                uname: req.body.uname,
                leetCodeName: req.body.leetCodeName,
                salt: saltHash.salt,
                hash: saltHash.hash,
                leetCodeProfile: req.body.leetCodeProfile,
                otp: otp,
                expiry: exp,
                status: "PENDING"
            }
        })
        const sendEmail = SendEmail(req.body.rno+"@rajalakshmi.edu.in" , otp);
        if(sendEmail==1){
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
    
}

module.exports =  {
    signUp
}