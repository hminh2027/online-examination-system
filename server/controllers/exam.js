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
  console.log(exam);
  res.send("abc");
};
export const getExamById = async (req, res) => {
  const { id } = req.params;
  if (!id) res.send("Error id not found!");
  const exam = await prisma.exam.findFirst({ where: { id: +id } });
  res.send(exam);
};
export const getExams = (req, res) => {};
