const { PrismaClient } = require("../../dbSchema/generated")

const prisma = new PrismaClient();
async function loadData(req,res) {
    console.log("start")
    try{
        const data = await prisma.topics.findMany({
            include:{
                question:{
                    include:{
                        testCase:{
                            
                        }
                    }
                }
            }
        })
        console.log("data i got",data)
        res.status(200).json({
            msg:"Successful",
            data:data
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