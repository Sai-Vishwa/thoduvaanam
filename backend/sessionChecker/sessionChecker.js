const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(sessionId) {
    const utc = new Date();
    const now = new Date(utc.getTime()+5.5*60*60*1000);
    console.log(sessionId)
    console.log(now)
    const session = await prisma.session.findFirst({
        where:{
                session:sessionId
        }
    })
    const uname = await prisma.student.findFirst({
        where:{
            id:session.studentId
        }
    })
    if(session && uname){
        const expiry = new Date(session.expiry);
        if(expiry>now){
            return {id:session.studentId , uname:uname.uname};
        }
        else{
            const del = await prisma.session.deleteMany({
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