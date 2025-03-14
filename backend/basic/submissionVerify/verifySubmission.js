const {PrismaClient} = require("../../dbSchema/generated");
const puppeteer = require('puppeteer');
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();

async function verifySubmission(req,res) {
    console.log("im called");
    const divStr = "#qd-content > "+
            "div:nth-child(1) > "+"div:nth-child(4) > "+"div:nth-child(1) > "+"div:nth-child(1) > "
            +"div:nth-child(1) > "+"div:nth-child(2) > "+"div:nth-child(1) > "+"div:nth-child(1) > "
            +"div:nth-child(1) > "+"div:nth-child(1) > span";
    console.log(divStr)
    try{    
            const studentId = await sessionChecker(req.body.session);
            const question = await prisma.questions.findUnique({
                where:{
                    id:req.body.qid
                }
            })
            const url = "https://leetcode.com/problems/"+question.leetCodeTitle+"/submissions/"+req.body.url
            if(studentId.err==-1){
                res.status(200).json({
                    err:"Login first"
                })
            }
            else if(!url.startsWith(`https://leetcode.com/problems/${question.leetCodeTitle}/submissions/`)){
                res.status(200).json({
                    err:"Fraud ra mama ivan"
                })
            }
            else{
                console.log("function triggered")
                const browser = await puppeteer.launch({
                    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                    headless: false,
                    args:['--user-data-dir=C:\\Users\\SaivishwaramRamkumar\\AppData\\Local\\Google\\Chrome\\User Data']
                });
                console.log("browser is accessed")
                const page = await browser.newPage();
                console.log("new page created")

                
                await page.goto(url);
                console.log("webpage is opened")
                await page.waitForSelector("#qd-content");
                const status = await page.evaluate(()=>{
                    console.log("inside the eval")
                    const span = document.querySelector("#qd-content > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span");
                    console.log("div is found")
                    return span?span.textContent():"error"
                });
                const name = await page.evaluate(()=>{
                    const div = document.querySelector("#qd-content > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)");
                    return div?div.textContent():"error"
                })
                //no of tc
                if(status=="Accepted" && name.toLowerCase().trim()===req.body.name.toLowerCase().trim()){
                    //chievement 1
                    //subm 1
                    //streak
                    const achievement = await prisma.studentAchievements.update({
                        where:{
                            AND:[
                                {studentId:studentId},
                                {achievementId:34}
                            ]
                        },
                        data:{
                            count:{
                                increment: question.pointsPerTestCaseSolved * (question.noOfHiddenTestCases+question.noOfExternalTestCases)
                            }
                        }
                    })
                } 
                res.status(200).json({
                    msg:status
                })
                console.log("response is sent")
                browser.close();
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"Error verifying submission"
        })
    }
}

module.exports={
    verifySubmission
}