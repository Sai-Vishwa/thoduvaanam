const file = require('fs');
const { PrismaClient } = require('../../dbSchema/generated');
const { copy } = require('./copy');
const { compile } = require('./compile');
const { run } = require('./run');
const prisma = new PrismaClient();

async function CMain(allData) {
    try {
        const testCases = await prisma.testCase.findMany({
            where: { questionId: allData.qId }
        });

        const question = await prisma.questions.findUnique({
            where: { id: allData.qId },
            // include: {
            //     boilerPlate: {
            //         where: { language: allData.lang }
            //     }
            // }
        });

        const fileName = `Submission_${allData.submissionId}`;
        const cp = await copy(allData, fileName);
        if (cp == -1) {
            return { status: -1, err: "File copy error" };
        }

        const comp = await compile(allData, fileName);
        if (comp !== 0) {
            return { status: -1, err: comp };
        }

        let count = 0;
        let op1 = "", op2 = "";
        
        const resArr = await Promise.all(
            testCases.map(async (testcase) => {
                const runOP = await run(fileName, testcase.inputString, testcase.outputString);
                if (testcase.type === "OPEN1") op1 = runOP.op;
                if (testcase.type === "OPEN2") op2 = runOP.op;
                count += parseInt(runOP.count);
                return runOP;
            })
        );

        return {
            status: 0,
            msg: "Completed running all test cases",
            count,
            op1,
            op2,
            results: resArr
        };

    } catch (error) {
        console.log(error);
        return { status: -1, err: "Syntax error bhava" };
    }
}


async function caller() {
    const ans = await CMain({qId:23,submissionId:239 ,lang:"c" , 
        code:`#include<stdio.h>
        int main(){
            int n1,n2;
            scanf("%d",&n1);
            scanf("%d",&n2);
            printf("%d",n1+n2);
            fflush(stdout);
            return 0; 
        }` });
    console.log(ans);
}

caller();