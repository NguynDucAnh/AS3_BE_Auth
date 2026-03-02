import { Router } from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = Router();

router.get("/", getQuestions);
router.post("/", createQuestion);

router.get("/:questionId", getQuestionById);
router.put("/:questionId", updateQuestion);
router.delete("/:questionId", deleteQuestion);

export default router;
