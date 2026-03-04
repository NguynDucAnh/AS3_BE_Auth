# Frontend API Reference - SimpleQuiz API

**Base URL:** `http://localhost:3000` (dev) or `https://your-render-url.com` (prod)

---

## 🔐 Authentication

### Register
```javascript
const register = async (username, password) => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, admin: false })
  });
  return response.json();
};
// Success: { username, admin }
```

### Login
```javascript
const login = async (username, password) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  // Save token to localStorage
  localStorage.setItem('token', data.token);
  return data;
};
// Success: { username, admin, token }
```

### Get Auth Token
```javascript
const getToken = () => localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
};
```

---

## 👥 Users

### Get All Users (Admin Only)
```javascript
const getAllUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users', {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

### Get User by ID
```javascript
const getUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  return response.json();
};
```

### Update User (Admin Only)
```javascript
const updateUser = async (userId, updates) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(updates) // { username, admin }
  });
  return response.json();
};
```

### Delete User (Admin Only)
```javascript
const deleteUser = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

---

## ❓ Questions

### Get All Questions
```javascript
const getQuestions = async () => {
  const response = await fetch('http://localhost:3000/api/questions');
  return response.json();
};
// Returns: [ { _id, text, options, correctAnswerIndex, author, ... } ]
```

### Get Question by ID
```javascript
const getQuestion = async (questionId) => {
  const response = await fetch(`http://localhost:3000/api/questions/${questionId}`);
  return response.json();
};
```

### Create Question (Requires Auth)
```javascript
const createQuestion = async (questionData) => {
  const response = await fetch('http://localhost:3000/api/questions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: "What is 2+2?",
      options: ["3", "4", "5", "6"],
      correctAnswerIndex: 1,
      keywords: ["math"]
    })
  });
  return response.json();
};
```

### Update Question (Author Only)
```javascript
const updateQuestion = async (questionId, updates) => {
  const response = await fetch(`http://localhost:3000/api/questions/${questionId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return response.json();
};
```

### Delete Question (Author Only)
```javascript
const deleteQuestion = async (questionId) => {
  const response = await fetch(`http://localhost:3000/api/questions/${questionId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

---

## 📝 Quizzes

### Get All Quizzes
```javascript
const getQuizzes = async () => {
  const response = await fetch('http://localhost:3000/api/quizzes');
  return response.json();
};
// Returns: [ { _id, title, description, questions: [...], ... } ]
```

### Get Quiz by ID (with all questions)
```javascript
const getQuiz = async (quizId) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`);
  return response.json();
};
// Returns: { _id, title, description, questions: [ { _id, text, options, ... } ] }
```

### Create Quiz (Requires Auth)
```javascript
const createQuiz = async (title, description = '') => {
  const response = await fetch('http://localhost:3000/api/quizzes', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, questions: [] })
  });
  return response.json();
};
```

### Update Quiz (Requires Auth)
```javascript
const updateQuiz = async (quizId, updates) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(updates) // { title, description }
  });
  return response.json();
};
```

### Delete Quiz (Requires Auth)
```javascript
const deleteQuiz = async (quizId) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

---

## 🔗 Quiz-Question Relations

### Add Existing Question to Quiz
```javascript
const addQuestionToQuiz = async (quizId, questionId) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}/questions/${questionId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

### Create & Add Single Question to Quiz
```javascript
const addSingleQuestion = async (quizId, questionData) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}/question`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData)
  });
  return response.json();
};
```

### Create & Add Multiple Questions to Quiz
```javascript
const addMultipleQuestions = async (quizId, questionsArray) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}/questions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(questionsArray)
  });
  return response.json();
};
// questionsArray: [ { text, options, correctAnswerIndex, keywords } ]
```

### Remove Question from Quiz
```javascript
const removeQuestionFromQuiz = async (quizId, questionId) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}/questions/${questionId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};
```

### Get Quiz Questions with "capital" Keyword
```javascript
const getQuizCapitalQuestions = async (quizId) => {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}/populate`);
  return response.json();
};
```

---

## 🛠️ Helper API Service (React/Vue Example)

```javascript
// api.js
const BASE_URL = 'http://localhost:3000';

const getToken = () => localStorage.getItem('token');

