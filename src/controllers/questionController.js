import Question from "../models/Question.js";

const updateOptions = { new: true, runValidators: true, context: "query" };

export async function getQuestions(req, res) {
  try {
    const data = await Question.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getQuestionById(req, res) {
  try {
    const item = await Question.findById(req.params.questionId);
    if (!item) return res.status(404).json({ message: "Question not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function createQuestion(req, res) {
  try {
    const created = await Question.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function updateQuestion(req, res) {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.questionId,
      req.body,
      updateOptions
    );
    if (!updated) return res.status(404).json({ message: "Question not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.questionId);
    if (!deleted) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Deleted", id: deleted._id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
