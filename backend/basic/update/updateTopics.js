const { PrismaClient } = require( "../../dbSchema/generated")

const prisma = new PrismaClient();
async function updateTopics(req,res) {
    try{
        let data = req.body.data
        let topicArr = []
        let questionArr = []
        let testCaseArr = []
        let contestArr = []
        let updatedTopicJson = {}
        let updatedQuestionJson = {}
        let updatedContestJson = {}
        const topicNameDelArr = req.body.topicNameDelArr;
        const questionTitleDelArr = req.body.questionTitleDelArr;
        const testCaseIdDelArr = req.body.testCaseIdDelArr;


        
        data.map((topic)=>{
            let dummy = JSON.parse(JSON.stringify(topic))
            delete dummy.question
            delete dummy.id
            delete dummy.contest
            topicArr.push(dummy)
        })

        data.map((topic)=>{
            contestArr.push(topic.contest)
        })

        await Promise.all(
            contestArr.map(async(cont) =>{
                const d3 = await prisma.contest.upsert({
                    where:{title:cont.title},
                    update:cont,
                    create:cont
                })
                updatedContestJson[d3.title] = d3.id
            })
        )

        await Promise.all(
            topicArr.map(async (topic) =>{
                const d = await prisma.topics.upsert({
                    where:{
                        name:topic.name
                    },
                    update:topic,
                    create:topic
                })
                updatedTopicJson[topic.name] = d.id
            })
        )

        

        

        data.map((topic)=>{
            topic.question.map((ques)=>{
                let dummy2 = JSON.parse(JSON.stringify(ques))
                delete dummy2.id
                delete dummy2.testCase
                dummy2.topic = updatedTopicJson[topic.name]
                if(dummy2.type == "CONTEST"){
                    dummy2.contestId = updatedContestJson[topic.name]
                }
                questionArr.push(dummy2)
            })
        })

        await Promise.all(
            questionArr.map(async(ques) =>{
                const d2 = await prisma.questions.upsert({
                    where:{
                        title:ques.title
                    },  
                    update:ques,
                    create:ques
                })
                updatedQuestionJson[ques.title] = d2.id
            })
        )

        data.map((topic)=>{
            topic.question.map((ques)=>{
                ques.testCase.map((tc)=>{
                    let dummy3 = tc
                    delete dummy3.id
                    dummy3.questionId = updatedQuestionJson[ques.title]
                })
            })
        })


        await Promise.all(
            testCaseArr.map(async(tc) =>{
                const d2 = await prisma.questions.upsert({
                    where:{
                        title:ques.title
                    },
                    update:ques,
                    create:ques
                })
                updatedQuestionJson[ques.title] = d2.id
            })
        )
        

        await prisma.testCase.deleteMany({
            where:{
                id:{in:testCaseIdDelArr}
            }
        })

        await prisma.questions.deleteMany({
            where:{
                title:{in:questionTitleDelArr}
            }
        })

        await prisma.contest.deleteMany({
            where:{
                name:{in:testCaseIdDelArr}
            }
        })

        await prisma.topics.deleteMany({
            where:{
                name:{in:topicNameDelArr}
            }
        })

        res.status(200).json({
            msg:"Successful",
        })

    }
    catch(error){
        console.log(error)
        res.status(200).json({
            err:"internal error"
        })
    }
}


module.exports = {
    updateTopics
}