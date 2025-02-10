const { PrismaClient } = require("../dbSchema/generated")

const prisma = new PrismaClient()
console.log("atleast here")

const autoSubmit = async () =>{
    console.log("vro i started")
        const allSubmissions = await prisma.submission.findMany({
            where:{
                status:"WAITING"
            }
        })
        const utc = new Date();
        const now = new Date(utc.getTime()+5.5*60*60*1000);
        await Promise.all(allSubmissions.map((submission)=>{
            console.log(submission)
            if(submission.maxTimeToSolve <= now){
                console.log("see i update")
                prisma.submission.update({
                    where:{
                        id:submission.id
                    },
                    data:{
                        status:"COMPLETED",
                        isFinal:"YES"
                    }
                })
            }
        }))
        console.log("I run every 2 mins and do auto submission")
}

setInterval(autoSubmit,8000)