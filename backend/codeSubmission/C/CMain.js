const file = require('fs')
const { PrismaClient } = require('../../dbSchema/generated');
const { exec } = require('child_process');
const { error } = require('console');
const { stdout, stderr } = require('process');
const { copy } = require('./copy');
const { compile } = require('./compile');
const { run } = require('./run');
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
        const success = copy(allData,fileName)
        if(success == -1){
            return {status:-1}
        }

        const comp = compile(allData,fileName)
        if(comp==-1){
            return {status:-1}
        }
        let count = 0, op1 = "",op2 =""
        testCases.forEach(testcase =>{
            const result = run(fileName,testcase.inputString,testcase.outputString);
            count += parseInt(result.count)
            if(testcase.type == "OPEN1"){
                op1 = result.op
            }
            else if(testcase.type == "OPEN2"){
                op2 = result.op
            }
        })
        const upd = await prisma.submission.update({
            where:{
                id:allData.submissionId
            },
            data:{
                code:allData.code
            }
        })
    }
    catch(error){
        console.log(error)
        return {status:-1}
    }

}
module.exports = {
    CMain
}