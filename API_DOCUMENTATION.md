# SimpleQuiz API Documentation

## Base URL
```
Development: http://localhost:3000
Production: https://your-render-url.com
```

## Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <JWT_TOKEN>
```

Get token from `/api/auth/login`

---

## 🔐 AUTH ENDPOINTS

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123",
  "admin": false
}
```
**Response:** `201 Created`
```json
{
  "username": "john_doe",
  "admin": false
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```
**Response:** `200 OK`
```json
{
  "username": "john_doe",
  "admin": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👥 USER ENDPOINTS

### Get All Users
```http
GET /api/users
Authorization: Bearer <ADMIN_TOKEN>
```
**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "admin_user",
    "admin": true
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "username": "john_doe",
    "admin": false
  }
]
```

### Get User By ID
```http
GET /api/users/:userId
```
**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "admin": false
}
```

### Update User
```http
PUT /api/users/:userId
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json

{
  "username": "new_username",
  "admin": true
}
```
**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "new_username",
  "admin": true
}
```

### Delete User
```http
DELETE /api/users/:userId
Authorization: Bearer <ADMIN_TOKEN>
```
**Response:** `200 OK`
```json
{
  "message": "User deleted successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

## ❓ QUESTION ENDPOINTS

### Get All Questions
```http
GET /api/questions
```
**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "text": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctAnswerIndex": 1,
    "keywords": ["geography", "capital"],
    "author": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Question By ID
```http
GET /api/questions/:questionId
```
**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "text": "What is the capital of France?",
  "options": ["London", "Paris", "Berlin", "Madrid"],
  "correctAnswerIndex": 1,
  "keywords": ["geography", "capital"],
  "author": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Create Question
```http
POST /api/questions
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "text": "What is the capital of Germany?",
  "options": ["Munich", "Berlin", "Hamburg", "Cologne"],
  "correctAnswerIndex": 1,
  "keywords": ["geography", "capital", "Europe"]
}
```
**Response:** `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "text": "What is the capital of Germany?",
  "options": ["Munich", "Berlin", "Hamburg", "Cologne"],
  "correctAnswerIndex": 1,
  "keywords": ["geography", "capital", "Europe"],
  "author": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### Update Question (Author Only)
```http
PUT /api/questions/:questionId
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "text": "What is the capital of Italy?",
  "options": ["Rome", "Milan", "Venice", "Florence"],
  "correctAnswerIndex": 0
}
```
**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "text": "What is the capital of Italy?",
  "options": ["Rome", "Milan", "Venice", "Florence"],
  "correctAnswerIndex": 0,
  "keywords": ["geography", "capital"],
  "author": "507f1f77bcf86cd799439011",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

### Delete Question (Author Only)
```http
DELETE /api/questions/:questionId
Authorization: Bearer <JWT_TOKEN>
```
**Response:** `200 OK`
```json
{
  "message": "Deleted",
  "id": "507f1f77bcf86cd799439013"
}
```

---

## 📝 QUIZ ENDPOINTS

### Get All Quizzes
```http
GET /api/quizzes
```
**Response:** `200 OK`
```json
[
  {
    "_id": "607f1f77bcf86cd799439015",
    "title": "Geography Basics",
    "description": "Test your geography knowledge",
    "questions": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "text": "What is the capital of France?",
        "options": ["London", "Paris", "Berlin", "Madrid"],
        "correctAnswerIndex": 1
      }
    ],
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

### Get Quiz By ID
```http
GET /api/quizzes/:quizId
```
**Response:** `200 OK`
```json
{
  "_id": "607f1f77bcf86cd799439015",
  "title": "Geography Basics",
  "description": "Test your geography knowledge",
  "questions": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "text": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Madrid"],
      "correctAnswerIndex": 1
    }
  ],
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Create Quiz
```http
POST /api/quizzes
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "History Quiz",
  "description": "Test your history knowledge",
  "questions": []
}
```
**Response:** `201 Created`
```json
{
  "_id": "607f1f77bcf86cd799439016",
  "title": "History Quiz",
  "description": "Test your history knowledge",
  "questions": [],
  "createdAt": "2024-01-15T12:00:00Z"
}
```

### Update Quiz
```http
PUT /api/quizzes/:quizId
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated Quiz Title",
  "description": "Updated description"
}
```
**Response:** `200 OK`
```json
{
  "_id": "607f1f77bcf86cd799439015",
  "title": "Updated Quiz Title",
  "description": "Updated description",
  "questions": [],
  "updatedAt": "2024-01-15T13:00:00Z"
}
```

### Delete Quiz (Cascades to Delete Questions)
```http
DELETE /api/quizzes/:quizId
Authorization: Bearer <JWT_TOKEN>
```
**Response:** `200 OK`
```json
{
  "message": "Quiz deleted and its questions removed",
  "quizId": "607f1f77bcf86cd799439015",
  "deletedQuestions": 3
}
```

---

## 🔗 QUIZ-QUESTION RELATIONS

### Add Existing Question to Quiz
```http
POST /api/quizzes/:quizId/questions/:questionId
Authorization: Bearer <JWT_TOKEN>
```
**Response:** `201 Created`
```json
{
  "message": "Question added to quiz successfully",
  "quiz": {
    "_id": "607f1f77bcf86cd799439015",
    "title": "Geography Basics",
    "questions": ["507f1f77bcf86cd799439013"]
  }
}
```

