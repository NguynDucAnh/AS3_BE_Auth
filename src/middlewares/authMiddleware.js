import jwt from 'jsonwebtoken';
import Question from '../models/Question.js';

export const SECRET_KEY = process.env.JWT_SECRET || "FPT_SECRET_KEY";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "You are not authenticated!" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorized (Admin only)!" });
    }
  });
};

export const verifyAuthor = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const question = await Question.findById(req.params.id || req.params.questionId);
      if (!question) return res.status(404).json({ message: "Question not found" });
      
      if (question.author.toString() === req.user.id) {
        next();
      } else {
        res.status(403).json({ message: "You are not the author of this question!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
};