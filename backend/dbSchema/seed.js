// /* Prisma Seed Script for Topics, Questions, and Test Cases */

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   // Insert Topics
//   const addition = await prisma.topics.create({ data: { name: 'Addition', description: 'Addition-related problems', contestDate: new Date() } });
//   const average = await prisma.topics.create({ data: { name: 'Average', description: 'Average-related problems', contestDate: new Date() } });

//   // Insert Practice Questions
//   const questions = await prisma.questions.createMany({
//     data: [
//       { title: 'Add 2 Numbers', topicId: addition.id, difficulty: 'EASY', pointsPerTestCaseSolved: 10, type: 'PRACTICE' },
//       { title: 'Add 3 Numbers', topicId: addition.id, difficulty: 'EASY', pointsPerTestCaseSolved: 15, type: 'PRACTICE' },
//       { title: '
