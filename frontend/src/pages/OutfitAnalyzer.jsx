import { useState } from 'react';
import { motion } from 'framer-motion';
import { api, fileToBase64 } from '../utils/api';

const OutfitAnalyzer = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setError(null);
    setAnalysis(null);
    setAnswer(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Convert to base64 for API
    try {
      const base64 = await fileToBase64(file);
      setImageData(base64);
    } catch (err) {
      setError('Failed to process image');
    }
  };

  const handleAnalyze = async () => {
    if (!imageData) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await api.analyzeOutfit(imageData);
      
      if (response.success) {
        setAnalysis(response.analysis);
      } else {
        setError('Failed to analyze outfit. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!imageData || !question.trim()) return;

    setIsAsking(true);
    setError(null);

    try {
      const response = await api.askAboutOutfit(imageData, question);
      
      if (response.success) {
        setAnswer(response.answer);
        setQuestion('');
      } else {
        setError('Failed to get answer. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="section-title">Outfit Analyzer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload a photo of your outfit to get AI-powered style insights and recommendations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Upload Outfit Photo</h2>
            
            <div className="mb-4">
              <label className="block w-full">
                <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  imagePreview
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500'
                }`}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  ) : (
                    <>
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {imageData && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Outfit'}
              </button>
            )}

            {error && (
              <div className="mt-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg p-3 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="spinner mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Analyzing your outfit...</p>
              </div>
            ) : analysis ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-semibold text-lg mb-2">Style</h3>
                  <p className="text-gray-600 dark:text-gray-400">{analysis.style}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.colors.map((color) => (
                      <span key={color} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Best Season</h3>
                  <p className="text-gray-600 dark:text-gray-400">{analysis.season}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Sustainability Score</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                        style={{ width: `${analysis.sustainability_score * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{analysis.sustainability_score}/10</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span>✓</span>
                        <span className="text-gray-600 dark:text-gray-400">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Occasion</h3>
                  <p className="text-gray-600 dark:text-gray-400">{analysis.occasion}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p>Upload an outfit to see the analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Ask Questions Section */}
        {imageData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mt-6"
          >
            <h2 className="text-2xl font-bold mb-4">Ask About This Outfit</h2>
            <form onSubmit={handleAsk} className="flex space-x-2 mb-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What occasions is this outfit suitable for?"
                className="input-field flex-1"
                disabled={isAsking}
              />
              <button
                type="submit"
                disabled={isAsking || !question.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {isAsking ? 'Asking...' : 'Ask'}
              </button>
            </form>

            {answer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4"
              >
                <h3 className="font-semibold mb-2">Answer:</h3>
                <p className="text-gray-700 dark:text-gray-300">{answer}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OutfitAnalyzer;
