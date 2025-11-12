// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seasonal-wardrobe';

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected successfully'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));

// // MongoDB Schemas
// const chatSessionSchema = new mongoose.Schema({
//   sessionId: { type: String, required: true, unique: true },
//   messages: [{
//     role: { type: String, enum: ['user', 'assistant'], required: true },
//     content: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now }
//   }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// const outfitAnalysisSchema = new mongoose.Schema({
//   imageHash: String,
//   analysis: Object,
//   createdAt: { type: Date, default: Date.now }
// });

// const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
// const OutfitAnalysis = mongoose.model('OutfitAnalysis', outfitAnalysisSchema);

// // Weather API Key
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_api_key_here';

// // ==================== ROUTES ====================

// // Root endpoint
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Seasonal Wardrobe API - Node.js + Express + MongoDB',
//     version: '2.0.0',
//     endpoints: ['/chat', '/analyze', '/ask', '/weather', '/chat-history'],
//     database: 'MongoDB',
//     status: 'Running'
//   });
// });

// // Chat endpoint - POST /chat
// app.post('/chat', async (req, res) => {
//   try {
//     const { message, session_id } = req.body;

//     if (!message) {
//       return res.status(400).json({ success: false, error: 'Message is required' });
//     }

//     const sessionId = session_id || `session-${Date.now()}`;

//     // Find or create session
//     let session = await ChatSession.findOne({ sessionId });
    
//     if (!session) {
//       session = new ChatSession({
//         sessionId,
//         messages: []
//       });
//     }

//     // Add user message
//     const userMessage = {
//       role: 'user',
//       content: message,
//       timestamp: new Date()
//     };
//     session.messages.push(userMessage);

//     // Generate bot response
//     const botResponse = generateChatResponse(message, session.messages);

//     // Add bot message
//     const assistantMessage = {
//       role: 'assistant',
//       content: botResponse,
//       timestamp: new Date()
//     };
//     session.messages.push(assistantMessage);

//     session.updatedAt = new Date();
//     await session.save();

//     res.json({
//       success: true,
//       response: botResponse,
//       session_id: sessionId,
//       history: session.messages
//     });

//   } catch (error) {
//     console.error('Chat error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Get chat history - GET /chat-history/:sessionId
// app.get('/chat-history/:sessionId', async (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     const session = await ChatSession.findOne({ sessionId });

//     if (!session) {
//       return res.json({ success: true, history: [] });
//     }

//     res.json({
//       success: true,
//       history: session.messages,
//       sessionId: session.sessionId
//     });

//   } catch (error) {
//     console.error('Chat history error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Analyze outfit - POST /analyze
// app.post('/analyze', async (req, res) => {
//   try {
//     const { image } = req.body;

//     if (!image) {
//       return res.status(400).json({ success: false, error: 'Image is required' });
//     }

//     // Generate analysis (mock - replace with real AI)
//     const analysis = analyzeOutfitImage(image);

//     // Save to database
//     const outfitAnalysis = new OutfitAnalysis({
//       imageHash: hashImage(image),
//       analysis
//     });
//     await outfitAnalysis.save();

//     res.json({
//       success: true,
//       analysis
//     });

//   } catch (error) {
//     console.error('Analysis error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Ask about outfit - POST /ask
// app.post('/ask', async (req, res) => {
//   try {
//     const { image, question } = req.body;

//     if (!image || !question) {
//       return res.status(400).json({ 
//         success: false, 
//         error: 'Image and question are required' 
//       });
//     }

//     // Generate answer (mock - replace with real AI)
//     const answer = answerOutfitQuestion(image, question);

//     res.json({
//       success: true,
//       answer
//     });

//   } catch (error) {
//     console.error('Ask error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Weather endpoint - GET /weather
// app.get('/weather', async (req, res) => {
//   try {
//     const city = req.query.city || 'London';

//     // Fetch weather data
//     const weatherData = await fetchWeatherData(city);

//     if (!weatherData) {
//       return res.status(500).json({ 
//         success: false, 
//         error: 'Could not fetch weather data' 
//       });
//     }

//     // Generate outfit tips
//     const tips = generateWeatherTips(weatherData);

//     res.json({
//       success: true,
//       weather: weatherData,
//       tips
//     });

//   } catch (error) {
//     console.error('Weather error:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ==================== HELPER FUNCTIONS ====================

