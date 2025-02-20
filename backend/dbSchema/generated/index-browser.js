
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  rno: 'rno',
  uname: 'uname',
  leetCodeName: 'leetCodeName',
  salt: 'salt',
  hash: 'hash',
  timeOfLastSolve: 'timeOfLastSolve'
};

exports.Prisma.TopicsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  notes: 'notes',
  contestDate: 'contestDate'
};

exports.Prisma.QuestionsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  topic: 'topic',
  noOfHiddenTestCases: 'noOfHiddenTestCases',
  noOfExternalTestCases: 'noOfExternalTestCases',
  difficulty: 'difficulty',
  pointsPerTestCaseSolved: 'pointsPerTestCaseSolved',
  type: 'type',
  leetCodeLink: 'leetCodeLink',
  leetCodeTitle: 'leetCodeTitle',
  timeToSolveInMinutes: 'timeToSolveInMinutes',
  contestId: 'contestId'
};

exports.Prisma.TestCaseScalarFieldEnum = {
  id: 'id',
  inputString: 'inputString',
  outputString: 'outputString',
  questionId: 'questionId',
  type: 'type'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  id: 'id',
  questionId: 'questionId',
  studentId: 'studentId',
  startTime: 'startTime',
  maxTimeToSolve: 'maxTimeToSolve',
  submittedOn: 'submittedOn',
  status: 'status',
  noOfCasesPassed: 'noOfCasesPassed',
  pointsSecured: 'pointsSecured',
  type: 'type',
  output1: 'output1',
  output2: 'output2',
  isFinal: 'isFinal',
  code: 'code',
  leetCodeLink: 'leetCodeLink',
  language: 'language'
};

exports.Prisma.AchievementsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description'
};

exports.Prisma.StudentAchievementsScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  achievementId: 'achievementId',
  count: 'count'
};

exports.Prisma.OTPStudentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  rno: 'rno',
  uname: 'uname',
  salt: 'salt',
  hash: 'hash',
  leetCodeProfile: 'leetCodeProfile',
  otp: 'otp',
  expiry: 'expiry',
  status: 'status'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  session: 'session',
  expiry: 'expiry'
};

exports.Prisma.DiscussionsScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  type: 'type',
  questionId: 'questionId',
  repliedTo: 'repliedTo',
  timeOfComment: 'timeOfComment'
};

exports.Prisma.ContestScalarFieldEnum = {
  id: 'id',
  title: 'title',
  opensOn: 'opensOn',
  closesOn: 'closesOn',
  timeToSolveInMinutes: 'timeToSolveInMinutes',
  totalPoints: 'totalPoints',
  totalNoOfQuestions: 'totalNoOfQuestions',
  topicId: 'topicId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.DifficultyType = exports.$Enums.DifficultyType = {
  EASY: 'EASY',
  BALANCED: 'BALANCED',
  INTENSE: 'INTENSE',
  HELL: 'HELL'
};

exports.QuestionType = exports.$Enums.QuestionType = {
  PRACTICE: 'PRACTICE',
  CONTEST: 'CONTEST'
};

exports.TestCaseType = exports.$Enums.TestCaseType = {
  OPEN1: 'OPEN1',
  OPEN2: 'OPEN2',
  HIDDEN: 'HIDDEN'
};

exports.AcceptedType = exports.$Enums.AcceptedType = {
  COMPUTING: 'COMPUTING',
  COMPLETED: 'COMPLETED',
  WAITING: 'WAITING'
};

exports.SubmissionType = exports.$Enums.SubmissionType = {
  WEBSITE: 'WEBSITE',
  LEETCODE: 'LEETCODE'
};

exports.isFinalType = exports.$Enums.isFinalType = {
  YES: 'YES',
  NO: 'NO'
};

exports.LanguageType = exports.$Enums.LanguageType = {
  PYTHON: 'PYTHON',
  C: 'C',
  JAVA: 'JAVA',
  CPP: 'CPP'
};

exports.OTPStatus = exports.$Enums.OTPStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED'
};

exports.CommentType = exports.$Enums.CommentType = {
  GENERAL: 'GENERAL',
  SPECIFIC: 'SPECIFIC'
};

exports.Prisma.ModelName = {
  Student: 'Student',
  Topics: 'Topics',
  Questions: 'Questions',
  TestCase: 'TestCase',
  Submission: 'Submission',
  Achievements: 'Achievements',
  StudentAchievements: 'StudentAchievements',
  OTPStudent: 'OTPStudent',
  Session: 'Session',
  Discussions: 'Discussions',
  Contest: 'Contest'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
