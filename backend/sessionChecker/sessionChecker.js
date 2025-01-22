const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(sessionId) {
    const session = await prisma.session.findFirst({
        where:{
                session:sessionId
        }
    })
    if(session){
        return session.studentId;
    }
    else{
        return -1;
    }
}
module.exports = {
    sessionChecker
}