// function generateChatResponse(message, history) {
//   const messageLower = message.toLowerCase();

//   // Simple rule-based responses
//   if (/hello|hi|hey/i.test(messageLower)) {
//     return "Hello! I'm your Seasonal Wardrobe assistant. How can I help you with sustainable fashion today?";
//   }
  
//   if (/weather|temperature|climate/i.test(messageLower)) {
//     return "I can help you choose outfits based on weather! Check out the Energy Tips page for weather-based recommendations.";
//   }
  
//   if (/sustainable|eco|environment/i.test(messageLower)) {
//     return "Great question about sustainability! Consider buying second-hand, choosing natural fabrics, and building a capsule wardrobe. The Sustainable Planner can help you track eco-friendly fashion goals.";
//   }
  
//   if (/outfit|wear|clothing/i.test(messageLower)) {
//     return "I can help analyze your outfits! Try the Outfit Analyzer to upload photos and get personalized recommendations.";
//   }
  
//   if (/organize|wardrobe/i.test(messageLower)) {
//     return "Visit the Outfit Organizer page to manage your wardrobe items digitally and keep track of what you own!";
//   }
  
//   if (/season|spring|summer|fall|winter|autumn/i.test(messageLower)) {
//     return "Each season calls for different fabrics and styles! Take our Seasonal Quiz to discover your perfect seasonal style profile.";
//   }
  
//   return `That's an interesting question about "${message}". I'd recommend exploring our Outfit Analyzer for fashion insights, or checking Energy Tips for weather-based outfit suggestions!`;
// }

// function analyzeOutfitImage(imageBase64) {
//   // Mock analysis - replace with real AI (e.g., OpenAI Vision API)
//   return {
//     style: "Casual Contemporary",
//     colors: ["Navy", "White", "Beige"],
//     season: "Spring/Fall",
//     sustainability_score: 7.5,
//     recommendations: [
//       "This outfit works great for mild weather (15-20°C)",
//       "Consider adding a light cardigan for layering",
//       "The color palette is versatile and timeless",
//       "To boost sustainability: choose natural fibers like cotton or linen"
//     ],
//     occasion: "Perfect for casual outings, coffee dates, or weekend activities",
//     care_tips: [
//       "Wash in cold water to save energy",
//       "Air dry when possible instead of using a dryer",
//       "Store properly to extend garment lifespan"
//     ]
//   };
// }

// function answerOutfitQuestion(imageBase64, question) {
//   const questionLower = question.toLowerCase();

//   if (/color/i.test(questionLower)) {
//     return "The outfit features a harmonious color palette with neutral tones. Navy and beige work well together for a sophisticated, versatile look suitable for multiple seasons.";
//   }
  
//   if (/season/i.test(questionLower)) {
//     return "This outfit is ideal for spring and fall transitions. The layers allow you to adjust to changing temperatures throughout the day.";
//   }
  
//   if (/occasion/i.test(questionLower)) {
//     return "This is a versatile outfit suitable for casual professional settings, weekend outings, coffee meetups, or relaxed social events.";
//   }
  
//   if (/sustainable|eco/i.test(questionLower)) {
//     return "To make this outfit more sustainable: choose pieces made from organic or recycled materials, buy second-hand when possible, and invest in quality items that last longer.";
//   }
  
//   return `Based on the outfit and your question about "${question}", I'd say this is a well-balanced ensemble that offers versatility and style. The combination works well for transitional weather and various casual occasions.`;
// }

// async function fetchWeatherData(city) {
//   try {
//     // Mock data if no API key
//     if (WEATHER_API_KEY === 'your_api_key_here') {
//       return {
//         city: city,
//         temperature: 18,
//         feels_like: 16,
//         condition: "Partly Cloudy",
//         humidity: 65,
//         wind_speed: 12,
//         description: "partly cloudy with mild temperatures"
//       };
//     }

//     // Real API call
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
//     const response = await axios.get(url, { timeout: 5000 });
    
//     if (response.status === 200) {
//       const data = response.data;
//       return {
//         city: city,
//         temperature: Math.round(data.main.temp),
//         feels_like: Math.round(data.main.feels_like),
//         condition: data.weather[0].main,
//         humidity: data.main.humidity,
//         wind_speed: Math.round(data.wind.speed * 3.6), // m/s to km/h
//         description: data.weather[0].description
//       };
//     }
    
