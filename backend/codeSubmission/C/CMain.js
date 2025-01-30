const file = require('fs')
const { PrismaClient } = require('../../dbSchema/generated')
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
            }
        })
        const mainCode =
        `#include<stdio.h>
        #include<string.h>
        ${allData.code}
        ${}`
    }
    catch(error){
        console.log(error)
        return {status:-1}
    }

}
module.exports = {
    CMain
}