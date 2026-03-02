import express from "express";
import cors from "cors";
import morgan from "morgan";

import quizRoutes from "./src/routes/quizRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import authRoutes from './src/routes/authRoutes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFound } from './src/middlewares/notFound.js';

const app = express();

// 1. MIDDLEWARE PHẢI ĐẶT LÊN TRƯỚC TIÊN (Mở gói hàng JSON)
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 2. SAU ĐÓ MỚI ĐẾN CÁC ROUTES (Xử lý hàng)
app.use('/api/auth', authRoutes);

// Health check endpoint cho Render
app.get("/health", (req, res) => res.json({ status: "OK", timestamp: new Date() }));

app.get("/", (req, res) => res.json({ message: "SimpleQuiz API running" }));

app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);
// nếu đề bạn ghi /question thì thêm alias:
app.use("/question", questionRoutes);

// Error handling middleware (PHẢI ĐẶT CUỐI CÙNG)
app.use(notFound);
app.use(errorHandler);

export default app;