//     return null;

//   } catch (error) {
//     console.error('Weather API error:', error.message);
//     // Return mock data on error
//     return {
//       city: city,
//       temperature: 18,
//       feels_like: 16,
//       condition: "Clear",
//       humidity: 60,
//       wind_speed: 10,
//       description: "clear sky"
//     };
//   }
// }

// function generateWeatherTips(weatherData) {
//   const temp = weatherData.temperature;
//   const condition = weatherData.condition.toLowerCase();

//   const tips = {
//     outfit_suggestions: [],
//     fabric_recommendations: [],
//     accessories: [],
//     sustainability_tip: ""
//   };

//   // Temperature-based suggestions
//   if (temp < 5) {
//     tips.outfit_suggestions = [
//       "Heavy winter coat or parka",
//       "Thick sweater or thermal layers",
//       "Warm pants or insulated jeans",
//       "Winter boots"
//     ];
//     tips.fabric_recommendations = ["Wool", "Fleece", "Down", "Thermal materials"];
//     tips.accessories = ["Scarf", "Gloves", "Beanie", "Warm socks"];
//   } else if (temp < 15) {
//     tips.outfit_suggestions = [
//       "Light jacket or cardigan",
//       "Long-sleeve shirt or sweater",
//       "Jeans or trousers",
//       "Closed-toe shoes"
//     ];
//     tips.fabric_recommendations = ["Cotton", "Light wool", "Denim", "Knit fabrics"];
//     tips.accessories = ["Light scarf", "Crossbody bag"];
//   } else if (temp < 25) {
//     tips.outfit_suggestions = [
//       "T-shirt or blouse",
//       "Light pants or jeans",
//       "Sneakers or loafers",
//       "Optional light cardigan"
//     ];
//     tips.fabric_recommendations = ["Cotton", "Linen blend", "Light denim"];
//     tips.accessories = ["Sunglasses", "Tote bag"];
//   } else {
//     tips.outfit_suggestions = [
//       "Breathable t-shirt or tank top",
//       "Shorts or light dress",
//       "Sandals or canvas shoes",
//       "Sun hat"
//     ];
//     tips.fabric_recommendations = ["Linen", "Cotton", "Breathable synthetics"];
//     tips.accessories = ["Sunglasses", "Sun hat", "Light bag"];
//   }

//   // Condition-based additions
//   if (condition.includes('rain')) {
//     tips.accessories.push("Umbrella", "Waterproof jacket");
//   }

//   if (condition.includes('snow')) {
//     tips.accessories.push("Waterproof boots", "Insulated gloves");
//   }

//   // Sustainability tip
//   tips.sustainability_tip = "Choose natural, breathable fabrics when possible. Layer clothing instead of overheating to save energy. Consider second-hand options for seasonal items you'll only wear occasionally.";

//   return tips;
// }

// function hashImage(imageBase64) {
//   // Simple hash function for image tracking
//   return require('crypto')
//     .createHash('md5')
//     .update(imageBase64.substring(0, 1000))
//     .digest('hex');
// }

// // ==================== ERROR HANDLING ====================

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Endpoint not found',
//     availableEndpoints: ['/', '/chat', '/analyze', '/ask', '/weather', '/chat-history/:sessionId']
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     error: 'Internal server error',
//     message: err.message
//   });
// });

// // ==================== START SERVER ====================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`
// ╔═══════════════════════════════════════════════════════════╗
// ║                                                           ║
// ║   🌿 Seasonal Wardrobe API Server                        ║
// ║                                                           ║
// ║   Server:    http://localhost:${PORT}                        ║
// ║   Database:  MongoDB                                      ║
// ║   Version:   2.0.0                                        ║
// ║                                                           ║
// ║   Endpoints:                                              ║
// ║   - POST   /chat                                          ║
// ║   - GET    /chat-history/:sessionId                       ║
// ║   - POST   /analyze                                       ║
// ║   - POST   /ask                                           ║
// ║   - GET    /weather?city=...                              ║
// ║                                                           ║
// ╚═══════════════════════════════════════════════════════════╝
//   `);
// });

// module.exports = app;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection (connect once globally)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seasonal-wardrobe';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ===== Schemas =====
const chatSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const outfitAnalysisSchema = new mongoose.Schema({
  imageHash: String,
  analysis: Object,
  createdAt: { type: Date, default: Date.now },
});

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
const OutfitAnalysis = mongoose.model('OutfitAnalysis', outfitAnalysisSchema);

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_api_key_here';

