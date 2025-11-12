from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
import requests
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

chat_sessions = {}


WEATHER_API_KEY = os.getenv('WEATHER_API_KEY', 'your_api_key_here')

@app.route('/')
def home():
    return jsonify({
        "message": "Seasonal Wardrobe API",
        "version": "1.0.0",
        "endpoints": ["/chat", "/analyze", "/ask", "/weather"]
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chatbot conversations"""
    try:
        data = request.json
        message = data.get('message', '')
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        # Initialize session if new
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Add user message to history
        chat_sessions[session_id].append({
            "role": "user",
            "content": message,
            "timestamp": datetime.now().isoformat()
        })
        
        # Generate AI response (placeholder logic)
        bot_response = generate_chat_response(message, chat_sessions[session_id])
        
        # Add bot response to history
        chat_sessions[session_id].append({
            "role": "assistant",
            "content": bot_response,
            "timestamp": datetime.now().isoformat()
        })
        
        return jsonify({
            "success": True,
            "response": bot_response,
            "session_id": session_id,
            "history": chat_sessions[session_id]
        })
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze outfit image"""
    try:
        data = request.json
        image_base64 = data.get('image', '')
        
        if not image_base64:
            return jsonify({"success": False, "error": "No image provided"}), 400
        
        # Placeholder AI analysis
        analysis = analyze_outfit_image(image_base64)
        
        return jsonify({
            "success": True,
            "analysis": analysis
        })
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/ask', methods=['POST'])
def ask():
    """Answer questions about outfit image"""
    try:
        data = request.json
        image_base64 = data.get('image', '')
        question = data.get('question', '')
        
        if not image_base64 or not question:
            return jsonify({"success": False, "error": "Image and question required"}), 400
        
        # Placeholder AI response
        answer = answer_outfit_question(image_base64, question)
        
        return jsonify({
            "success": True,
            "answer": answer
        })
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/weather', methods=['GET'])
def weather():
    """Get weather data and outfit recommendations"""
    try:
        city = request.args.get('city', 'London')
        
        # Fetch weather data
        weather_data = fetch_weather_data(city)
        
        if not weather_data:
            return jsonify({"success": False, "error": "Could not fetch weather"}), 500
        
        # Generate outfit tips based on weather
        tips = generate_weather_tips(weather_data)
        
        return jsonify({
            "success": True,
            "weather": weather_data,
            "tips": tips
        })
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Helper functions

def generate_chat_response(message, history):
    """Generate chatbot response (placeholder)"""
    message_lower = message.lower()
    
    # Simple rule-based responses
    if any(word in message_lower for word in ['hello', 'hi', 'hey']):
        return "Hello! I'm your Seasonal Wardrobe assistant. How can I help you with sustainable fashion today?"
    
    elif any(word in message_lower for word in ['weather', 'temperature', 'climate']):
        return "I can help you choose outfits based on weather! Check out the Energy Tips page for weather-based recommendations."
    
    elif any(word in message_lower for word in ['sustainable', 'eco', 'environment']):
        return "Great question about sustainability! Consider buying second-hand, choosing natural fabrics, and building a capsule wardrobe. The Sustainable Planner can help you track eco-friendly fashion goals."
    
    elif any(word in message_lower for word in ['outfit', 'wear', 'clothing']):
        return "I can help analyze your outfits! Try the Outfit Analyzer to upload photos and get personalized recommendations."
    
    elif any(word in message_lower for word in ['organize', 'wardrobe']):
        return "Visit the Outfit Organizer page to manage your wardrobe items digitally and keep track of what you own!"
    
    elif any(word in message_lower for word in ['season', 'spring', 'summer', 'fall', 'winter', 'autumn']):
        return "Each season calls for different fabrics and styles! Take our Seasonal Quiz to discover your perfect seasonal style profile."
    
    else:
        return f"That's an interesting question about '{message}'. I'd recommend exploring our Outfit Analyzer for fashion insights, or checking Energy Tips for weather-based outfit suggestions!"

def analyze_outfit_image(image_base64):
    """Analyze outfit from image (placeholder)"""
    # In production, this would use an AI vision model
    return {
        "style": "Casual Contemporary",
        "colors": ["Navy", "White", "Beige"],
        "season": "Spring/Fall",
        "sustainability_score": 7.5,
        "recommendations": [
            "This outfit works great for mild weather (15-20°C)",
            "Consider adding a light cardigan for layering",
            "The color palette is versatile and timeless",
            "To boost sustainability: choose natural fibers like cotton or linen"
        ],
        "occasion": "Perfect for casual outings, coffee dates, or weekend activities",
        "care_tips": [
            "Wash in cold water to save energy",
            "Air dry when possible instead of using a dryer",
            "Store properly to extend garment lifespan"
        ]
    }

def answer_outfit_question(image_base64, question):
    """Answer specific questions about outfit (placeholder)"""
    question_lower = question.lower()
    
    if 'color' in question_lower:
        return "The outfit features a harmonious color palette with neutral tones. Navy and beige work well together for a sophisticated, versatile look suitable for multiple seasons."
    
    elif 'season' in question_lower:
        return "This outfit is ideal for spring and fall transitions. The layers allow you to adjust to changing temperatures throughout the day."
    
    elif 'occasion' in question_lower:
        return "This is a versatile outfit suitable for casual professional settings, weekend outings, coffee meetups, or relaxed social events."
    
    elif 'sustainable' in question_lower or 'eco' in question_lower:
        return "To make this outfit more sustainable: choose pieces made from organic or recycled materials, buy second-hand when possible, and invest in quality items that last longer."
    
    else:
        return f"Based on the outfit and your question about '{question}', I'd say this is a well-balanced ensemble that offers versatility and style. The combination works well for transitional weather and various casual occasions."

def fetch_weather_data(city):
    """Fetch weather data from OpenWeatherMap API"""
    try:
        # Mock data if no API key
        if WEATHER_API_KEY == 'your_api_key_here':
            return {
                "city": city,
                "temperature": 18,
                "feels_like": 16,
                "condition": "Partly Cloudy",
                "humidity": 65,
                "wind_speed": 12,
                "description": "partly cloudy with mild temperatures"
            }
        
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            return {
                "city": city,
                "temperature": round(data['main']['temp']),
                "feels_like": round(data['main']['feels_like']),
                "condition": data['weather'][0]['main'],
                "humidity": data['main']['humidity'],
                "wind_speed": round(data['wind']['speed'] * 3.6),  # m/s to km/h
                "description": data['weather'][0]['description']
            }
        else:
            return None
    
    except Exception as e:
        print(f"Weather API error: {e}")
        # Return mock data on error
        return {
            "city": city,
            "temperature": 18,
            "feels_like": 16,
            "condition": "Clear",
            "humidity": 60,
            "wind_speed": 10,
            "description": "clear sky"
        }

def generate_weather_tips(weather_data):
    """Generate outfit tips based on weather"""
    temp = weather_data['temperature']
    condition = weather_data['condition'].lower()
    
    tips = {
        "outfit_suggestions": [],
        "fabric_recommendations": [],
        "accessories": [],
        "sustainability_tip": ""
    }
    
    # Temperature-based suggestions
    if temp < 5:
        tips["outfit_suggestions"] = [
            "Heavy winter coat or parka",
            "Thick sweater or thermal layers",
            "Warm pants or insulated jeans",
            "Winter boots"
        ]
        tips["fabric_recommendations"] = ["Wool", "Fleece", "Down", "Thermal materials"]
        tips["accessories"] = ["Scarf", "Gloves", "Beanie", "Warm socks"]
    
    elif temp < 15:
        tips["outfit_suggestions"] = [
            "Light jacket or cardigan",
            "Long-sleeve shirt or sweater",
            "Jeans or trousers",
            "Closed-toe shoes"
        ]
        tips["fabric_recommendations"] = ["Cotton", "Light wool", "Denim", "Knit fabrics"]
        tips["accessories"] = ["Light scarf", "Crossbody bag"]
    
    elif temp < 25:
        tips["outfit_suggestions"] = [
            "T-shirt or blouse",
            "Light pants or jeans",
            "Sneakers or loafers",
            "Optional light cardigan"
        ]
        tips["fabric_recommendations"] = ["Cotton", "Linen blend", "Light denim"]
        tips["accessories"] = ["Sunglasses", "Tote bag"]
    
    else:
        tips["outfit_suggestions"] = [
            "Breathable t-shirt or tank top",
            "Shorts or light dress",
            "Sandals or canvas shoes",
            "Sun hat"
        ]
        tips["fabric_recommendations"] = ["Linen", "Cotton", "Breathable synthetics"]
        tips["accessories"] = ["Sunglasses", "Sun hat", "Light bag"]
    
    # Condition-based additions
    if 'rain' in condition:
        tips["accessories"].extend(["Umbrella", "Waterproof jacket"])
    
    if 'snow' in condition:
        tips["accessories"].extend(["Waterproof boots", "Insulated gloves"])
    
    # Sustainability tip
    tips["sustainability_tip"] = "Choose natural, breathable fabrics when possible. Layer clothing instead of overheating to save energy. Consider second-hand options for seasonal items you'll only wear occasionally."
    
    return tips

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
