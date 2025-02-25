const { PrismaClient } = require( "../../dbSchema/generated")

const prisma = new PrismaClient();
async function updateTopics(req,res) {
    try{
        let data = req.body.data
        let topicArr = []
        let questionArr = []
        let testCaseArr = []
        let updatedTopicJson = {}
        let updatedQuestionJson = {}

        
        data.map((topic)=>{
            let dummy = topic
            delete dummy.question
            delete dummy.id
            topicArr.push(dummy)
        })

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
                let dummy2 = ques
                delete dummy2.id
                delete dummy2.testCase
                dummy2.topic = updatedTopicJson[topic.name]
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