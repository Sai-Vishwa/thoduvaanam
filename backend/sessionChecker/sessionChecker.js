const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(id , sessionId) {
    const session = await prisma.session.findFirst({
        where:{
            AND:[
                {studentId:id},
                {session:sessionId}
            ]
        }
    })
    if(session){
        return 1;
    }
    else{
        return 0;
    }
}
module.exports = {
    sessionChecker
}