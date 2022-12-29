import prisma from "../database/prisma.js";

export const createQuestion = async (req, res) => {
  const { answers, correctAnswer, description, examId, number } = req.body;
  console.log(req.body);
  const question = await prisma.question.create({
    data: {
      correctAnswer: +correctAnswer,
      number: +number,
      description,
      Exam: {
        connect: { id: +examId },
      },
      answers: {
        createMany: {
          data: answers.map((ans) => {
            return {
              ...ans,
              number: +number,
            };
          }),
        },
      },
    },
  });
  res.status(200).json(question);
};
