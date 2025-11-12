import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: '💬',
      title: 'AI Chatbot',
      description: 'Get personalized fashion advice and sustainable wardrobe tips',
      link: '/chatbot',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      iconGradient: 'from-blue-400 to-indigo-500',
      shadow: 'shadow-blue-500/50'
    },
    {
      icon: '📸',
      title: 'Outfit Analyzer',
      description: 'Upload photos and receive AI-powered style insights',
      link: '/analyzer',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      iconGradient: 'from-purple-400 to-pink-500',
      shadow: 'shadow-purple-500/50'
    },
    {
      icon: '🌤️',
      title: 'Energy Tips',
      description: 'Weather-based outfit suggestions for every season',
      link: '/energy-tips',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      iconGradient: 'from-orange-400 to-red-500',
      shadow: 'shadow-orange-500/50'
    },
    {
      icon: '👔',
      title: 'Outfit Organizer',
      description: 'Manage your wardrobe items digitally',
      link: '/organizer',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      iconGradient: 'from-green-400 to-teal-500',
      shadow: 'shadow-green-500/50'
    },
    {
      icon: '🎯',
      title: 'Seasonal Quiz',
      description: 'Discover your perfect seasonal style profile',
      link: '/quiz',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      iconGradient: 'from-indigo-400 to-purple-500',
      shadow: 'shadow-indigo-500/50'
    },
    {
      icon: '🌱',
      title: 'Sustainable Planner',
      description: 'Track your eco-friendly fashion goals',
      link: '/planner',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      iconGradient: 'from-emerald-400 to-green-500',
      shadow: 'shadow-emerald-500/50'
    }
  ];

  return (
    <div className="page-container relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 blur-3xl opacity-30 animate-pulse"></div>
              <h1 className="relative text-6xl sm:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
                Seasonal Wardrobe
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Your AI-powered companion for <span className="font-semibold text-primary-600 dark:text-primary-400">sustainable fashion</span> choices across all seasons.
            <br className="hidden sm:block" />
            Build a conscious wardrobe that reflects your style while caring for our planet 🌿
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Link
              to="/chatbot"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start Chat</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/analyzer"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Analyze Outfit
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={feature.link}
                className="group relative block h-full"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
                
                {/* Card */}
                <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {/* Icon */}
                  <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${feature.shadow}`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Explore</span>
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative overflow-hidden rounded-3xl mb-16"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="relative px-8 py-16 text-center text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Transform Your Wardrobe?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start your sustainable fashion journey today with personalized AI recommendations,
              weather-based outfit suggestions, and tools to organize your wardrobe efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/chatbot"
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Chat with AI Assistant
              </Link>
              <Link
                to="/analyzer"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
              >
                Analyze an Outfit
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '7+', label: 'Features', icon: '✨', color: 'from-blue-500 to-cyan-500' },
            { number: '100%', label: 'Sustainable', icon: '🌿', color: 'from-green-500 to-emerald-500' },
            { number: '24/7', label: 'AI Support', icon: '🤖', color: 'from-purple-500 to-pink-500' },
            { number: '∞', label: 'Possibilities', icon: '🚀', color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="group relative"
            >
              {/* Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity`}></div>
              
              {/* Card */}
              <div className="relative text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all transform group-hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;
