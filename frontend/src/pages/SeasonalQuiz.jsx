import { useState } from 'react';
import { motion } from 'framer-motion';

const SeasonalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What's your preferred color palette?",
      options: [
        { text: "Soft pastels and neutrals", season: "spring", points: 4 },
        { text: "Bright, vibrant colors", season: "summer", points: 4 },
        { text: "Warm earth tones", season: "autumn", points: 4 },
        { text: "Deep, rich jewel tones", season: "winter", points: 4 }
      ]
    },
    {
      question: "Which fabric do you gravitate towards?",
      options: [
        { text: "Light cotton and linen", season: "spring", points: 3 },
        { text: "Breathable, airy materials", season: "summer", points: 3 },
        { text: "Cozy knits and wool", season: "autumn", points: 3 },
        { text: "Luxurious velvet and cashmere", season: "winter", points: 3 }
      ]
    },
    {
      question: "What's your ideal outfit style?",
      options: [
        { text: "Fresh and romantic", season: "spring", points: 4 },
        { text: "Casual and breezy", season: "summer", points: 4 },
        { text: "Layered and textured", season: "autumn", points: 4 },
        { text: "Structured and elegant", season: "winter", points: 4 }
      ]
    },
    {
      question: "Which accessory speaks to you?",
      options: [
        { text: "Delicate florals and pearls", season: "spring", points: 3 },
        { text: "Statement sunglasses", season: "summer", points: 3 },
        { text: "Leather bags and scarves", season: "autumn", points: 3 },
        { text: "Bold jewelry and hats", season: "winter", points: 3 }
      ]
    },
    {
      question: "What's your shopping preference?",
      options: [
        { text: "Timeless basics I can mix and match", season: "spring", points: 2 },
        { text: "Trendy pieces for the current season", season: "summer", points: 2 },
        { text: "Quality investment pieces", season: "autumn", points: 2 },
        { text: "Unique statement items", season: "winter", points: 2 }
      ]
    }
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const scores = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    answers.forEach(answer => {
      scores[answer.season] += answer.points;
    });

    const maxScore = Math.max(...Object.values(scores));
    const topSeason = Object.keys(scores).find(season => scores[season] === maxScore);

    return { season: topSeason, scores };
  };

  const getSeasonInfo = (season) => {
    const info = {
      spring: {
        icon: '🌸',
        title: 'Spring Aesthetic',
        description: 'You embody freshness and renewal! Your style is light, airy, and romantic with soft pastels and delicate details.',
        colors: ['Soft Pink', 'Mint Green', 'Lavender', 'Peach', 'Light Blue'],
        tips: [
          'Embrace floral prints and patterns',
          'Layer light cardigans and jackets',
          'Choose breathable natural fabrics',
          'Add feminine, delicate accessories'
        ]
      },
      summer: {
        icon: '☀️',
        title: 'Summer Vibes',
        description: 'You radiate bright, bold energy! Your style is vibrant, carefree, and full of life with confident color choices.',
        colors: ['Coral', 'Turquoise', 'Lemon Yellow', 'Hot Pink', 'Ocean Blue'],
        tips: [
          'Go for lightweight, breathable fabrics',
          'Experiment with bold patterns and prints',
          'Choose moisture-wicking materials',
          'Accessorize with sunglasses and hats'
        ]
      },
      autumn: {
        icon: '🍂',
        title: 'Autumn Warmth',
        description: 'You embrace cozy sophistication! Your style is warm, rich, and textured with earthy tones and layered looks.',
        colors: ['Rust', 'Olive Green', 'Burnt Orange', 'Deep Brown', 'Mustard'],
        tips: [
          'Layer knitwear and textured pieces',
          'Choose rich, warm color palettes',
          'Invest in quality leather accessories',
          'Embrace cozy, comfortable fabrics'
        ]
      },
      winter: {
        icon: '❄️',
        title: 'Winter Elegance',
        description: 'You exude bold sophistication! Your style is dramatic, structured, and refined with deep jewel tones and sharp lines.',
        colors: ['Deep Purple', 'Royal Blue', 'Emerald', 'Crimson', 'Black'],
        tips: [
          'Choose structured, tailored pieces',
          'Opt for luxurious, rich fabrics',
          'Make statements with bold accessories',
          'Layer for both style and warmth'
        ]
      }
    };

    return info[season];
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const { season, scores } = calculateResults();
    const info = getSeasonInfo(season);

    return (
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <div className="text-8xl mb-6">{info.icon}</div>
            <h1 className="text-4xl font-bold mb-4">{info.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {info.description}
            </p>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(scores).map(([s, score]) => (
                <div key={s} className={`p-4 rounded-lg ${s === season ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm capitalize">{s}</div>
                </div>
              ))}
            </div>

            {/* Color Palette */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Color Palette</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {info.colors.map(color => (
                  <span
                    key={color}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 rounded-full font-medium"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Style Tips */}
            <div className="mb-8 text-left">
              <h2 className="text-2xl font-bold mb-4 text-center">Style Tips for You</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {info.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-primary-600">✓</span>
                    <span>{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <button onClick={restart} className="btn-primary">
              Take Quiz Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="section-title">Seasonal Style Quiz</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover your perfect seasonal style profile
          </p>
        </motion.div>

        <div className="card">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <span className="font-medium">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalQuiz;
