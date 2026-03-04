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
  deleteQuestionFromQuiz,
  addQuestionToQuiz,
} from "../controllers/quizController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getQuizzes);
router.post("/", verifyToken, createQuiz);
router.get("/:quizId", getQuizById);
router.put("/:quizId", verifyToken, updateQuiz);
router.delete("/:quizId", verifyToken, deleteQuiz);

// Quiz-Question relations
router.post("/:quizId/questions/:questionId", verifyToken, addQuestionToQuiz);
router.delete("/:quizId/questions/:questionId", verifyToken, deleteQuestionFromQuiz);

// special endpoints theo đề
router.get("/:quizId/populate", getQuizQuestionsContainCapital);
router.post("/:quizId/question", verifyToken, addOneQuestionToQuiz);
router.post("/:quizId/questions", verifyToken, addManyQuestionsToQuiz);

export default router;
