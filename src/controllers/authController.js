import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middlewares/authMiddleware.js';

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      admin: req.body.admin || false
    });
    const savedUser = await newUser.save();
    res.status(201).json({ username: savedUser.username, admin: savedUser.admin });
  } catch (err) {
    // THÊM 2 DÒNG NÀY ĐỂ IN LỖI RA TERMINAL
    console.error("LỖI ĐĂNG KÝ BỊ CRASH CHI TIẾT:", err.message);
    res.status(500).json({ message: err.message, chiTiet: err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, admin: user.admin }, SECRET_KEY, { expiresIn: "1d" });
    
    res.status(200).json({ username: user.username, admin: user.admin, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const usersData = users.map(user => ({
      _id: user._id,
      username: user.username,
      admin: user.admin
    }));
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      admin: user.admin
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, admin } = req.body;
    const updateData = {};
    
    if (username) updateData.username = username;
    if (admin !== undefined) updateData.admin = admin;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    );
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      admin: user.admin
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({ message: "User deleted successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};