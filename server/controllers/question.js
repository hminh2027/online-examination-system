import prisma from "../database/prisma.js";

export const createQuestion = async (req, res) => {
  try {
    const { answers, correctAnswer, description, examId, number } = req.body;
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
                number: +ans.number,
              };
            }),
          },
        },
      },
    });
    res.status(200).json(question);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
