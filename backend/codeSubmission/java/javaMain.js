const file = require('fs');
const { PrismaClient } = require('../../dbSchema/generated');
const { jcopy } = require('./jcopy');
const { jrun } = require('./jrun');
const prisma = new PrismaClient();

async function JavaMain(allData) {
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
        const cp = await jcopy(allData, fileName);
        if (cp == -1) {
            return { status: -1, err: "File copy error" };
        }

        let count = 0;
        let op1 = "", op2 = "";
        
        const resArr = await Promise.all(
            testCases.map(async (testcase) => {
                const runOP = await jrun(fileName, testcase.inputString, testcase.outputString);
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
    const ans = await JavaMain({qId:23,submissionId:239 ,lang:"java" , 
        code:`
        import java.util.Scanner;
        public class Main{
            public static void main(String[] args){
                Scanner s = new Scanner(System.in);
                int n = s.nextInt();
                System.out.println(n);
                s.close();
            }
        }` });
    console.log(ans);
}

caller();

module.exports = {
    JavaMain
}