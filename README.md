# TTHC Assistant - Chatbot AI Thủ tục Hành chính

Ứng dụng chatbot AI chuyên nghiệp hỗ trợ tra cứu và tư vấn thủ tục hành chính Việt Nam, được xây dựng với React + Vite và Ant Design.

## ✨ Tính năng chính

- **🤖 AI Assistant thông minh**: Hỗ trợ 3 loại ý định (General Chat, Search Procedures, Get Details)
- **🔍 Tìm kiếm thủ tục**: Tìm kiếm nhanh trong 6,233+ thủ tục hành chính
- **📋 Chi tiết thủ tục**: Auto-streaming chi tiết thủ tục khi hỏi về mã cụ thể
- **💬 Giao diện chat hiện đại**: Thiết kế giống GPT/Grok, responsive
- **📱 Responsive Design**: Tối ưu cho mọi thiết bị
- **🔐 Bảo mật**: Xác thực API key, error handling toàn diện
- **💾 Lưu trữ local**: Lịch sử chat được lưu trong localStorage

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 19, Vite 7
- **UI Framework**: Ant Design 5
- **Routing**: React Router DOM 6
- **Styling**: CSS-in-JS, CSS Variables
- **API**: Fetch API với Bearer Authentication
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite với HMR

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm >= 8.0.0

### Cài đặt dependencies

```bash
# Clone repository
git clone <repository-url>
cd chatbot-tthc

# Cài đặt packages
npm install
```

### Cấu hình Environment Variables

Sao chép file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin API của bạn:
```env
# API Configuration
VITE_API_BASE_URL=https://apttthc.nguyenluan.vn
VITE_API_KEY=GIyBK7ge2fLWK8G6hXDh47xbm5sKVCZd

# API Endpoints
VITE_API_CHAT_ENDPOINT=/api/v1/chat
VITE_API_HEALTH_ENDPOINT=/api/v1/health
VITE_API_PROCEDURES_ENDPOINT=/api/v1/procedures

# Development Configuration
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
```

### Environment Variables

| Variable | Mô tả | Mặc định |
|----------|-------|----------|
| `VITE_API_BASE_URL` | URL gốc của API | `https://apttthc.nguyenluan.vn` |
| `VITE_API_KEY` | API key để xác thực | - |
| `VITE_API_CHAT_ENDPOINT` | Endpoint cho chat | `/api/v1/chat` |
| `VITE_API_HEALTH_ENDPOINT` | Endpoint health check | `/api/v1/health` |
| `VITE_API_PROCEDURES_ENDPOINT` | Endpoint thủ tục | `/api/v1/procedures` |
| `VITE_DEV_MODE` | Bật chế độ development | `true` |
| `VITE_LOG_LEVEL` | Mức độ log (info/debug) | `info` |

## 🏃‍♂️ Chạy ứng dụng

### Development mode
```bash
npm run dev
```
Ứng dụng sẽ chạy tại `http://localhost:5173`

### Production build
```bash
npm run build
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── components/           # React components
│   ├── ChatContainer.jsx # Container chính cho chat
│   ├── ChatMessage.jsx   # Component tin nhắn
│   ├── ChatInput.jsx     # Input gửi tin nhắn
│   ├── Sidebar.jsx       # Sidebar navigation
│   ├── TypingIndicator.jsx # Hiệu ứng typing
│   └── ErrorBoundary.jsx # Error boundary
├── config/
│   └── api.js           # Cấu hình API
├── hooks/
│   └── useChat.js       # Custom hooks cho chat
├── utils/
│   └── helpers.js       # Utility functions
├── App.jsx              # Component chính
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Cách sử dụng

### 1. Khởi động ứng dụng
- Mở trình duyệt và truy cập `http://localhost:5173`
- Ứng dụng sẽ tự động kiểm tra kết nối API

### 2. Tương tác với chatbot

**General Chat:**
```
User: "Xin chào"
Bot: "Xin chào! Tôi là trợ lý AI hỗ trợ thủ tục hành chính..."
```

**Tìm kiếm thủ tục:**
```
User: "Tôi muốn đăng ký doanh nghiệp"
Bot: [Hiển thị danh sách thủ tục liên quan với buttons]
```

**Chi tiết thủ tục (Auto-streaming):**
```
User: "Chi tiết về mã 2.002017"
Bot: [Tự động stream chi tiết thủ tục]
```

### 3. Tính năng nâng cao

- **Lịch sử chat**: Tự động lưu và hiển thị trong sidebar
- **Quick suggestions**: Gợi ý câu hỏi phổ biến
- **Responsive**: Tự động thu gọn sidebar trên mobile
- **Error handling**: Xử lý lỗi mạng và API một cách graceful

## 🚀 Demo & Testing

### Chạy ứng dụng
```bash
npm run dev
# Truy cập http://localhost:5173
```

### Test các tính năng
1. **Chat thông thường**: "Xin chào", "Cảm ơn"
2. **Tìm kiếm thủ tục**: "Đăng ký doanh nghiệp", "Cấp giấy phép"
3. **Chi tiết thủ tục**: "Chi tiết về mã 2.002017"
4. **Responsive**: Thử nghiệm trên mobile/tablet
5. **Error handling**: Ngắt mạng và test

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Liên hệ

- **API Endpoint**: https://apttthc.nguyenluan.vn
- **API Key**: GIyBK7ge2fLWK8G6hXDh47xbm5sKVCZd
