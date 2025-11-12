# 🌿 Seasonal Wardrobe

A complete full-stack web application for sustainable fashion management with AI-powered features. Built with React (Vite + Tailwind CSS) for the frontend and Flask for the backend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)

## ✨ Features

### Frontend Features
- **Modern UI/UX**: Clean, responsive design with smooth animations using Framer Motion
- **Dark/Light Mode**: Persistent theme toggle with localStorage
- **7 Core Pages**:
  - **Home**: Feature overview and navigation
  - **AI Chatbot**: Interactive fashion assistant with conversation history
  - **Outfit Analyzer**: Upload photos for AI-powered style analysis
  - **Energy Tips**: Weather-based outfit recommendations
  - **Outfit Organizer**: Digital wardrobe management with filtering
  - **Seasonal Quiz**: Discover your style profile
  - **Sustainable Planner**: Track eco-friendly fashion goals

### Backend Features
- **RESTful API** with Flask
- **4 Core Endpoints**:
  - `/chat` - AI chatbot conversations
  - `/analyze` - Outfit image analysis
  - `/ask` - Question answering about outfits
  - `/weather` - Weather data and outfit tips
- **CORS enabled** for cross-origin requests
- **Error handling** and validation
- **Mock AI responses** (easily replaceable with real AI APIs)

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip**

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Seasonalwardrobe
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Optional: Set up environment variables
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key if desired
```

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

### Running the Application

#### Start the Backend (Terminal 1)

```bash
cd backend
# Activate venv if not already activated
python app.py
```

Backend will run on `http://localhost:5000`

#### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
Seasonalwardrobe/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   └── NavBar.jsx
│   │   ├── context/          # React contexts
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── OutfitAnalyzer.jsx
│   │   │   ├── EnergyTips.jsx
│   │   │   ├── OutfitOrganizer.jsx
│   │   │   ├── SeasonalQuiz.jsx
│   │   │   └── SustainablePlanner.jsx
│   │   ├── utils/            # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## 🎨 Key Technologies

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Requests** - HTTP library for external APIs

## 🔌 API Endpoints

### POST /chat
Chat with the AI fashion assistant.

**Request:**
```json
{
  "message": "What should I wear today?",
  "session_id": "session-123"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Based on the weather...",
  "session_id": "session-123",
  "history": [...]
}
```

### POST /analyze
Analyze an outfit image.

**Request:**
```json
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
    "colors": ["Navy", "White"],
    "season": "Spring/Fall",
    "sustainability_score": 7.5,
    "recommendations": [...]
  }
}
```

### POST /ask
Ask a question about an outfit image.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,...",
  "question": "What occasions is this suitable for?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "This outfit is suitable for..."
}
```

### GET /weather?city=London
Get weather data and outfit recommendations.

**Response:**
```json
{
  "success": true,
  "weather": {
    "city": "London",
    "temperature": 18,
    "condition": "Partly Cloudy",
    ...
  },
  "tips": {
    "outfit_suggestions": [...],
    "fabric_recommendations": [...],
    "accessories": [...],
    "sustainability_tip": "..."
  }
}
```

## 🌐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
WEATHER_API_KEY=your_openweathermap_api_key
```

Get a free API key from [OpenWeatherMap](https://openweathermap.org/api). The app uses mock data if no API key is provided.

## 🎯 Features in Detail

### Persistent Theme System
- Light and dark modes
- Stored in localStorage
- Smooth transitions between themes
- System-wide consistency

### LocalStorage Data Persistence
- **Wardrobe Items**: Stored in `wardrobeItems`
- **Eco Tasks**: Stored in `ecoTasks`
- **Theme Preference**: Stored in `theme`

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible mobile navigation
- Optimized layouts for all screen sizes

### Animations
- Framer Motion for complex animations
- CSS transitions for simple effects
- Loading states with spinners
- Smooth page transitions

## 🔧 Customization

### Adding New API Endpoints

1. Add endpoint in `backend/app.py`
2. Create API function in `frontend/src/utils/api.js`
3. Use in components

### Styling

- Modify `tailwind.config.js` for custom colors/animations
- Edit `src/index.css` for global styles
- Use Tailwind classes for component styling

### AI Integration

Replace placeholder AI logic in `backend/app.py` with real AI APIs:
- OpenAI GPT-4 Vision for image analysis
- OpenAI GPT-4 for chat responses
- Custom ML models

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- Weather API requires API key for real data (mock data used by default)
- AI responses are placeholder logic (integrate real AI for production)
- Image analysis is simulated (needs ML model integration)

## 🚀 Future Enhancements

- [ ] User authentication and accounts
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real AI model integration
- [ ] Social sharing features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Community features and forums

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for sustainable fashion**
