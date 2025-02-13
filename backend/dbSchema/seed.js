const { PrismaClient } = require('./generated');
const prisma = new PrismaClient();

async function main() {
//     // Insert students
//     // await prisma.student.createMany({
//     //     data: [
//     //         { name: 'Prasanth', rno: '220701201', uname: 'Prasanth', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' },
//     //         { name: 'Rakul', rno: '220701216', uname: 'Rakul', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' },
//     //         { name: 'Shanto', rno: '220701263', uname: 'Shanto', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' }
//     //     ]
//     // });

//     // console.log('Students inserted successfully');

//     // Insert topics
//     // await prisma.topics.createMany({
//     //     data: [
//     //         { name: 'Basic_Math', contestDate: new Date() },
//     //         { name: 'For_Loop', contestDate: new Date() }
//     //     ]
//     // });

//     // console.log('Topics inserted successfully');

//     // Fetch topics
//     // const topics = await prisma.topics.findMany({ select: { id: true, name: true } });
//     // const topicMap = Object.fromEntries(topics.map(t => [t.name, t.id]));

//     // Insert contests
//     const today = new Date();
//     const opensOn = new Date(today.setHours(10, 0, 0, 0)); // Today 10 AM
//     const closesOn = new Date(today.setHours(23, 0, 0, 0)); // Today 11 PM
    const utc = new Date();
    const now = new Date(utc.getTime()+12.5*60*60*1000);
    await prisma.contest.updateMany({
        data:{
            closesOn:now
        }
    })

//     // await prisma.contest.createMany({
//     //     data: [
//     //         { title: 'Basic_Math', topicId: topicMap['Basic_Math'], opensOn,closesOn,timeToSolveInMinutes:45 , totalNoOfQuestions:2 ,totalPoints:40 },
//     //         { title: 'For_Loop', topicId: topicMap['For_Loop'], opensOn, closesOn ,timeToSolveInMinutes:45,totalNoOfQuestions:2,totalPoints:40}
//     //     ]
//     // });

//     // console.log('Contests inserted successfully');

//     // Fetch questions

//     const topics = await prisma.topics.findMany({ select: { id: true, name: true } });
//     const topicMap = Object.fromEntries(topics.map(t => [t.name, t.id]));

//     const contests = await prisma.contest.findMany({ select: { id: true, title: true } });
//     const contestMap = Object.fromEntries(contests.map(t => [t.title, t.id]));

//     // Insert questions
//     // const questions = await prisma.questions.createMany({
//     //     data: [
//     //         { title: 'Add2No', description: 'Add two numbers', topic: topicMap['Basic_Math'], type: 'PRACTICE', pointsPerTestCaseSolved:2,timeToSolveInMinutes:20 },
//     //         { title: 'Sub2No', description: 'Subtract two numbers', topic: topicMap['Basic_Math'], type: 'PRACTICE' ,pointsPerTestCaseSolved:2,timeToSolveInMinutes:20},
//     //         { title: 'Mul2No', description: 'Multiply two numbers', topic: topicMap['Basic_Math'], type: 'CONTEST' ,pointsPerTestCaseSolved:2,timeToSolveInMinutes:20,contestId: contestMap['Basic_Math']},
//     //         { title: 'Div2No', description: 'Divide two numbers', topic: topicMap['Basic_Math'], type: 'CONTEST',pointsPerTestCaseSolved:2,timeToSolveInMinutes:20 ,contestId: contestMap['Basic_Math']},
//     //         { title: 'SumOfArr', description: 'Find sum of an array', topic: topicMap['For_Loop'], type: 'PRACTICE',pointsPerTestCaseSolved:2,timeToSolveInMinutes:20 },
//     //         { title: 'MaxOfArr', description: 'Find max of an array', topic: topicMap['For_Loop'], type: 'PRACTICE' ,pointsPerTestCaseSolved:2,timeToSolveInMinutes:20},
//     //         { title: 'AvgOfArr', description: 'Find average of an array', topic: topicMap['For_Loop'], type: 'CONTEST' ,pointsPerTestCaseSolved:2,timeToSolveInMinutes:20,contestId: contestMap['For_Loop']},
//     //         { title: 'MinOfArr', description: 'Find min of an array', topic: topicMap['For_Loop'], type: 'CONTEST' ,pointsPerTestCaseSolved:2,timeToSolveInMinutes:20,contestId: contestMap['For_Loop']}
//     //     ]
//     // });

//     // console.log('Questions inserted successfully');

//     const questionList = await prisma.questions.findMany({ select: { id: true, title: true } });
//     const questionMap = Object.fromEntries(questionList.map(q => [q.title, q.id]));

//     // Insert test cases
//     // const testCases = [
//     //     { title: 'Add2No', cases: ['3 10 13', '2 5 7', '4 8 12', '6 9 15', '10 20 30'] },
//     //     { title: 'Sub2No', cases: ['10 3 7', '8 2 6', '15 4 11', '20 5 15', '25 10 15'] },
//     //     { title: 'Mul2No', cases: ['3 10 30', '2 5 10', '4 8 32', '6 9 54', '10 20 200'] },
//     //     { title: 'Div2No', cases: ['10 2 5', '8 2 4', '15 3 5', '20 4 5', '25 5 5'] },
//     //     { title: 'SumOfArr', cases: ['3 1 2 3 6', '5 10 10 20 30 20 90', '4 5 5 5 5 20', '6 1 2 3 4 5 6 21', '2 100 200 300'] },
//     //     { title: 'MaxOfArr', cases: ['3 1 2 3 3', '5 10 10 20 30 20 30', '4 5 5 5 5 5', '6 1 2 3 4 5 6 6', '2 100 200 200'] },
//     //     { title: 'AvgOfArr', cases: ['3 1 2 3 2', '5 10 10 20 30 20 18', '4 5 5 5 5 5', '6 1 2 3 4 5 6 3', '2 100 200 150'] },
//     //     { title: 'MinOfArr', cases: ['3 1 2 3 1', '5 10 10 20 30 20 10', '4 5 5 5 5 5', '6 1 2 3 4 5 6 1', '2 100 200 100'] }
//     // ];

//     // const testCaseData = testCases.flatMap(({ title, cases }) =>
//     //     cases.map((testCase, index) => ({
//     //         questionId: questionMap[title],
//     //         inputString: testCase.split(' ').slice(0, -1).join(' '),
//     //         outputString: testCase.split(' ').slice(-1)[0],
//     //         type:index==1?"OPEN1":index==2?"OPEN2":"HIDDEN"
//     //     }))
//     // );

//     // await prisma.testCase.createMany({ data: testCaseData });

//     // console.log('Test cases inserted successfully');


//     const boilerplates = [
//         {
//             question: "Add2No",
//             c: { toUser: "int add(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint add(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", add(a, b)); }" },
//             java: { toUser: "static class Solution { static int add(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.add(a, b)); } }" },
//             python: { toUser: "def add(n1, n2):\n    # write code here", main: "def add(n1, n2): return n1 + n2\n\na = int(input())\nb = int(input())\nprint(add(a, b))" },
//             cpp: { toUser: "int add(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint add(int, int);\nint main() { int a, b; cin >> a >> b; cout << add(a, b); }" }
//         },
//         {
//             question: "Sub2No",
//             c: { toUser: "int sub(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint sub(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", sub(a, b)); }" },
//             java: { toUser: "static class Solution { static int sub(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.sub(a, b)); } }" },
//             python: { toUser: "def sub(n1, n2):\n    # write code here", main: "def sub(n1, n2): return n1 - n2\n\na = int(input())\nb = int(input())\nprint(sub(a, b))" },
//             cpp: { toUser: "int sub(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint sub(int, int);\nint main() { int a, b; cin >> a >> b; cout << sub(a, b); }" }
//         },
//         {
//             question: "SumOfArr",
//             c: { toUser: "int sum(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint sum(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", sum(arr, n)); }" },
//             java: { toUser: "static class Solution { static int sum(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.sum(arr)); } }" },
//             python: { toUser: "def sum(arr):\n    # write code here", main: "def sum(arr): return sum(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))" },
//             cpp: { toUser: "int sum(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint sum(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << sum(arr, n); }" }
//         }
//     ];
    
//     // To insert into Prisma
//     // const formattedData = boilerplates.map(q => ({
//     //     questionId: questionMap[q.question],
//     //     c: JSON.stringify(q.c.main),
//     //     java: JSON.stringify(q.java.main),
//     //     python: JSON.stringify(q.python.main),
//     //     cpp: JSON.stringify(q.cpp.main),
//     //     type:"MAIN"
//     // }));
    
//     // await prisma.boilerPlate.createMany({ data: formattedData });
    
//     // console.log("Boilerplates inserted successfully");

    

//     const extraBoilerplates = [
//         {
//             question: "Mul2No",
//             c: { toUser: "int mul(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint mul(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", mul(a, b)); }" },
//             java: { toUser: "static class Solution { static int mul(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.mul(a, b)); } }" },
//             python: { toUser: "def mul(n1, n2):\n    # write code here", main: "def mul(n1, n2): return n1 * n2\n\na = int(input())\nb = int(input())\nprint(mul(a, b))" },
//             cpp: { toUser: "int mul(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint mul(int, int);\nint main() { int a, b; cin >> a >> b; cout << mul(a, b); }" }
//         },
//         {
//             question: "Div2No",
//             c: { toUser: "int div(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint div(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", div(a, b)); }" },
//             java: { toUser: "static class Solution { static int div(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.div(a, b)); } }" },
//             python: { toUser: "def div(n1, n2):\n    # write code here", main: "def div(n1, n2): return n1 / n2\n\na = int(input())\nb = int(input())\nprint(div(a, b))" },
//             cpp: { toUser: "int div(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint div(int, int);\nint main() { int a, b; cin >> a >> b; cout << div(a, b); }" }
//         },
//         {
//             question: "MinOfArr",
//             c: { toUser: "int min(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint min(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", min(arr, n)); }" },
//             java: { toUser: "static class Solution { static int min(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.min(arr)); } }" },
//             python: { toUser: "def min(arr):\n    # write code here", main: "def min(arr): return min(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(min(arr))" },
//             cpp: { toUser: "int min(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint min(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << min(arr, n); }" }
//         },
//         {
//             question: "MaxOfArr",
//             c: { toUser: "int max(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint max(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", max(arr, n)); }" },
//             java: { toUser: "static class Solution { static int max(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.max(arr)); } }" },
//             python: { toUser: "def max(arr):\n    # write code here", main: "def max(arr): return max(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))" },
//             cpp: { toUser: "int max(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint max(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << max(arr, n); }" }
//         },
//         {
//             question: "AvgOfArr",
//             c: { toUser: "float avg(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nfloat avg(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%.2f\", avg(arr, n)); }" },
//             java: { toUser: "static class Solution { static float avg(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(String.format(\"%.2f\", Solution.avg(arr))); } }" },
//             python: { toUser: "def avg(arr):\n    # write code here", main: "def avg(arr): return sum(arr) / len(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(f\"{avg(arr):.2f}\")" },
//             cpp: { toUser: "float avg(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nfloat avg(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << fixed << setprecision(2) << avg(arr, n); }" }
//         }
//     ];
    
//     // To insert into Prisma
//     const formattedExtraData = extraBoilerplates.map(q => ({
//         questionId: questionMap[q.question],
//         c: JSON.stringify(q.c.main),
//         java: JSON.stringify(q.java.main),
//         python: JSON.stringify(q.python.main),
//         cpp: JSON.stringify(q.cpp.main),
//         type:"MAIN"
//     }));
    
//     await prisma.boilerPlate.createMany({ data: formattedExtraData });
    
//     console.log("Additional Boilerplates inserted successfully");
    
}


main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
