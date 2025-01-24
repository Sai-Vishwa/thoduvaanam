const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(sessionId) {
    const now = new Date();
    const session = await prisma.session.findFirst({
        where:{
                session:sessionId
        }
    })
    if(session){
        const expiry = new Date(session.expiry);
        if(expiry>now){
            return session.studentId;
        }
        else{
            const del = await prisma.session.delete({
                where:{
                    id:session.id
                }
            })
            return -1;
        }
    }
    else{
        return -1;
    }
}
module.exports = {
    sessionChecker
}