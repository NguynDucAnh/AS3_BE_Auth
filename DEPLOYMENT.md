# Hướng Dẫn Deploy Lên Render

## 📋 Yêu Cầu
- GitHub account
- Render account (free)
- MongoDB Atlas account

## 🔑 Cấu Hình Render Environment Variables

Khi tạo web service trên Render, thêm các environment variables sau:

```
MONGO_URI=mongodb+srv://nguyenducanh20040115_db_user:<db_password>@as3.yf8debo.mongodb.net/as3
NODE_ENV=production
PORT=3000
```

**⚠️ Quan trọng:** Thay `<db_password>` bằng actual password từ MongoDB Atlas

## 📝 Các Bước Deploy

### 1. Chuẩn Bị Code
```bash
# Đảm bảo .env không được commit lên GitHub
git status  # Kiểm tra .env có ở .gitignore

# Commit các thay đổi
git add .
git commit -m "Update for Render deployment"
git push
```

### 2. Tạo Web Service Trên Render
1. Đăng nhập vào [render.com](https://render.com)
2. Nhấp "New" → "Web Service"
3. Chọn repository này
4. Điền thông tin:
   - **Name:** simple-quiz-api
   - **Environment:** Node
   - **Plan:** Free
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** 18 (hoặc mới hơn)

### 3. Thêm Environment Variables
1. Cuộn xuống phần "Environment Variables"
2. Thêm các biến:
   - `MONGO_URI`: `mongodb+srv://nguyenducanh20040115_db_user:<actual_password>@as3.yf8debo.mongodb.net/as3`
   - `NODE_ENV`: `production`
3. Nhấp "Deploy"

### 4. Kiểm Tra Deploy Status
- Render sẽ tự động build và start service
- Xem logs: Render Dashboard → Logs
- Health check endpoint: `https://your-render-url.com/health`

## 🌐 API Endpoints Di Production
```
GET  https://your-render-url.com/health
GET  https://your-render-url.com/
POST https://your-render-url.com/api/auth/login
POST https://your-render-url.com/api/auth/register
...
```

## 🔍 Troubleshooting

### Build Failed
- Kiểm tra logs: Hỗ trợ Node.js version, dependencies
- Đảm bảo `package-lock.json` hoặc `yarn.lock` tồn tại

### MongoDB Connection Error
```
❌ MongoDB connect error: connect ECONNREFUSED
```
- Kiểm tra MONGO_URI environment variable
- Kiểm tra IP whitelist trong MongoDB Atlas

### Service Not Starting
```bash
# Kiểm tra local trước
npm install
npm start

# Test connection
curl https://your-render-url.com/health
```

## 📍 Ngân Sách Free Tier
- Computing: 750 hours/month (đủ cho 1 web service 24/7)
- Database: Dùng MongoDB Atlas (free tier 512MB)
- Auto-sleep nếu không có request trong 15 phút

## 📚 Tài Liệu
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Connection](https://www.mongodb.com/docs/atlas/connect/)
