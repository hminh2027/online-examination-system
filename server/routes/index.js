import { Router } from "express";
import examRoute from "./exam.js";
import moduleRoute from "./module.js";
import questionRoute from "./question.js";

const router = Router();

router.use("/exam", examRoute);
router.use("/module", moduleRoute);
router.use("/question", questionRoute);

export default router;