### Create and Add Single Question to Quiz
```http
POST /api/quizzes/:quizId/question
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "text": "What is 2 + 2?",
  "options": ["3", "4", "5", "6"],
  "correctAnswerIndex": 1,
  "keywords": ["math"]
}
```
**Response:** `201 Created`
```json
{
  "_id": "607f1f77bcf86cd799439015",
  "title": "Geography Basics",
  "questions": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "text": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctAnswerIndex": 1
    }
  ]
}
```

### Create and Add Multiple Questions to Quiz
```http
POST /api/quizzes/:quizId/questions
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

[
  {
    "text": "What is the capital of Spain?",
    "options": ["Barcelona", "Madrid", "Valencia", "Seville"],
    "correctAnswerIndex": 1,
    "keywords": ["geography"]
  },
  {
    "text": "What is the capital of Portugal?",
    "options": ["Porto", "Lisbon", "Covilhã", "Braga"],
    "correctAnswerIndex": 1,
    "keywords": ["geography"]
  }
]
```
**Response:** `201 Created`
```json
{
  "message": "Questions added successfully.",
  "addedCount": 2,
  "quizId": "607f1f77bcf86cd799439015"
}
```

### Remove Question from Quiz
```http
DELETE /api/quizzes/:quizId/questions/:questionId
Authorization: Bearer <JWT_TOKEN>
```
**Response:** `200 OK`
```json
{
  "message": "Question removed from quiz",
  "quiz": {
    "_id": "607f1f77bcf86cd799439015",
    "title": "Geography Basics",
    "questions": []
  }
}
```

### Get Quiz Questions Containing "capital"
```http
GET /api/quizzes/:quizId/populate
```
**Response:** `200 OK`
```json
{
  "_id": "607f1f77bcf86cd799439015",
  "title": "Geography Basics",
  "questions": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "text": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Madrid"],
      "correctAnswerIndex": 1
    }
  ]
}
```

---

## ⚙️ HEALTH CHECK

### Health Status
```http
GET /health
```
**Response:** `200 OK`
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

### API Info
```http
GET /
```
**Response:** `200 OK`
```json
{
  "message": "SimpleQuiz API running"
}
```

---

## ❌ Error Responses

### Unauthorized (No Token) - 401
```json
{
  "message": "You are not authenticated!"
}
```

### Forbidden (Invalid Token) - 403
```json
{
  "message": "Token is not valid!"
}
```

### Forbidden (Admin Only) - 403
```json
{
  "message": "You are not authorized (Admin only)!"
}
```

### Not Found - 404
```json
{
  "message": "Quiz not found"
}
```

### Validation Error - 400
```json
{
  "message": "options must have at least 2 items"
}
```

### Conflict - 400
```json
{
  "message": "Question already in this quiz"
}
```

### Server Error - 500
```json
{
  "message": "Login failed"
}
```

**Note:** Error responses are safe and never expose internal details or error objects. Details are logged on the server for debugging.

---

## 📊 Environment Variables

Add to `.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
PORT=3000
NODE_ENV=production
JWT_SECRET=your_secret_key_here
```

---

## 🚀 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "password123",
    "admin": false
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_user",
    "password": "password123"
  }'
```

### Create Question (Replace TOKEN)
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "text": "Sample question?",
    "options": ["Option A", "Option B"],
    "correctAnswerIndex": 0,
    "keywords": ["test"]
  }'
```

---

## 🔒 Authorization Rules

| Endpoint | Auth Required | Role |
|----------|--------------|------|
| Register/Login | ❌ | Public |
| Get Users | ✅ | Admin |
| Get User by ID | ✅ | Admin |
| Create User | ❌ | Public |
| Update/Delete User | ✅ | Admin |
| Get Questions | ❌ | Public |
| Create Question | ✅ | Any authenticated user |
| Update/Delete Question | ✅ | Author only |
| Get Quizzes | ❌ | Public |
| Create/Update/Delete Quiz | ✅ | Any authenticated user |
| Add Questions to Quiz | ✅ | Any authenticated user |

---

## 🛡️ Security Best Practices

### Error Handling
- ✅ **No sensitive information exposed** - Error messages are generic and safe
- ✅ **Server-side logging** - Detailed errors logged to console for debugging
- ✅ **Consistent error format** - All errors return `{ message: "string" }`
- ✅ **Never expose error objects** - Prevents leaking internal details

### Authentication
- ✅ **JWT-based** - Stateless authentication
- ✅ **Bearer tokens** - Sent in `Authorization: Bearer <token>` header
- ✅ **1-day expiration** - Tokens expire after 24 hours
- ✅ **Secure password hashing** - bcryptjs with salt rounds = 10

### Database
- ✅ **Input validation** - All fields validated by Mongoose schemas
- ✅ **Unique constraints** - Usernames must be unique
- ✅ **Proper error codes** - 400, 404, 403, 500 used appropriately
- ✅ **MongoDB operators secured** - Protected from injection attacks

### API Design
- ✅ **RESTful conventions** - Proper HTTP methods and status codes
- ✅ **Request validation** - Content-Type checked for JSON
- ✅ **CORS enabled** - Cross-origin requests allowed safely
- ✅ **Request logging** - Morgan middleware logs all requests
