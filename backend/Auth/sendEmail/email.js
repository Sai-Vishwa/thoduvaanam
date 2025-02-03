const nodemailer = require("nodemailer")
require('dotenv').config()

async function SendEmail(toAddr , otp) {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_ID , 
                pass: process.env.PASSWORD
            },
        });

        const mailObject = {
            from : process.env.EMAIL_ID,
            to : toAddr , 
            subject  : "Thoduvaanam OTP",
            text: `Thanks for registering to thoduvaanam. Here is your OTP - ${otp}`
        }

        const status = await transporter.sendMail(mailObject);
        return 1;
    }
    catch (error){
        console.log(error)
        return 0;
    }
}

// async function run() {
//     const status = await SendEmail('saivishwaram.ramkumar@gmail.com','325225')
//     console.log(status)
// }
// run()

module.exports = {
    SendEmail
}