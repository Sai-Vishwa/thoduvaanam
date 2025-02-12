const file = require('fs');
const { PrismaClient } = require('../../dbSchema/generated');
const { pcopy } = require('./pcopy');
const { prun } = require('./prun');
const prisma = new PrismaClient();

async function PythonMain(allData) {
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
        const cp = await pcopy(allData, fileName);
        if (cp == -1) {
            return { status: -1, err: "File copy error" };
        }

        let count = 0;
        let op1 = "", op2 = "";
        
        const resArr = await Promise.all(
            testCases.map(async (testcase) => {
                const runOP = await prun(fileName, testcase.inputString, testcase.outputString);
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
    const ans = await PythonMain({qId:23,submissionId:201 ,lang:"py" , 
        code:`
a = eval(input())
s=0
for i in a:
        s+=int(i)
print(s)` });
    console.log(ans);
}

caller();