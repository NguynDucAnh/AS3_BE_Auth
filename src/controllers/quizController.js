import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";

const updateOptions = { new: true, runValidators: true };

export async function getQuizzes(req, res) {
  try {
    const data = await Quiz.find().populate("questions").sort({ createdAt: -1 });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getQuizById(req, res) {
  try {
    const item = await Quiz.findById(req.params.quizId).populate("questions");
    if (!item) return res.status(404).json({ message: "Quiz not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function createQuiz(req, res) {
  try {
    const created = await Quiz.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function updateQuiz(req, res) {
  try {
    const updated = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      req.body,
      updateOptions
    );
    if (!updated) return res.status(404).json({ message: "Quiz not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function deleteQuiz(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // 1) Xóa toàn bộ question thuộc quiz này
    const questionIds = quiz.questions || [];
    if (questionIds.length > 0) {
      await Question.deleteMany({ _id: { $in: questionIds } });
    }

    // 2) Xóa quiz
    await Quiz.findByIdAndDelete(quiz._id);

    res.json({
      message: "Quiz deleted and its questions removed",
      quizId: quiz._id,
      deletedQuestions: questionIds.length,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// GET /quizzes/:quizId/populate -> lọc câu có chữ "capital"
export async function getQuizQuestionsContainCapital(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: "questions",
      match: { text: { $regex: "capital", $options: "i" } },
    });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// POST /quizzes/:quizId/question -> tạo 1 câu + push vào quiz
export async function addOneQuestionToQuiz(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = await Question.create(req.body);
    quiz.questions.push(q._id);
    await quiz.save();

    const populated = await Quiz.findById(req.params.quizId).populate("questions");
    res.status(201).json(populated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// POST /quizzes/:quizId/questions -> tạo nhiều câu + push vào quiz
export async function addManyQuestionsToQuiz(req, res) {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Body must be a non-empty array" });
    }

    const created = await Question.insertMany(req.body, { ordered: true });
    quiz.questions.push(...created.map((x) => x._id));
    await quiz.save();

    res.status(201).json({
      message: "Questions added successfully.",
      addedCount: created.length,
      quizId: quiz._id,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
