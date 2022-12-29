import prisma from "../database/prisma.js";

export const createExam = async (req, res) => {
  const {
    title,
    duration,
    password,
    numberOfQuestions,
    score,
    number,
    moduleCode,
  } = req.body;
  try {
    const exam = await prisma.exam.create({
      data: {
        title,
        duration: +duration,
        password,
        moduleCode,
        number: +number,
        numberOfQuestions: +numberOfQuestions,
        score: +score,
      },
    });
    res.status(200).json(exam);
  } catch (e) {
    res.status(400).json(e);
  }
};
export const getExamById = async (req, res) => {
  const { id } = req.params;
  if (!id) res.send("Error id not found!");
  const exam = await prisma.exam.findFirst({ where: { id: +id } });
  res.json(exam);
};
