import express from "express";
const router = express.Router();

import { createQuestion } from "../controllers/question.js";

router.post("/create", createQuestion);

export default router;
