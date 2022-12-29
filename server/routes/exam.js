import express from "express";
const router = express.Router();

import { getExamById, createExam } from "../controllers/exam.js";

router.get("/:id", getExamById);
router.post("/create", createExam);

export default router;
