const { PrismaClient } = require('./generated');
const prisma = new PrismaClient();

async function main() {


    // await prisma.achievements.createMany({
    //     data:[
    //         {
    //             title:"totalPoints",
    //             description:"This achievement holds the total points secured by a student"
    //         },
    //         {
    //             title:"totalQuestionsSolved",
    //             description:"This achievement holds the total no. of successful correct submissions made by a user"
    //         },
    //         {
    //             title:"totalContestsParticipated",
    //             description:"This achievement holds the total no. of contests the student participated"
    //         }
    //     ]
    // })

    await prisma.studentAchievements.createMany({
        data:[
            {
                count:0,
                achievementId:1,
                studentId:1
            },
            {
                studentId:1,
                achievementId:2,
                count:0
            },
            {
                count:0,
                achievementId:3,
                studentId:1
            }
        ]
    })
    
    //Insert students
    // await prisma.student.create({
    //     data: 
    //         { name: 'Senior', rno: '220701250', uname: 'Senior', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' }
    // //         // { name: 'Rakul', rno: '220701216', uname: 'Rakul', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' },
    // //         // { name: 'Shanto', rno: '220701263', uname: 'Shanto', hash: '$2b$10$628gZrGWquCWwtrTsU2CwOfBOjhivNByuthyt8BdfNP5naBQ9mI2y', salt: '$2b$10$628gZrGWquCWwtrTsU2CwO' }
        
    // });

//     // console.log('Students inserted successfully');

    // // Insert topics
    // const tomorrow830AM = new Date();
    // tomorrow830AM.setDate(tomorrow830AM.getDate() + 1);
    // tomorrow830AM.setHours(14, 0, 0, 0);
    // const now1 = new Date()

    // await prisma.topics.createMany({
    //     data: [
    //         { name: 'Aadukalam_Round_2', contestDate: tomorrow830AM},
    //         { name: 'sample_test' , contestDate:now1}
    //     ]
    // });

//     // console.log('Topics inserted successfully');

    // Fetch topics
    // const topics = await prisma.topics.findMany({ select: { id: true, name: true } });
    // const topicMap = Object.fromEntries(topics.map(t => [t.name, t.id]));

//     // Insert contests
    // const today = new Date();
    // const opensOn1 = new Date(today.setHours(14, 0, 0, 0)); // Today 10 AM
    // const closesOn1 = new Date(today.setHours(15,30, 0, 0)); // Today 11 PM

    // const opensOn2 = new Date(); // Today 10 AM
    // const closesOn2 = new Date(today.setHours(22,30, 0, 0)); // Today 11 PM
    

    // await prisma.contest.createMany({
    //     data: [
    //         { title: 'Aadukalam_Round_2', topicId: topicMap['Aadukalam_Round_2'],opensOn: opensOn1,closesOn:closesOn1,timeToSolveInMinutes:90 , totalNoOfQuestions:3 ,totalPoints:120 },
    //         { title: 'sample_test', topicId: topicMap['sample_test'], opensOn:opensOn2,closesOn: closesOn2 ,timeToSolveInMinutes:90,totalNoOfQuestions:3,totalPoints:120}
    //     ]
    // });

    // const utc = new Date();
    // const now = new Date(utc.getTime()+12.5*60*60*1000);
    // await prisma.contest.updateMany({
    //     data:{
    //         closesOn:now
    //     }
    // })

// //     // console.log('Contests inserted successfully');

// //     // Fetch questions

    // const topics = await prisma.topics.findMany({ select: { id: true, name: true } });
    // const topicMap = Object.fromEntries(topics.map(t => [t.name, t.id]));

    // const contests = await prisma.contest.findMany({ select: { id: true, title: true } });
    // const contestMap = Object.fromEntries(contests.map(t => [t.title, t.id]));

//     // Insert questions
//     const questions = await prisma.questions.createMany({
//         data: [
//             { title: 'Game-1', description: `Alice and Bob are playing a game. There are n (n is even) integers written on a blackboard, represented by x1,x2,…,xn. There is also a given integer k and an integer score that is initially 0. The game lasts for n2 turns, in which the following events happen sequentially:

// Alice selects an integer from the blackboard and erases it. Let's call Alice's chosen integer a.
// Bob selects an integer from the blackboard and erases it. Let's call Bob's chosen integer b.
// If a+b=k, add 1 to score.
// Alice is playing to minimize the score while Bob is playing to maximize the score. Assuming both players use optimal strategies, what is the score after the game ends?

// Input

// The first line of each test case contains two integers n and k (2≤n≤2⋅105,1≤k≤2⋅n, n is even).

// The second line of each test case contains n integers x1,x2,…,xn (1≤xi≤n) — the integers on the blackboard.

// It is guaranteed that the sum of n over all test cases does not exceed 2⋅105.

// Output
// For each test case, output the score if both players play optimally.

// Input:


// 4 4
// 1 2 3 2

// 8 15
// 1 2 3 4 5 6 7 8

// 6 1
// 1 1 1 1 1 1

// 16 9
// 3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3

// Output 

// 2

// 1

// 0

// 4
// `, topic: topicMap["sample_test"], type:"PRACTICE", pointsPerTestCaseSolved:5,timeToSolveInMinutes:90,  },
// { title: 'Game-2', description: `Alice and Bob are playing a game. There are n (n is even) integers written on a blackboard, represented by x1,x2,…,xn. There is also a given integer k and an integer score that is initially 0. The game lasts for n2 turns, in which the following events happen sequentially:

//     Alice selects an integer from the blackboard and erases it. Let's call Alice's chosen integer a.
//     Bob selects an integer from the blackboard and erases it. Let's call Bob's chosen integer b.
//     If a+b=k, add 1 to score.
//     Alice is playing to minimize the score while Bob is playing to maximize the score. Assuming both players use optimal strategies, what is the score after the game ends?
    
//     Input
    
//     The first line of each test case contains two integers n and k (2≤n≤2⋅105,1≤k≤2⋅n, n is even).
    
//     The second line of each test case contains n integers x1,x2,…,xn (1≤xi≤n) — the integers on the blackboard.
    
//     It is guaranteed that the sum of n over all test cases does not exceed 2⋅105.
    
//     Output
//     For each test case, output the score if both players play optimally.
    
//     Input:
    
    
//     4 4
//     1 2 3 2
    
//     8 15
//     1 2 3 4 5 6 7 8
    
//     6 1
//     1 1 1 1 1 1
    
//     16 9
//     3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3
    
//     Output 
    
//     2
    
//     1
    
//     0
    
//     4
//     `, topic: topicMap["Aadukalam_Round_2"], type:"PRACTICE", pointsPerTestCaseSolved:5,timeToSolveInMinutes:90,},
//     { title: 'Direction-1', description: `You are given a list of spatial rules describing the relative positions of points in a 2D plane. Each rule follows the format:

// A <direction> B

// A and B are distinct points.
// <direction> is one of:
// N (North) → A is north of B
// S (South) → A is south of B
// E (East) → A is east of B
// W (West) → A is west of B
// NE (Northeast) → A is northeast of B
// NW (Northwest) → A is northwest of B
// SE (Southeast) → A is southeast of B
// SW (Southwest) → A is southwest of B

// Determine whether the given rules are consistent (i.e., there are no contradictions).
// If a contradiction is found, return the 1-based index of the first rule that causes the inconsistency.

// If all rules are consistent, return -1.

// Example
// Input:

// rules = ["A NE B", "B NE C", "C S A"]
// Explanation:
// "A NE B" → A is Northeast of B
// "B NE C" → B is Northeast of C
// "C S A" → C is South of A (Contradiction!)
// A was placed Northeast of B, which was Northeast of C.
// But C is given as South of A, which contradicts A NE B and B NE C.

// Output:

// 3


// TestCase 1:

// rules = ["A N B", "B N C", "C N D"]

// Output: -1


// TestCase 2:

// rules = ["A N B", "B N C", "C N D"]
// Otupt

// 2

// testcase:

// reules = ["A NE B", "B NE C", "C S A"]

// Output: 3

// TestCase:

// rules = ["A NW B", "B SW C", "C SE D", "D NE A"]

// Output: 4

// TestCase

// rules = ["X E Y", "Y E Z", "Z N W", "W W X"]

// Otuput: -1`, topic: topicMap['sample_test'], type: 'PRACTICE' ,pointsPerTestCaseSolved:5,timeToSolveInMinutes:90,},
// { title: 'Direction-2', description: `You are given a list of spatial rules describing the relative positions of points in a 2D plane. Each rule follows the format:

//     A <direction> B
    
//     A and B are distinct points.
//     <direction> is one of:
//     N (North) → A is north of B
//     S (South) → A is south of B
//     E (East) → A is east of B
//     W (West) → A is west of B
//     NE (Northeast) → A is northeast of B
//     NW (Northwest) → A is northwest of B
//     SE (Southeast) → A is southeast of B
//     SW (Southwest) → A is southwest of B
    
//     Determine whether the given rules are consistent (i.e., there are no contradictions).
//     If a contradiction is found, return the 1-based index of the first rule that causes the inconsistency.
    
//     If all rules are consistent, return -1.
    
//     Example
//     Input:
    
//     rules = ["A NE B", "B NE C", "C S A"]
//     Explanation:
//     "A NE B" → A is Northeast of B
//     "B NE C" → B is Northeast of C
//     "C S A" → C is South of A (Contradiction!)
//     A was placed Northeast of B, which was Northeast of C.
//     But C is given as South of A, which contradicts A NE B and B NE C.
    
//     Output:
    
//     3
    
    
//     TestCase 1:
    
//     rules = ["A N B", "B N C", "C N D"]
    
//     Output: -1
    
    
//     TestCase 2:
    
//     rules = ["A N B", "B N C", "C N D"]
//     Otupt
    
//     2
    
//     testcase:
    
//     reules = ["A NE B", "B NE C", "C S A"]
    
//     Output: 3
    
//     TestCase:
    
//     rules = ["A NW B", "B SW C", "C SE D", "D NE A"]
    
//     Output: 4
    
//     TestCase
    
//     rules = ["X E Y", "Y E Z", "Z N W", "W W X"]
    
//     Otuput: -1`, topic: topicMap['Aadukalam_Round_2'], type: 'PRACTICE' ,pointsPerTestCaseSolved:5,timeToSolveInMinutes:90,},
//             { title: 'Balance', description: `You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', 'R'.

// A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.

// Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.

// Test Case 1: Already Balanced String

// Input:

// s = "QWER"
// Explanation:
// Since all characters already appear exactly n/4 = 1 times, no replacement is needed. ✅

// Expected Output:

// 0

// Test Case 2: One Replacement Needed

// Input:

// s = "QQWE"
// Explanation:

// Ideal frequency: {Q: 1, W: 1, E: 1, R: 1}
// Actual frequency: {Q: 2, W: 1, E: 1, R: 0}
// Replace one Q with R, such as "RQWE" or "QRWE", to balance the string.  Expected Output:

// 1

// Test Case 3: Only One Character in Excess

// Input:

// s = "QQQQ"

// Explanation:
// Ideal frequency: {Q: 1, W: 1, E: 1, R: 1}
// Actual frequency: {Q: 4, W: 0, E: 0, R: 0}
// Replace three Qs (substring "QQQ") to obtain "QWER".  Expected Output:

// 3
// `, topic: topicMap['sample_test'], type: 'PRACTICE',pointsPerTestCaseSolved:2,timeToSolveInMinutes:90 ,  },
// { title: 'Balance-1', description: `You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', 'R'.

//     A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.
    
//     Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.
    
//     Test Case 1: Already Balanced String
    
//     Input:
    
//     s = "QWER"
//     Explanation:
//     Since all characters already appear exactly n/4 = 1 times, no replacement is needed. ✅
    
//     Expected Output:
    
//     0
    
//     Test Case 2: One Replacement Needed
    
//     Input:
    
//     s = "QQWE"
//     Explanation:
    
//     Ideal frequency: {Q: 1, W: 1, E: 1, R: 1}
//     Actual frequency: {Q: 2, W: 1, E: 1, R: 0}
//     Replace one Q with R, such as "RQWE" or "QRWE", to balance the string.  Expected Output:
    
//     1
    
//     Test Case 3: Only One Character in Excess
    
//     Input:
    
//     s = "QQQQ"
    
//     Explanation:
//     Ideal frequency: {Q: 1, W: 1, E: 1, R: 1}
//     Actual frequency: {Q: 4, W: 0, E: 0, R: 0}
//     Replace three Qs (substring "QQQ") to obtain "QWER".  Expected Output:
    
//     3
//     `, topic: topicMap['Aadukalam_Round_2'], type: 'PRACTICE',pointsPerTestCaseSolved:2,timeToSolveInMinutes:90 ,  }
//         ]
//     });

    // console.log('Questions inserted successfully');

    // const questionList = await prisma.questions.findMany({ select: { id: true, title: true } });
    // const questionMap = Object.fromEntries(questionList.map(q => [q.title, q.id]));

    // Insert test cases
    // const testCases = [
    //     { title: 'Add2No', cases: ['3 10 13', '2 5 7', '4 8 12', '6 9 15', '10 20 30'] },
    //     { title: 'Sub2No', cases: ['10 3 7', '8 2 6', '15 4 11', '20 5 15', '25 10 15'] },
    //     { title: 'Mul2No', cases: ['3 10 30', '2 5 10', '4 8 32', '6 9 54', '10 20 200'] },
    //     { title: 'Div2No', cases: ['10 2 5', '8 2 4', '15 3 5', '20 4 5', '25 5 5'] },
    //     { title: 'SumOfArr', cases: ['3 1 2 3 6', '5 10 10 20 30 20 90', '4 5 5 5 5 20', '6 1 2 3 4 5 6 21', '2 100 200 300'] },
    //     { title: 'MaxOfArr', cases: ['3 1 2 3 3', '5 10 10 20 30 20 30', '4 5 5 5 5 5', '6 1 2 3 4 5 6 6', '2 100 200 200'] },
    //     { title: 'AvgOfArr', cases: ['3 1 2 3 2', '5 10 10 20 30 20 18', '4 5 5 5 5 5', '6 1 2 3 4 5 6 3', '2 100 200 150'] },
    //     { title: 'MinOfArr', cases: ['3 1 2 3 1', '5 10 10 20 30 20 10', '4 5 5 5 5 5', '6 1 2 3 4 5 6 1', '2 100 200 100'] }
    // ];

    // const testCaseData = testCases.flatMap(({ title, cases }) =>
    //     cases.map((testCase, index) => ({
    //         questionId: questionMap[title],
    //         inputString: testCase.split(' ').slice(0, -1).join(' '),
    //         outputString: testCase.split(' ').slice(-1)[0],
    //         type:index==1?"OPEN1":index==2?"OPEN2":"HIDDEN"
    //     }))
    // );

    // await prisma.testCase.createMany({ data: [
    //     {
    //         inputString:"",
    //         outputString:"",
    //         questionId:"",
    //         type:"HIDDEN"
    //     }
    // ] });

    // console.log('Test cases inserted successfully');


    // const boilerplates = [
    //     {
    //         question: "Add2No",
    //         c: { toUser: "int add(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint add(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", add(a, b)); }" },
    //         java: { toUser: "static class Solution { static int add(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.add(a, b)); } }" },
    //         python: { toUser: "def add(n1, n2):\n    # write code here", main: "def add(n1, n2): return n1 + n2\n\na = int(input())\nb = int(input())\nprint(add(a, b))" },
    //         cpp: { toUser: "int add(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint add(int, int);\nint main() { int a, b; cin >> a >> b; cout << add(a, b); }" }
    //     },
    //     {
    //         question: "Sub2No",
    //         c: { toUser: "int sub(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint sub(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", sub(a, b)); }" },
    //         java: { toUser: "static class Solution { static int sub(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.sub(a, b)); } }" },
    //         python: { toUser: "def sub(n1, n2):\n    # write code here", main: "def sub(n1, n2): return n1 - n2\n\na = int(input())\nb = int(input())\nprint(sub(a, b))" },
    //         cpp: { toUser: "int sub(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint sub(int, int);\nint main() { int a, b; cin >> a >> b; cout << sub(a, b); }" }
    //     },
    //     {
    //         question: "SumOfArr",
    //         c: { toUser: "int sum(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint sum(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", sum(arr, n)); }" },
    //         java: { toUser: "static class Solution { static int sum(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.sum(arr)); } }" },
    //         python: { toUser: "def sum(arr):\n    # write code here", main: "def sum(arr): return sum(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))" },
    //         cpp: { toUser: "int sum(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint sum(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << sum(arr, n); }" }
    //     }
    // ];
    
    // To insert into Prisma
    // const formattedData = boilerplates.map(q => ({
    //     questionId: questionMap[q.question],
    //     c: JSON.stringify(q.c.main),
    //     java: JSON.stringify(q.java.main),
    //     python: JSON.stringify(q.python.main),
    //     cpp: JSON.stringify(q.cpp.main),
    //     type:"MAIN"
    // }));
    
    // await prisma.boilerPlate.createMany({ data: formattedData });
    
    // console.log("Boilerplates inserted successfully");

    

    // const extraBoilerplates = [
    //     {
    //         question: "Mul2No",
    //         c: { toUser: "int mul(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint mul(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", mul(a, b)); }" },
    //         java: { toUser: "static class Solution { static int mul(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.mul(a, b)); } }" },
    //         python: { toUser: "def mul(n1, n2):\n    # write code here", main: "def mul(n1, n2): return n1 * n2\n\na = int(input())\nb = int(input())\nprint(mul(a, b))" },
    //         cpp: { toUser: "int mul(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint mul(int, int);\nint main() { int a, b; cin >> a >> b; cout << mul(a, b); }" }
    //     },
    //     {
    //         question: "Div2No",
    //         c: { toUser: "int div(int n1, int n2) { /* write code here */ }", main: "#include <stdio.h>\nint div(int, int);\nint main() { int a, b; scanf(\"%d %d\", &a, &b); printf(\"%d\", div(a, b)); }" },
    //         java: { toUser: "static class Solution { static int div(int n1, int n2) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int a = sc.nextInt(), b = sc.nextInt(); System.out.println(Solution.div(a, b)); } }" },
    //         python: { toUser: "def div(n1, n2):\n    # write code here", main: "def div(n1, n2): return n1 / n2\n\na = int(input())\nb = int(input())\nprint(div(a, b))" },
    //         cpp: { toUser: "int div(int n1, int n2) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint div(int, int);\nint main() { int a, b; cin >> a >> b; cout << div(a, b); }" }
    //     },
    //     {
    //         question: "MinOfArr",
    //         c: { toUser: "int min(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint min(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", min(arr, n)); }" },
    //         java: { toUser: "static class Solution { static int min(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.min(arr)); } }" },
    //         python: { toUser: "def min(arr):\n    # write code here", main: "def min(arr): return min(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(min(arr))" },
    //         cpp: { toUser: "int min(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint min(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << min(arr, n); }" }
    //     },
    //     {
    //         question: "MaxOfArr",
    //         c: { toUser: "int max(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nint max(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%d\", max(arr, n)); }" },
    //         java: { toUser: "static class Solution { static int max(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(Solution.max(arr)); } }" },
    //         python: { toUser: "def max(arr):\n    # write code here", main: "def max(arr): return max(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))" },
    //         cpp: { toUser: "int max(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nint max(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << max(arr, n); }" }
    //     },
    //     {
    //         question: "AvgOfArr",
    //         c: { toUser: "float avg(int arr[], int size) { /* write code here */ }", main: "#include <stdio.h>\nfloat avg(int[], int);\nint main() { int n, arr[100]; scanf(\"%d\", &n); for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]); printf(\"%.2f\", avg(arr, n)); }" },
    //         java: { toUser: "static class Solution { static float avg(int[] arr) { /* write code here */ } }", main: "import java.util.*;\nclass Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); int n = sc.nextInt(), arr[] = new int[n]; for (int i = 0; i < n; i++) arr[i] = sc.nextInt(); System.out.println(String.format(\"%.2f\", Solution.avg(arr))); } }" },
    //         python: { toUser: "def avg(arr):\n    # write code here", main: "def avg(arr): return sum(arr) / len(arr)\nn = int(input())\narr = list(map(int, input().split()))\nprint(f\"{avg(arr):.2f}\")" },
    //         cpp: { toUser: "float avg(int arr[], int size) { /* write code here */ }", main: "#include <iostream>\nusing namespace std;\nfloat avg(int[], int);\nint main() { int n, arr[100]; cin >> n; for (int i = 0; i < n; i++) cin >> arr[i]; cout << fixed << setprecision(2) << avg(arr, n); }" }
    //     }
    // ];
    
    // To insert into Prisma
    // const formattedExtraData = extraBoilerplates.map(q => ({
    //     questionId: questionMap[q.question],
    //     c: JSON.stringify(q.c.main),
    //     java: JSON.stringify(q.java.main),
    //     python: JSON.stringify(q.python.main),
    //     cpp: JSON.stringify(q.cpp.main),
    //     type:"MAIN"
    // }));
    
    // await prisma.boilerPlate.createMany({ data: formattedExtraData });
    
    // console.log("Additional Boilerplates inserted successfully");
    
}


main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
