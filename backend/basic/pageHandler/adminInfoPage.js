const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function loadData(req,res) {
    console.log("start")
    try{
        let data = await prisma.topics.findMany({
            include:{
                question:{
                    include:{
                        testCase:{
                            
                        }
                    }
                }
            }
        })
        const data2 = await prisma.contest.findMany()

        data.map((dt)=>{
            data2.map((contest)=>{
                if(dt.name == contest.title){
                    dt.contest = contest
                }
            })
        })

        console.log("data i got",data)
        res.status(200).json({
            msg:"Successful",
            data:data,
            
        })
    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error... try again..."
        })
    }
    
}

module.exports = {
    loadData
}