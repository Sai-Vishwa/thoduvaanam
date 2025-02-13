const file = require('fs');
const { PrismaClient } = require('../../dbSchema/generated');
const { cppCopy } = require('./cppCopy');
const { cppCompile } = require('./cppCompile');
const { cppRun } = require('./cppRun');
const prisma = new PrismaClient();

async function cppMain(allData) {
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
        const cp = await cppCopy(allData, fileName);
        if (cp == -1) {
            return { status: -1, err: "File copy error" };
        }

        const comp = await cppCompile(allData, fileName);
        if (comp !== 0) {
            return { status: -1, err: comp };
        }

        let count = 0;
        let op1 = "", op2 = "";
        
        const resArr = await Promise.all(
            testCases.map(async (testcase) => {
                const runOP = await cppRun(fileName, testcase.inputString, testcase.outputString);
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
    const n = "\n";
    const ans = await cppMain({qId:23,submissionId:239 ,lang:"cpp" , 
        code:`
        #include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
 
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
    }

    cout << "Sum: " << sum << endl;
    return 0;
}

        ` });
    console.log(ans);
}


module.exports = {
    cppMain
}
// caller();