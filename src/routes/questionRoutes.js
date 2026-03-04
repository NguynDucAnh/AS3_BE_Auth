import { Router } from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";
import { verifyToken, verifyAuthor } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getQuestions);
router.post("/", verifyToken, createQuestion);

router.get("/:questionId", getQuestionById);
router.put("/:questionId", verifyAuthor, updateQuestion);
router.delete("/:questionId", verifyAuthor, deleteQuestion);

export default router;
