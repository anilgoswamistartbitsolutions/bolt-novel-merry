import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Plus, X, BookOpen, Save, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AddNovel = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: [],
    tags: [],
    status: 'ongoing',
    coverImage: null,
    mature: false,
    language: 'English'
  });
  const [newTag, setNewTag] = useState('');
  const [coverPreview, setCoverPreview] = useState(null);

  const genres = [
    'Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Adventure', 'Historical',
    'Cyberpunk', 'Thriller', 'Contemporary', 'Drama', 'Horror', 'Comedy',
    'Action', 'Slice of Life', 'Supernatural', 'Martial Arts'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novel data:', formData);
    // Handle form submission
  };

  return (
    <div className={`min-h-screen py-8 ${
      theme === 'sepia' ? 'bg-sepia-50' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/author"
              className={`p-2 rounded-lg transition-colors ${
                theme === 'sepia'
                  ? 'text-sepia-700 hover:bg-sepia-100'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
              }`}>
                Add New Novel
              </h1>
              <p className={`text-xl ${
                theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
              }`}>
                Create your next masterpiece
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl shadow-lg p-6 ${
              theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center space-x-2 ${
              theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
            }`}>
              <BookOpen className="w-6 h-6" />
              <span>Basic Information</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cover Upload */}
              <div className="lg:col-span-1">
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Cover Image
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  theme === 'sepia'
                    ? 'border-sepia-300 hover:border-sepia-400'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}>
                  {coverPreview ? (
                    <div className="relative">
                      <img 
                        src={coverPreview} 
                        alt="Cover preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverPreview(null);
                          setFormData(prev => ({ ...prev, coverImage: null }));
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className={`w-12 h-12 mx-auto mb-4 ${
                        theme === 'sepia' ? 'text-sepia-400' : 'text-gray-400'
                      }`} />
                      <p className={`text-sm mb-2 ${
                        theme === 'sepia' ? 'text-sepia-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        Click to upload cover image
                      </p>
                      <p className={`text-xs ${
                        theme === 'sepia' ? 'text-sepia-500' : 'text-gray-500'
                      }`}>
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Novel Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      theme === 'sepia'
                        ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Enter your novel title..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none ${
                      theme === 'sepia'
                        ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    placeholder="Write a compelling description of your novel..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        theme === 'sepia'
                          ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="hiatus">On Hiatus</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        theme === 'sepia'
                          ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="mature"
                    name="mature"
                    checked={formData.mature}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="mature" className={`text-sm font-medium ${
                    theme === 'sepia' ? 'text-sepia-700' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Mature Content (18+)
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Genres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl shadow-lg p-6 ${
              theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
            }`}>
              Genres (Select up to 3)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  disabled={!formData.genre.includes(genre) && formData.genre.length >= 3}
                  className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                    formData.genre.includes(genre)
                      ? 'bg-primary-600 text-white shadow-lg'
                      : formData.genre.length >= 3
                        ? theme === 'sepia'
                          ? 'bg-sepia-200 text-sepia-400 cursor-not-allowed'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : theme === 'sepia'
                          ? 'bg-sepia-200 text-sepia-700 hover:bg-sepia-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl shadow-lg p-6 ${
              theme === 'sepia' ? 'bg-sepia-100' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'sepia' ? 'text-sepia-800' : 'text-gray-900 dark:text-white'
            }`}>
              Tags
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  theme === 'sepia'
                    ? 'border-sepia-300 bg-sepia-50 text-sepia-800'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <button
              type="button"
              className={`flex items-center justify-center space-x-2 px-6 py-3 border-2 rounded-xl font-semibold transition-colors ${
                theme === 'sepia'
                  ? 'border-sepia-300 text-sepia-700 hover:bg-sepia-100'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save as Draft</span>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Publish Novel</span>
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddNovel;