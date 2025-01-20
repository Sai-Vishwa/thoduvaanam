const {PrismaClient} = require("../dbSchema/generated");
const prisma = new PrismaClient();
async function sessionChecker(uname , sessionId) {
    const session = await prisma.session.findFirst({
        where:{
            AND:[
                {uname:uname},
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