const apiCall = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (getToken()) {
    headers['Authorization'] = `Bearer ${getToken()}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
};

// Authentication
export const authAPI = {
  register: (username, password) =>
    apiCall('/api/auth/register', 'POST', { username, password }),
  login: (username, password) =>
    apiCall('/api/auth/login', 'POST', { username, password }),
};

// Users
export const userAPI = {
  getAllUsers: () => apiCall('/api/users'),
  getUser: (userId) => apiCall(`/api/users/${userId}`),
  updateUser: (userId, updates) => apiCall(`/api/users/${userId}`, 'PUT', updates),
  deleteUser: (userId) => apiCall(`/api/users/${userId}`, 'DELETE'),
};

// Questions
export const questionAPI = {
  getAll: () => apiCall('/api/questions'),
  getById: (id) => apiCall(`/api/questions/${id}`),
  create: (data) => apiCall('/api/questions', 'POST', data),
  update: (id, data) => apiCall(`/api/questions/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/api/questions/${id}`, 'DELETE'),
};

// Quizzes
export const quizAPI = {
  getAll: () => apiCall('/api/quizzes'),
  getById: (id) => apiCall(`/api/quizzes/${id}`),
  create: (title, description) =>
    apiCall('/api/quizzes', 'POST', { title, description, questions: [] }),
  update: (id, data) => apiCall(`/api/quizzes/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/api/quizzes/${id}`, 'DELETE'),
  addQuestion: (quizId, questionId) =>
    apiCall(`/api/quizzes/${quizId}/questions/${questionId}`, 'POST'),
  removeQuestion: (quizId, questionId) =>
    apiCall(`/api/quizzes/${quizId}/questions/${questionId}`, 'DELETE'),
  addSingleQuestion: (quizId, data) =>
    apiCall(`/api/quizzes/${quizId}/question`, 'POST', data),
  addMultipleQuestions: (quizId, data) =>
    apiCall(`/api/quizzes/${quizId}/questions`, 'POST', data),
  getCapitalQuestions: (quizId) =>
    apiCall(`/api/quizzes/${quizId}/populate`),
};
```

---

## 📋 Quick Reference Table

| Function | Method | Endpoint | Auth Required |
|----------|--------|----------|----------------|
| Register | POST | `/api/auth/register` | ❌ |
| Login | POST | `/api/auth/login` | ❌ |
| Get Users | GET | `/api/users` | ✅ Admin |
| Get User | GET | `/api/users/:userId` | ❌ |
| Update User | PUT | `/api/users/:userId` | ✅ Admin |
| Delete User | DELETE | `/api/users/:userId` | ✅ Admin |
| Get Questions | GET | `/api/questions` | ❌ |
| Get Question | GET | `/api/questions/:id` | ❌ |
| Create Question | POST | `/api/questions` | ✅ |
| Update Question | PUT | `/api/questions/:id` | ✅ Author |
| Delete Question | DELETE | `/api/questions/:id` | ✅ Author |
| Get Quizzes | GET | `/api/quizzes` | ❌ |
| Get Quiz | GET | `/api/quizzes/:id` | ❌ |
| Create Quiz | POST | `/api/quizzes` | ✅ |
| Update Quiz | PUT | `/api/quizzes/:id` | ✅ |
| Delete Quiz | DELETE | `/api/quizzes/:id` | ✅ |
| Add Question to Quiz | POST | `/api/quizzes/:quizId/questions/:qId` | ✅ |
| Remove Question | DELETE | `/api/quizzes/:quizId/questions/:qId` | ✅ |
| Add Single Question | POST | `/api/quizzes/:quizId/question` | ✅ |
| Add Multiple Questions | POST | `/api/quizzes/:quizId/questions` | ✅ |

---

## 🧪 Testing with Postman/Thunder Client

### 1. Register User
```
POST http://localhost:3000/api/auth/register
{
  "username": "testuser",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:3000/api/auth/login
{
  "username": "testuser",
  "password": "password123"
}
```
→ Copy the `token` from response

### 3. Create Quiz (with token)
```
POST http://localhost:3000/api/quizzes
Header: Authorization: Bearer <YOUR_TOKEN>
{
  "title": "Math Quiz",
  "description": "Test your math skills"
}
```

---

## 💾 Data Models

### User
```json
{
  "_id": "ObjectId",
  "username": "string (unique)",
  "password": "string (hashed)",
  "admin": "boolean"
}
```

### Question
```json
{
  "_id": "ObjectId",
  "text": "string",
  "options": ["string"],
  "correctAnswerIndex": "number",
  "keywords": ["string"],
  "author": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Quiz
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "questions": ["ObjectId (Question)"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
