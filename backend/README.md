# 🌿 Seasonal Wardrobe - Backend (Node.js + Express + MongoDB)

RESTful API backend for the Seasonal Wardrobe application.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Axios** - HTTP client
- **CORS** - Cross-origin support

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Start MongoDB service
# Windows: MongoDB starts as a service automatically
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env` file

### 3. Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
```

**`.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/seasonal-wardrobe
WEATHER_API_KEY=your_openweathermap_key
PORT=5000
```

## 🏃 Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### 1. Root
```http
GET /
```
Returns API information and available endpoints.

### 2. Chat
```http
POST /chat
Content-Type: application/json

{
  "message": "Hello",
  "session_id": "session-123" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! I'm your Seasonal Wardrobe assistant...",
  "session_id": "session-123",
  "history": [...]
}
```

### 3. Get Chat History
```http
GET /chat-history/:sessionId
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session-123",
  "history": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": "2025-01-12T10:30:00.000Z"
    }
  ]
}
```

### 4. Analyze Outfit
```http
POST /analyze
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "style": "Casual Contemporary",
    "colors": ["Navy", "White", "Beige"],
    "season": "Spring/Fall",
    "sustainability_score": 7.5,
    "recommendations": [...],
    "occasion": "...",
    "care_tips": [...]
  }
}
```

### 5. Ask About Outfit
```http
POST /ask
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,...",
  "question": "What occasions is this suitable for?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "This is a versatile outfit suitable for..."
}
```

### 6. Weather & Tips
```http
GET /weather?city=London
```

**Response:**
```json
{
  "success": true,
  "weather": {
    "city": "London",
    "temperature": 18,
    "feels_like": 16,
    "condition": "Partly Cloudy",
    "humidity": 65,
    "wind_speed": 12,
    "description": "partly cloudy with mild temperatures"
  },
  "tips": {
    "outfit_suggestions": [...],
    "fabric_recommendations": [...],
    "accessories": [...],
    "sustainability_tip": "..."
  }
}
```

## 🗄️ Database Models

### ChatSession
```javascript
{
  sessionId: String (unique),
  messages: [{
    role: String ('user' | 'assistant'),
    content: String,
    timestamp: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### OutfitAnalysis
```javascript
{
  imageHash: String,
  analysis: Object,
  createdAt: Date
}
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/seasonal-wardrobe` |
| `WEATHER_API_KEY` | OpenWeatherMap API key | `your_api_key_here` (uses mock data) |
| `PORT` | Server port | `5000` |

## 🧪 Testing Endpoints

### Using cURL

**Chat:**
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello", "session_id":"test-123"}'
```

**Weather:**
```bash
curl "http://localhost:5000/weather?city=London"
```

### Using Postman or Thunder Client

Import the endpoints or use the API documentation above.

## 📊 Database Management

### View Data (MongoDB Shell)
```bash
mongosh

use seasonal-wardrobe
db.chatsessions.find()
db.outfitanalyses.find()
```

### Clear Collections
```bash
db.chatsessions.deleteMany({})
db.outfitanalyses.deleteMany({})
```

## 🛠️ Development

### Project Structure
```
backend/
├── server.js          # Main application file
├── package.json       # Dependencies
├── .env.example      # Environment template
├── .env              # Your config (gitignored)
└── README.md         # This file
```

### Adding New Endpoints

1. Add route in `server.js`:
```javascript
app.post('/new-endpoint', async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

2. Test the endpoint
3. Update documentation

### Adding New Models

```javascript
const newSchema = new mongoose.Schema({
  field1: String,
  field2: Number,
  createdAt: { type: Date, default: Date.now }
});

const NewModel = mongoose.model('NewModel', newSchema);
```

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Windows: Check Services
# Mac: brew services list
# Linux: systemctl status mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change port in `.env` or stop other process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance Tips

1. **Index Database Fields:**
```javascript
chatSessionSchema.index({ sessionId: 1 });
```

2. **Limit Response Size:**
```javascript
app.use(express.json({ limit: '10mb' }));
```

3. **Add Request Timeout:**
```javascript
app.use(timeout('30s'));
```

## 🔒 Security Best Practices

1. ✅ Use environment variables for secrets
2. ✅ Enable CORS with specific origins in production
3. ✅ Implement rate limiting
4. ✅ Validate all inputs
5. ✅ Use HTTPS in production
6. ✅ Keep dependencies updated

## 📝 License

MIT

---

**Built with ❤️ for sustainable fashion 🌿**
