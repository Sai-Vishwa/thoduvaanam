-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('GENERAL', 'SPECIFIC');

-- CreateEnum
CREATE TYPE "TestCaseType" AS ENUM ('OPEN', 'HIDDEN');

-- CreateEnum
CREATE TYPE "DifficultyType" AS ENUM ('EASY', 'BALANCED', 'INTENSE', 'HELL');

-- CreateEnum
CREATE TYPE "AcceptedType" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('PRACTICE', 'CONTEST');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('WEBSITE', 'LEETCODE');

-- CreateEnum
CREATE TYPE "OTPStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rno" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "leetCodeName" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "leetCodeProfile" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "contestDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "noOfHiddenTestCases" INTEGER NOT NULL DEFAULT 18,
    "noOfExternalTestCases" INTEGER NOT NULL DEFAULT 2,
    "difficulty" "DifficultyType" NOT NULL DEFAULT 'EASY',
    "pointsPerTestCaseSolved" INTEGER NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'PRACTICE',
    "leetCodeLink" TEXT,
    "leetCodeTitle" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" SERIAL NOT NULL,
    "inputString" TEXT NOT NULL,
    "outputString" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "solvedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AcceptedType" NOT NULL DEFAULT 'PENDING',
    "noOfCasesPassed" INTEGER NOT NULL,
    "pointsSecured" INTEGER NOT NULL,
    "type" "SubmissionType" NOT NULL DEFAULT 'WEBSITE',

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAchievements" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "achievementId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "StudentAchievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestResult" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "timeTaken" TIMESTAMP(3) NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "ContestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTPStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rno" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "leetCodeName" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "leetCodeProfile" TEXT,
    "otp" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "status" "OTPStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "OTPStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussions" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" "CommentType" NOT NULL DEFAULT 'GENERAL',
    "questionId" INTEGER,
    "repliedTo" INTEGER,

    CONSTRAINT "Discussions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rno_key" ON "Student"("rno");

-- CreateIndex
CREATE UNIQUE INDEX "Student_uname_key" ON "Student"("uname");

-- CreateIndex
CREATE UNIQUE INDEX "Topics_name_key" ON "Topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topics_notes_key" ON "Topics"("notes");

-- CreateIndex
CREATE INDEX "StudentAchievements_count_idx" ON "StudentAchievements"("count");

-- CreateIndex
CREATE INDEX "ContestResult_totalPoints_timeTaken_idx" ON "ContestResult"("totalPoints", "timeTaken");

-- CreateIndex
CREATE UNIQUE INDEX "OTPStudent_rno_key" ON "OTPStudent"("rno");

-- CreateIndex
CREATE UNIQUE INDEX "OTPStudent_uname_key" ON "OTPStudent"("uname");

-- CreateIndex
CREATE UNIQUE INDEX "Session_studentId_key" ON "Session"("studentId");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAchievements" ADD CONSTRAINT "StudentAchievements_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAchievements" ADD CONSTRAINT "StudentAchievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestResult" ADD CONSTRAINT "ContestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestResult" ADD CONSTRAINT "ContestResult_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_repliedTo_fkey" FOREIGN KEY ("repliedTo") REFERENCES "Discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
