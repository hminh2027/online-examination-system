import express from "express";
const router = express.Router();

import { getModules } from "../controllers/module.js";

router.get("/", getModules);

export default router;
