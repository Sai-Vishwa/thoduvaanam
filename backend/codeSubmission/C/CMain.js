const file = require('fs')
const { PrismaClient } = require('../../dbSchema/generated');
const { exec } = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');
const { copy } = require('./copy');
const { compile } = require('./compile');
const prisma = new PrismaClient();

async function CMain(allData) {

    try{
        const testCases = await prisma.testCase.findMany({
            where:{
                questionId:allData.qId
            }
        })
        const question = await prisma.questions.findUnique({
            where:{
                id: allData.qId
            },
            include:{
                boilerPlate:{
                    where:{
                        language:allData.lang
                    }
                }
            }
        })
        const fileName = `Submission_${allData.submissionId}`;
        const success = copy(allData)
        if(success == -1){
            return {status:-1}
        }

        const comp = await compile(allData,fileName)


    }
    catch(error){
        console.log(error)
        return {status:-1}
    }

}
module.exports = {
    CMain
}