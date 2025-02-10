const { PrismaClient } = require("../dbSchema/generated")

const prisma = new PrismaClient()
setInterval(async()=>{
    const allSubmissions = await prisma.submission.findMany({
        where:{
            status:"WAITING"
        }
    })
    const utc = new Date();
    const now = new Date(utc.getTime()+5.5*60*60*1000);
    await Promise.all(allSubmissions.map((submission)=>{
        if(submission.maxTimeToSolve <= now){
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
},1000 * 60 * 2)