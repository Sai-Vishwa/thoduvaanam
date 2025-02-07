const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(sessionId) {
    const now = new Date();
    const session = await prisma.session.findFirst({
        where:{
                session:sessionId
        }
    })
    const uname = await prisma.student.findFirst({
        where:{
            id:session.id
        }
    })
    if(session && uname){
        const expiry = new Date(session.expiry);
        if(expiry>now){
            return {id:session.studentId , uname:uname.uname};
        }
        else{
            const del = await prisma.session.delete({
                where:{
                    id:session.id
                }
            })
            return {err:-1};
        }
    }
    else{
        return {err:-1};
    }
}
module.exports = {
    sessionChecker
}