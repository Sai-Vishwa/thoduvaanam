const {PrismaClient} = require("../../dbSchema/generated");
const { sessionChecker } = require("../../sessionChecker/sessionChecker");
const prisma = new PrismaClient();
async function homePage(req,res) {
    try{
        console.log("vanakkam")
        let viewMode = true
        let searchid
        console.log(req.body.session)
        const studentId = await sessionChecker(req.body.session)
        if(studentId.err){
            res.status(200).json({
                err:"Invlaid session"
            })
        }
        else{
            if(studentId.uname == req.body.uname){
                viewMode = false
                searchid = studentId.id
            }
            else{
                const search = await prisma.student.findFirst({
                    where:{
                        uname:req.body.uname
                    }
                })
                searchid = search.id
            }
            const data = await prisma.topics.findMany({
                select:{
                    id:true,
                    name:true,
                    question:{
                        select:{
                            id:true,
                            title:true,
                            difficulty:true,
                            type:true,
                        },
                        where:{
                            type:"PRACTICE"
                        }
                    }
                }
            });

            let e=0,b=0,i=0,h=0;

            data.map((topic)=>{
                topic.question.map((q)=>{
                    if(q.difficulty=="BALANCED"){
                        b+=1
                    }
                    else if(q.difficulty=="EASY"){
                        e+=1
                    }
                    else if(q.difficulty=="HELL"){
                        h+=1
                    }
                    else{
                        i+=1
                    }
                })
            })

            let data2 = {...data , "totalQuestions":b+e+h+i ,"easyQuestions":e,"balancedQuestions":b,"intenseQuestions":i,"hellQuestions":h}

            const myData = await prisma.student.findFirst({
                where:{
                    id:searchid
                },
                select:{
                    name:true,
                    rno:true,
                    uname:true,
                    leetCodeName:true,
                    studentAchievements:{
                        select:{
                            count:true,
                            achievements:{
                                select:{
                                    title:true
                                }
                            }
                        }
                    }
                }
            })
            const rank = await prisma.achievements.findFirst({
                where:{
                    title:"totalPoints"
                },
                select:{
                    studentAchievements:{
                        select:{
                            count:true,
                            studentId:true,
                        },
                        orderBy:{
                            count:"desc"
                        }
                    }
                },

            })
            let rc = 1
            let count =0
            let flag = false
            let prev = rank.studentAchievements[0].count
            rank.studentAchievements.map((std , index)=>{
            
                if(std.studentId == searchid){
                    flag = true
                }
                else{
                    if(!flag){
                        if(prev ==  std.count && index>0){
                            count+=1
                        }
                        else if(index>0){
                            rc = rc + count + 1
                        }
                    }
                }
            })
            

            const contests = await prisma.contest.findMany()

            let myData2 = {...myData}


            myData.studentAchievements.map((ac)=>{
                myData2[ac.achievements.title] = ac.count
            })
            console.log("hii")
            console.log(contests)
            res.status(200).json({
                msg:"Success",
                data:data2,
                myData:myData2,
                viewMode: viewMode,
                rank:rc,
                totalRank:rank.studentAchievements.length,
                contests:contests
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            err:"Internal error"
        })
    }
}

module.exports = {
    homePage
}