// ===== ROUTES =====
app.get('/', (req, res) => {
  res.json({
    message: 'Seasonal Wardrobe API - Node.js + Express + MongoDB',
    version: '2.0.0',
    endpoints: ['/chat', '/analyze', '/ask', '/weather', '/chat-history'],
    status: 'Running',
  });
});

app.post('/chat', async (req, res) => {
  try {
    const { message, session_id } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const sessionId = session_id || `session-${Date.now()}`;
    let session = await ChatSession.findOne({ sessionId });

    if (!session) session = new ChatSession({ sessionId, messages: [] });

    session.messages.push({ role: 'user', content: message });
    const botResponse = generateChatResponse(message);
    session.messages.push({ role: 'assistant', content: botResponse });
    session.updatedAt = new Date();

    await session.save();

    res.json({ success: true, response: botResponse, session_id: sessionId, history: session.messages });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/chat-history/:sessionId', async (req, res) => {
  try {
    const session = await ChatSession.findOne({ sessionId: req.params.sessionId });
    res.json({ success: true, history: session ? session.messages : [] });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/analyze', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ success: false, error: 'Image is required' });

    const analysis = analyzeOutfitImage(image);
    const outfitAnalysis = new OutfitAnalysis({ imageHash: hashImage(image), analysis });
    await outfitAnalysis.save();

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/ask', async (req, res) => {
  try {
    const { image, question } = req.body;
    if (!image || !question) return res.status(400).json({ success: false, error: 'Image and question are required' });

    const answer = answerOutfitQuestion(image, question);
    res.json({ success: true, answer });
  } catch (error) {
    console.error('Ask error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London';
    const weatherData = await fetchWeatherData(city);
    const tips = generateWeatherTips(weatherData);
    res.json({ success: true, weather: weatherData, tips });
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== Helper Functions =====
function generateChatResponse(message) {
  const m = message.toLowerCase();
  if (/hello|hi|hey/.test(m)) return "Hello! I'm your Seasonal Wardrobe assistant 👗";
  if (/weather|temperature|climate/.test(m)) return "I can help you choose outfits based on weather 🌦️";
  if (/sustainable|eco|environment/.test(m)) return "Think eco-friendly 🌱 — try natural fabrics & thrifting!";
  if (/outfit|wear|clothing/.test(m)) return "Try uploading an outfit to get personalized feedback 👕";
  if (/organize|wardrobe/.test(m)) return "Use the Organizer to track your wardrobe digitally 🧥";
  return `That's interesting about "${message}". Check Outfit Analyzer for insights!`;
}

function analyzeOutfitImage() {
  return {
    style: "Casual Contemporary",
    colors: ["Navy", "White", "Beige"],
    season: "Spring/Fall",
    recommendations: ["Try layering with a cardigan", "Natural fabrics = eco win 🌿"],
  };
}

function answerOutfitQuestion(_, question) {
  const q = question.toLowerCase();
  if (/color/.test(q)) return "Neutral tones — very versatile 👌";
  if (/season/.test(q)) return "Perfect for spring or fall weather 🍂🌸";
  return "Great outfit choice — timeless and comfortable!";
}

async function fetchWeatherData(city) {
  try {
    if (WEATHER_API_KEY === 'your_api_key_here') {
      return { city, temperature: 18, condition: 'Partly Cloudy' };
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const { data } = await axios.get(url);
    return {
      city,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
    };
  } catch {
    return { city, temperature: 20, condition: 'Clear' };
  }
}

function generateWeatherTips(weatherData) {
  const temp = weatherData.temperature;
  if (temp < 10) return { tips: "Wear something warm ❄️" };
  if (temp < 25) return { tips: "Light layers and comfy sneakers 👟" };
  return { tips: "Stay cool with breathable fabrics ☀️" };
}

function hashImage(imageBase64) {
  return require('crypto').createHash('md5').update(imageBase64.substring(0, 1000)).digest('hex');
}

// ===== Error Handling =====
app.use((req, res) => res.status(404).json({ success: false, error: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🌿 Seasonal Wardrobe API running at http://localhost:${PORT}\n`);
});

module.exports = app;
