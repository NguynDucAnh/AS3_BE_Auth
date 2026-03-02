import { Router } from "express";
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizQuestionsContainCapital,
  addOneQuestionToQuiz,
  addManyQuestionsToQuiz,
} from "../controllers/quizController.js";

const router = Router();

router.get("/", getQuizzes);
router.post("/", createQuiz);
router.get("/:quizId", getQuizById);
router.put("/:quizId", updateQuiz);
router.delete("/:quizId", deleteQuiz);

// special endpoints theo đề
router.get("/:quizId/populate", getQuizQuestionsContainCapital);
router.post("/:quizId/question", addOneQuestionToQuiz);
router.post("/:quizId/questions", addManyQuestionsToQuiz);

export default router;
