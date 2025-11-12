const API_BASE_URL = 'http://localhost:5000';

export const api = {
  // Chat endpoint
  async chat(message, sessionId) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, session_id: sessionId }),
    });
    return response.json();
  },

  // Analyze outfit image
  async analyzeOutfit(imageBase64) {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });
    return response.json();
  },

  // Ask question about outfit
  async askAboutOutfit(imageBase64, question) {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64, question }),
    });
    return response.json();
  },

  // Get weather and outfit tips
  async getWeatherTips(city) {
    const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
    return response.json();
  },
};

// Helper to convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
