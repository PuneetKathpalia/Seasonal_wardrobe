import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OutfitOrganizer = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', season: '', color: '' });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('wardrobeItems');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wardrobeItems', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      setItems(items.map(item => 
        item.id === editingId ? { ...form, id: editingId } : item
      ));
      setEditingId(null);
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }

    setForm({ name: '', category: '', season: '', color: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter || item.season === filter);

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Seasons'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Brown', 'Gray', 'Pink', 'Purple'];

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="section-title">Outfit Organizer</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your wardrobe items digitally and keep track of what you own
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add/Edit Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Item Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., Blue Denim Jacket"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Season</label>
                  <select
                    value={form.season}
                    onChange={(e) => setForm({ ...form, season: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select season</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <select
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select color</option>
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-2">
                  <button type="submit" className="btn-primary flex-1">
                    {editingId ? 'Update' : 'Add Item'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setForm({ name: '', category: '', season: '', color: '' });
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Wardrobe ({filteredItems.length})</h2>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="all">All Items</option>
                  <optgroup label="Categories">
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Seasons">
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <div className="text-6xl mb-4">👔</div>
                  <p>No items yet. Start adding to your wardrobe!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm">
                            {item.category}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm">
                            {item.season}
                          </span>
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm">
                            {item.color}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
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

            {/* Stats */}
            {items.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="card text-center">
                  <div className="text-3xl font-bold text-primary-600">{items.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(items.map(i => i.category)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {new Set(items.map(i => i.color)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Colors</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {new Set(items.map(i => i.season)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Seasons</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitOrganizer;
