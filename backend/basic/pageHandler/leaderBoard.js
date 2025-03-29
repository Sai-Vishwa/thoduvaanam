const { PrismaClient } = require("../../dbSchema/generated");

const prisma =  new PrismaClient();

async function leaderBoard(req,res) {
    console.log("Vanakkam da dei")
    try{
        const details = await prisma.submission.findMany({
            include:{
                questions:{
                    include:{
                        contest:true
                    }
                }
            }
        })
        console.log(details)
        res.status(200).json({
            msg:"Successful"
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"internal error"
        })
    }
}

module.exports = {
    leaderBoard
}