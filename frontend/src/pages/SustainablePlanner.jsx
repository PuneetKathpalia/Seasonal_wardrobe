import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SustainablePlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [category, setCategory] = useState('reduce');

  useEffect(() => {
    const saved = localStorage.getItem('ecoTasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const categories = {
    reduce: { icon: '♻️', label: 'Reduce', color: 'green' },
    reuse: { icon: '🔄', label: 'Reuse', color: 'blue' },
    recycle: { icon: '🌍', label: 'Recycle', color: 'purple' },
    repair: { icon: '🔧', label: 'Repair', color: 'orange' }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const ecoTips = [
    { icon: '👗', tip: 'Buy second-hand clothing to reduce waste' },
    { icon: '🧵', tip: 'Learn basic sewing to repair damaged items' },
    { icon: '🌿', tip: 'Choose natural, organic fabrics' },
    { icon: '💧', tip: 'Wash clothes in cold water to save energy' },
    { icon: '☀️', tip: 'Air-dry clothes instead of using a dryer' },
    { icon: '🎁', tip: 'Organize clothing swaps with friends' }
  ];

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="section-title">Sustainable Fashion Planner</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your eco-friendly fashion goals and build sustainable habits
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Add Task & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Task Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Add Eco Goal</h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Description</label>
                  <textarea
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="e.g., Donate unused clothes to charity"
                    className="input-field resize-none"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categories).map(([key, { icon, label, color }]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCategory(key)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          category === key
                            ? `border-${color}-500 bg-${color}-50 dark:bg-${color}-900/20`
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-2xl mb-1">{icon}</div>
                        <div className="text-sm font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Add Goal
                </button>
              </form>
            </div>

            {/* Progress Stats */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h3 className="text-xl font-bold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion Rate</span>
                    <span className="font-bold">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{tasks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{completedCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco Tips */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">💡 Eco Tips</h3>
              <div className="space-y-3">
                {ecoTips.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tasks List */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Your Eco Goals</h2>

              {tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <div className="text-6xl mb-4">🌱</div>
                  <p>No goals yet. Start your sustainable fashion journey!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[700px] overflow-y-auto">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        task.completed
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            task.completed
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                          }`}
                        >
                          {task.completed && <span className="text-white text-sm">✓</span>}
                        </button>

                        <div className="flex-1">
                          <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                            {task.text}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xl">{categories[task.category].icon}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {categories[task.category].label}
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-500">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            {tasks.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {Object.entries(categories).map(([key, { icon, label, color }]) => {
                  const count = tasks.filter(t => t.category === key).length;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="card text-center"
                    >
                      <div className="text-4xl mb-2">{icon}</div>
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainablePlanner;
